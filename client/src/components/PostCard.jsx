import { Link } from 'react-router-dom';

export default function PostCard({ post }) {
  return (
    <div className="max-w-full sm:max-w-xs rounded-lg overflow-hidden shadow-md bg-white hover:shadow-lg transition-shadow duration-300 ease-in-out cursor-pointer">
      <Link to={`/post/${post.slug}`}>
        <img
          src={post.image}
          alt="post cover"
          className="h-[200px] w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </Link>
      <div className="p-4 flex flex-col gap-3">
        <p className="text-base sm:text-lg font-semibold line-clamp-2 text-gray-800">
          {post.title}
        </p>
        <div className="flex items-center justify-center gap-3">
  <span className="italic text-teal-500 font-medium text-sm sm:text-base">
    {post.category}
  </span>
</div>

<Link
          to={`/post/${post.slug}`}
          className="text-blue-500 border border-blue-500 hover:bg-purple-500 hover:text-white px-4 py-1 rounded-full text-sm mt-3 inline-block"
        >
          Show Details
        </Link>
      </div>
    </div>
  );
}
