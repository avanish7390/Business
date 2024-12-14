

import { Link } from 'react-router-dom';

export default function PostCard({ post }) {
  return (
    <div className='max-w-xs rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out cursor-pointer'>
      <Link to={`/post/${post.slug}`}>
        <img
          src={post.image}
          alt='post cover'
          className='h-[260px] w-full  object-cover group-hover:h-[200px] transition-all duration-300 z-20'
        />
      </Link>
      <div className='p-3 flex flex-col gap-2'>
        <p className='text-lg font-semibold line-clamp-2'>{post.title}</p>
         <div className="flex gap-3">
        <span className='italic text-teal-300 font-bold  text-sm' >{post.category}</span>
        {/* <span className='italic text-teal-300 font-bold text-sm'>{post.course}</span>
        <span className='italic text-teal-300  font-bold text-sm'>{post.branch}</span> */}
        </div>
        {/* <span className='italic text-teal-300  font-bold text-sm'>{post.year}</span> */}
        <Link
          to={`/post/${post.slug}`}
          className='mt-4 text-black font-bold hover:bg-blue-500 rounded-lg'
        >
          Read Post
        </Link>
      </div>
    </div>
  );
}