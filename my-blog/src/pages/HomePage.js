import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BlogCard from "../components/BlogCard";
import '../styles/HomePage.css';
import InfoCard from "../components/InfoCard";
import '@fortawesome/fontawesome-free/css/all.min.css';



const HomePage = () => {
  const [blogPosts, setBlogPosts] = useState([]);

  const fetchBlogPostsData = async () => {
    try {
      const response = await fetch("https://NabuTech.github.io/my-blog/data/output.json");
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
        <div className="container">
          <InfoCard
            title="About" id="about"
            content="Back in 2021, after a successful career in hospitality management, 
            amidst the turmoil caused by the COVID-19 pandemic, I found myself in a new 
            country at a crossroads. Determined to embrace the opportunities presented 
            by the technology industry, I immersed myself in the world of software 
            development, pursuing a Software Development Diploma. Today, I continue to 
            pursue my passion by working towards a bachelor's degree in IT and sharing my
            journey and accomplishments through NabuTech.To learn more about the person 
            behind NabuTech, please visit my LinkedIn 
            profile."
          />
          <InfoCard
            title="Find Me Here" id="find-me"
            content={
              <div className="find-me">
                <div className="icons">
                <a className="icon" href="https://twitter.com/nabu_tech">
                  <i className="fab fa-twitter"></i>
                  <span className="icon-name">Twitter</span>
                </a>
                <a className="icon" href="https://www.linkedin.com/in/sammyjohnrawlinson/">
                  <i className="fab fa-linkedin"></i>
                  <span className="icon-name">LinkedIn</span>
                </a>
                <a className="icon" href="https://github.com/NabuTech">
                  <i className="fab fa-github"></i>
                  <span className="icon-name">Github</span>
                </a>
                </div>
                <div className="contact">
                  <p>Contact me at <a className="contact-link" href="mailto:nabutech@proton.me">nabutech@proton.me</a></p>
                </div>
              </div>
            }
          />
        </div>
        <div className="articles-list">
            <h2 className="articles-title">Articles</h2>
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
