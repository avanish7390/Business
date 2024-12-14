import { Button, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
//import CallToAction from '../components/CallToAction';
import CommentSection from '../components/CommentSection';
import PostCard from '../components/PostCard';

export default function PostPage() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setPost(data.posts[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);

  useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const res = await fetch(`/api/post/getposts?limit=3`);
        const data = await res.json();
        if (res.ok) {
          setRecentPosts(data.posts);
        }
      };
      fetchRecentPosts();
    } catch (error) {
      console.log(error.message);
    }
  }, []);
  // const handleImageDownload = () => {
  //   try {
  //     const link = document.createElement('a');
  //     link.href = post.image;
  //     link.setAttribute('download', 'post_image.jpg');
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //   } catch (error) {
  //     console.error('Error downloading image:', error);
  //   }
  // };


  if (loading)
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Spinner size='xl' />
      </div>
    );
  return (
    <main className='p-3 flex flex-col max-w-8xl mx-auto min-h-screen'>
      
      <img
  src={post?.image || '/placeholder-image.jpg'}
  alt={post?.title || 'Placeholder image'}
  className="mt-10 p-3 w-[800px] h-[300px]  mx-auto rounded-lg "
/>
{/* <div className="max-w-6xl mx-auto mt-10 grid grid-cols-1 lg:grid-cols-2 gap-10 p-5">
  Left Section
  <div>
    <h1 className="text-3xl p-3 text-left font-serif max-w-2xl mx-auto lg:text-4xl">
      <span className="text-2xl font-bold">Title: </span>
      {post && post.title}
    </h1>
    <h1 className="text-3xl mt-6 p-3 text-left font-serif max-w-2xl mx-auto lg:text-2xl">
      <span className="text-2xl font-bold">Mobile No: </span>
      {post && post.phoneNumber}
    </h1>
    <h1 className="text-3xl mt-6 p-3 text-left font-serif max-w-2xl mx-auto lg:text-2xl">
      <span className="text-2xl font-bold">Email: </span>
      {post && post.email}
    </h1>
  </div>

  Right Section
  <div>
    <h1 className="text-3xl mt-6 p-3 text-left font-serif max-w-2xl mx-auto lg:text-2xl">
      <span className="text-2xl font-bold">Address: </span>
      {post && post.address}
    </h1>
    <h1 className="text-3xl mt-6 p-3 text-left font-serif max-w-2xl mx-auto lg:text-2xl">
      <span className="text-2xl font-bold">State: </span>
      {post && post.state}
    </h1>
    <h1 className="text-3xl mt-6 p-3 text-left font-serif max-w-2xl mx-auto lg:text-2xl">
      <span className="text-2xl font-bold">City: </span>
      {post && post.city}
    </h1>
    <h1 className="text-3xl mt-6 p-3 text-left font-serif max-w-2xl mx-auto lg:text-2xl">
      <span className="text-2xl font-bold">Pincode: </span>
      {post && post.pincode}
    </h1>
  </div>
</div> */}
<div className="max-w-3xl mx-auto p-5">
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<p className="text-gray-500">Title: {post.title}</p>
        <p className="text-gray-500">Category: {post.category}</p>
        <p className="text-gray-500">Phone Number: {post.phoneNumber}</p>
        <p className="text-gray-500">Email: {post.email}</p>
        <p className="text-gray-500">Address: {post.address}</p>
        <p className="text-gray-500">City: {post.city}</p>
        <p className="text-gray-500">State: {post.state}</p>
        <p className="text-gray-500">Pincode: {post.pincode}</p>
      </div>
      </div>

      <Link
        to={`/search?category=${post && post.category}`}
        className='self-center mt-5'
      >
        <Button color='gray' pill size='xs'>
          {post && post.category}
        </Button>
      </Link>


    
      <div className='flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs'>
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
         {/* Other post content */}

      {/* <Button onClick={handleImageDownload} className='self-center mt-5' color='gray' pill size='xs'>
        Download Image
      </Button> */}
        <span className='italic'>
          {post && (post.content.length / 1000).toFixed(0)} mins read
        </span>
      </div>
      <div
        className='p-3 max-w-2xl mx-auto w-full post-content'
        dangerouslySetInnerHTML={{ __html: post && post.content }}
      >

      </div>
      {/* <div className='max-w-4xl mx-auto w-full'>
        <CallToAction />
      </div> */}
      <CommentSection postId={post._id} />
      

      <div className='flex flex-col justify-center items-center mb-5'>
        <h1 className='text-xl mt-5'>RECENT POST</h1>
        <div className='flex-wrap flex gap-5 mt-5 justify-center lg:pl-32 md:grid-cols-2 '>
          {recentPosts &&  
            recentPosts.map((post) => <PostCard key={post._id} post={post} />)}
        </div>
      </div>
    </main>
  );
}