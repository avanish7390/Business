import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import PostCard from '../components/PostCard';

const categories = ['All', 'Restaurants', 'Retail', 'Services', 'Technology', 'Health', 'Entertainment'];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/post/getPosts');
        const data = await res.json();
        setPosts(data.posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handlePostClick = (slug) => {
    navigate(`/post/${slug}`);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-purple-100 to-white">
      <div className="w-full max-w-screen-lg mx-auto text-center px-4">
        {/* Header Section */}
        <div className="flex flex-col gap-5 my-10">
          <span className="mx-auto px-6 py-2 rounded-full bg-gray-200 text-red-500 font-semibold text-sm shadow-md">
            No.1 Post Directory Website
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold">
            Explore & <br /> Get Your <span className="text-purple-500">Nearby Information</span>
          </h1>
          <p className="text-gray-600">Find the best posts, categories, and services all in one place!</p>

          {/* Search Bar */}
          <div className="flex items-center w-full max-w-md mx-auto shadow-lg border border-gray-100 rounded-full overflow-hidden bg-white">
            <input
              type="text"
              placeholder="Search for posts"
              className="flex-grow py-3 px-4 border-none outline-none text-gray-700"
              aria-label="Search for posts"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="bg-purple-500 text-white px-6 py-3 hover:bg-purple-600 transition-all">
              Search
            </button>
          </div>
        </div>

        {/* Category Filter Section */}
        <div className="mb-6">
          {/* Dropdown for small screens */}
          <div className="block md:hidden">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 rounded-full bg-gray-100 text-gray-800 w-full"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Button group for larger screens */}
          <div className="hidden md:flex justify-center flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-purple-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-800 hover:bg-purple-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Post Card Section */}
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mt-10 px-4 sm:px-6 lg:px-8">
  {filteredPosts.length > 0 ? (
    filteredPosts.map((post) => (
      <div
        key={post.slug}
        onClick={() => handlePostClick(post.slug)}
        className="cursor-pointer transform hover:scale-105 transition-all duration-300 bg-white rounded-lg shadow-lg overflow-hidden"
      >
        <PostCard key={post._id} post={post} />
      </div>
    ))
  ) : (
    <p className="col-span-full text-center text-gray-600 text-lg">
      No posts found matching your search.
    </p>
  )}
</div>


        {/* Link to View All Posts */}
        <div className="mt-10">
          <Link
            to="/search"
            className="text-lg text-teal-500 hover:text-teal-600 transition-all"
          >
            View All Posts
          </Link>
        </div>
      </div>
    </div>
  );
}
