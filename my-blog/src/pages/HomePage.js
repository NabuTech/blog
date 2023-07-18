import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BlogCard from "../components/BlogCard";
import '../styles/HomePage.css';

const HomePage = () => {
  const [blogPosts, setBlogPosts] = useState([]);

  const fetchBlogPostsData = async () => {
    try {
      const response = await fetch("/data/output.json");
      console.log("Response Status:", response.status);
      if (!response.ok) {
        throw new Error("Error fetching blog posts");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      return [];
    }
  };
  

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const data = await fetchBlogPostsData();
        setBlogPosts(data);
      } catch (error) {
        // Handle error
        console.error("Error fetching blog posts:", error);
      }
    };
  
    fetchBlogPosts();
  }, []);
  
  return (
    <>
      <Header />
      <div className="home-page">
        <h1 className="home-page-title">Articles</h1>
        <div className="container">
            {blogPosts.map((post, index) => (
                <BlogCard key={index} post={post} />
            ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
