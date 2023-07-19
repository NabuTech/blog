import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { remark } from "remark";
import html from "remark-html";

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

        // Parse subheadings from the content
        const subheadingsData = post.content.match(/##\s(.+)/g);
        if (subheadingsData) {
          const subheadingsArray = subheadingsData.map((subheading) => {
            const subheadingText = subheading.replace("## ", "");
            const subheadingSlug = subheadingText.toLowerCase().replace(/\s/g, "-");
            return { text: subheadingText, slug: subheadingSlug };
          });
          setSubheadings(subheadingsArray);
        }
      } catch (error) {
        console.error("Error fetching blog post", error);
      }
    };

    fetchBlogPostData();
  }, [postId]);

  if (!blogPost) {
    return <p>Loading...</p>; // Display a loading state while fetching the blog post data
  }

  // Format the date to display only the date without the time
  const formattedDate = new Date(blogPost.date).toLocaleDateString();

  // Render Markdown content using remark
  const renderMarkdown = async (content) => {
    const result = await remark().use(html).process(content);
    return result.toString();
  };
  
  const MarkdownContent = ({ content }) => {
    const [renderedContent, setRenderedContent] = useState(null);
  
    useEffect(() => {
      const renderContent = async () => {
        const markdown = await renderMarkdown(content);
        setRenderedContent(markdown);
      };
  
      renderContent();
    }, [content]);
  
    if (!renderedContent) {
      return <p>Loading...</p>;
    }
  
    return <div dangerouslySetInnerHTML={{ __html: renderedContent }} />;
  };
  

  return (
    <>
      <Header />
      <div className="container">
        <h2>{blogPost.title}</h2>
        <p>{formattedDate}</p>
        <div className="blog-content">
          <div className="blog-navigation">
            <h3>Navigation</h3>
            <ul>
              {subheadings.map((subheading) => (
                <li key={subheading.slug}>
                  <a href={`#${subheading.slug}`}>{subheading.text}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="blog-post">
            <MarkdownContent content={blogPost.content} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BlogPostPage;
