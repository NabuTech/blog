import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { remark } from "remark";
import html from "remark-html";
import rehypeSlug from "rehype-slug";
import "../styles/BlogPostPage.css";

const parseSubheadings = (content) => {
  const subheadingsData = Array.from(content.matchAll(/##\s*(.+)$/gm));
  if (subheadingsData) {
    const subheadingsArray = subheadingsData.map((match, index) => {
      const subheadingText = match[1];
      const subheadingSlug = `subheading-${index}`;
      return { text: subheadingText, slug: subheadingSlug };
    });
    return subheadingsArray;
  }
  return [];
};

const BlogPostPage = () => {
  const { postId } = useParams();
  const [blogPost, setBlogPost] = useState(null);
  const [subheadings, setSubheadings] = useState([]);

  useEffect(() => {
    const fetchBlogPostData = async () => {
      try {
        const response = await fetch("/data/output.json");
        if (!response.ok) {
          throw new Error("Error fetching blog post");
        }
        const data = await response.json();
        const post = data.find((post) => post.id === parseInt(postId));
        if (!post) {
          throw new Error("Blog post not found");
        }
        setBlogPost(post);

        // Check if the 'content' field exists in the 'post' object
        if (post.content) {
          // Parse subheadings from the raw Markdown content
          const subheadingsArray = parseSubheadings(post.content);
          setSubheadings(subheadingsArray);
        } else {
          console.warn("Blog post content is missing.");
        }
      } catch (error) {
        console.error("Error fetching blog post", error);
      }
    };

    fetchBlogPostData();
  }, [postId]);

  const renderMarkdown = async (content) => {
    const result = await remark().use(html).use(rehypeSlug).process(content);
    const renderedContent = result.toString();

    let updatedContent = renderedContent;

    // Replace the subheadings in the rendered content with the correct anchor tags
    subheadings.forEach((subheading) => {
      const { text, slug } = subheading;
      const anchorTag = `<h2 id="${slug}">${text}</h2>`;
      updatedContent = updatedContent.replace(
        new RegExp(`<h2>${text}</h2>`, "g"),
        anchorTag
      );
    });

    return updatedContent;
  };

  // Create a ref to store the DOM element of the currently active subheading
  const activeSubheadingRef = useRef(null);

  // Function to handle scrolling to the subheading
  const scrollToSubheading = (e) => {
    e.preventDefault();
    const slug = e.currentTarget.getAttribute("href").slice(1);
    const subheadingElement = document.getElementById(slug);
    if (subheadingElement) {
      const headerHeight = 60; // Height of the header in pixels
      const scrollPosition = subheadingElement.offsetTop - headerHeight;
      window.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
      });
    }
  };

  const MarkdownContent = ({ content }) => {
    const [renderedContent, setRenderedContent] = useState(null);

    useEffect(() => {
      const renderContent = async () => {
        if (content) {
          const markdown = await renderMarkdown(content);
          setRenderedContent(markdown);
        }
      };

      renderContent();
    }, [content]);

    if (!renderedContent) {
      return <p>Loading...</p>;
    }

    return (
      <div ref={activeSubheadingRef} dangerouslySetInnerHTML={{ __html: renderedContent }} />
    );
  };

  return (
    <>
      <Header />
      <div className="blog-container">
        <main className="main">
          <div className="blog-content">
            <article className="blog-post">
              <MarkdownContent content={blogPost?.content} subheadings={subheadings} />
            </article>
          </div>
        </main>
        <aside className="blog-navigation">
          <h3>Table of Contents</h3>
          <ul>
            {subheadings.map((subheading) => (
              <li key={subheading.slug}>
                <a href={`#${subheading.slug}`} onClick={scrollToSubheading}>
                  {subheading.text}
                </a>
              </li>
            ))}
          </ul>
        </aside>
      </div>
      <Footer />
    </>
  );
};

export default BlogPostPage;
