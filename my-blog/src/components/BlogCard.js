import React from "react";
import { Link } from "react-router-dom";
import '../styles/BlogCard.css';

const BlogCard = ({ post }) => {
    const formattedDate = new Date(post.date).toLocaleDateString();

  return (
    <div className="blog-card">
      <p className="blog-card-date">{formattedDate}</p>
      <span className="blog-card-title">{post.title}</span>
      <p className="blog-card-description">{post.description}</p>
      <Link to={`/blog/${post.id}`}>Read More</Link>
    </div>
  );
};

export default BlogCard;

