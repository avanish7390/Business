
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import PostCard from '../components/PostCard';

// Dummy categories for the posts
const categories = ['All', 'Restaurants', 'Retail', 'Services', 'Technology', 'Health', 'Entertainment'];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('All');  // Category filter state
  const [searchQuery, setSearchQuery] = useState('');  // Search query state
  const [posts, setPosts] = useState([]);  // Posts state
  const navigate = useNavigate();  // Hook to navigate between pages

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

  // Filter posts by selected category and search query
  const filteredPosts = posts.filter((post) => {
    // Match category
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;

    // Match search query
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Handle card click to navigate to post details
  const handlePostClick = (slug) => {
    navigate(`/post/${slug}`);  // Redirect to post detail page
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-screen-lg mx-auto text-center">

        {/* Header Section */}
        <div className="flex flex-col gap-5 my-10">
          <span className="m-auto px-4 py-2 rounded-full bg-gray-100 text-red-500 font-medium">
            No.1 Post Directory Website
          </span>
          <h1 className="text-5xl font-bold">
            Explore & <br /> Get Your <span className="text-purple-500">Nearby Information</span>
          </h1>
          <p>This is the first page that users will see when they visit the website. It contains a search bar to search for posts.</p>
          
          {/* Search Bar */}
          <div className="flex w-[90%] md:w-[60%] lg:w-[40%] shadow-lg border border-gray-100 pl-3 rounded-full items-center gap-4 mx-auto">
            <input 
              type="text" 
              placeholder="Search Your Required Post" 
              className="w-full py-2 border-none outline-none"
              aria-label="Search for posts"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}  // Update search query state
            />
            <button className="bg-purple-500 text-white px-4 py-2 rounded-full" aria-label="Search Button">
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
          <div className="hidden md:flex justify-center">
            {categories.map((category) => (
              <button 
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`mx-2 px-4 py-2 rounded-full font-medium ${selectedCategory === category ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-800'}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* --------- Post Card Section --------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10 ml-2 cursor-pointer">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <div 
                   key={post.slug} // Use 'slug' as key for better performance
                   onClick={() => handlePostClick(post.slug)}  // Correctly pass the slug to handlePostClick
                   className="cursor-pointer"
                   >
                <PostCard key={post._id} post={post} />
              </div>

            ))
          ) : (
            <p>No posts found matching your search.</p>
          )}
        </div>

        {/* Link to View All Posts */}
        <div className="mt-10">
          <Link 
            to="/search" 
            className="text-lg text-teal-500 hover:underline text-center"
          >
            View All Posts
          </Link>
        </div>

      </div>
    </div>
  );
}
