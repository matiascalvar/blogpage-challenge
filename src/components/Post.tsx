import { Post as PostType } from "@/types/interfaces";
import Link from "next/link";
import { FunctionComponent } from "react";

interface PostProps {
  post: PostType;
}

const Post: FunctionComponent<PostProps> = ({ post }) => {
  const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-indigo-500",
    "bg-purple-500",
    "bg-pink-500",
  ];
  const randomColor = () => colors[Math.floor(Math.random() * colors.length)];
  return (
    <div
      key={post.id}
      className="m-2.5 p-2.5 bg-white w-[1000px] rounded-md shadow-md"
    >
      <div className="flex items-center">
        <div
          className={`flex items-center justify-center rounded-full ${randomColor()} w-8 h-8 mr-2 text-white`}
        >
          {post.initials}
        </div>
        <p className="text-bold">{post.name}</p>
      </div>
      <p className="font-medium mt-1">{post.title}</p>
      <p className="text-sm my-1">{post.body}</p>
      <p className="mt-2 text-xs text-end">
        <Link href={`/post/${post.id}`}>See more</Link>
      </p>
    </div>
  );
};

export default Post;
