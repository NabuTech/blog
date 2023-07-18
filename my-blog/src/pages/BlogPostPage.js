import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const BlogPostPage = () => {
  const { postId } = useParams();
  const [blogPost, setBlogPost] = useState(null);

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
      } catch (error) {
        console.error("Error fetching blog post", error);
      }
    };

    fetchBlogPostData();
  }, [postId]);

  if (!blogPost) {
    return <p>Loading...</p>; // Display a loading state while fetching the blog post data
  }

  return (
    <>
      <Header />
      <div className="container">
        <h2>{blogPost.title}</h2>
        <p>{blogPost.date}</p>
        <p>{blogPost.content}</p>
      </div>
      <Footer />
    </>
  );
};

export default BlogPostPage;
