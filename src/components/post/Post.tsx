import { Post as PostType } from "@/types/interfaces";
import Link from "next/link";
import { useState } from "react";
import { IoChevronBackSharp } from "react-icons/io5";

interface PostProps {
  post: PostType;
  mainPage?: boolean;
}

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

const Post = ({ post, mainPage }: PostProps) => {
  const [color] = useState(randomColor());

  return (
    <div
      key={post.id}
      className={`m-2.5 bg-white lg:w-[1000px] rounded-md shadow-md p-5 ${
        mainPage && "hover:shadow-bi-red hover:shadow"
      }`}
    >
      {!mainPage && (
        <Link href="/">
          <div className="flex items-center mb-5 cursor-pointer">
            <IoChevronBackSharp size={"1.2rem"} color="#64748B" />
            <p className="text-slate-500 text-xs">Go back</p>
          </div>
        </Link>
      )}
      <div className="flex items-center">
        {post.initials && (
          <div
            className={`flex items-center justify-center rounded-full ${color} w-8 h-8 mr-2 text-white`}
          >
            {post.initials}
          </div>
        )}
        <p className="text-bold">{post.name}</p>
      </div>
      <p className="font-medium mt-1">{post.title}</p>
      <p className="text-sm my-1">{post.body}</p>
      {mainPage && (
        <p className="mt-2 text-xs text-end">
          <Link href={`/post/${post.id}`}>See comments</Link>
        </p>
      )}
    </div>
  );
};

export default Post;
