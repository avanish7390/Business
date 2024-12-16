import { Button, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CommentSection from '../components/CommentSection';
import PostCard from '../components/PostCard';
import { IoMdArrowRoundBack } from 'react-icons/io';

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

  if (loading)
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Spinner size='xl' />
      </div>
    );

  return (
    <main className='bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300 p-8 min-h-screen'>
      {/* Post Container with Background */}
      <div className='bg-white rounded-lg shadow-lg p-6 max-w-7xl mx-auto'>
        {/* Back Button */}
        <Link to='/'>
          <IoMdArrowRoundBack className='m-2 text-2xl' />
        </Link>

        {/* Category Button at Top Center */}
        <div className="flex justify-center mt-5">
          <Link to={`/search?category=${post && post.category}`}>
            <Button className='' color='gray' pill size='xs'>
              {post && post.category}
            </Button>
          </Link>
        </div>

        {/* Post Image */}
        <img
          src={post?.image || '/placeholder-image.jpg'}
          alt={post?.title || 'Placeholder image'}
          className="mt-10 p-3 w-[800px] h-[300px]  mx-auto rounded-lg "
        />

        {/* Post Details */}
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

        {/* Post Content */}
        <div className='p-3 max-w-2xl mx-auto w-full post-content'>
  <h2 className='text-xl font-semibold text-gray-800 mb-3'>Description</h2>
  <div dangerouslySetInnerHTML={{ __html: post && post.content }}></div>
</div>

        {/* Comments Section */}
        <CommentSection postId={post._id} />

        {/* Recent Posts Section */}
        <div className='flex flex-col justify-center items-center mb-5'>
          <h1 className='text-xl mt-5'>RECENT POST</h1>
          <div className='flex-wrap flex gap-5 mt-5 justify-center lg:pl-32 md:grid-cols-2'>
            {recentPosts &&
              recentPosts.map((post) => <PostCard key={post._id} post={post} />)}
          </div>
        </div>
      </div>
    </main>
  );
}
