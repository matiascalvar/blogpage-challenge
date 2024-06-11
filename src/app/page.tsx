"use client";

import usePosts from "@/hooks/usePosts";
import Link from "next/link";

const App = () => {
  const { isLoading, data: allPosts, error } = usePosts();

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

  if (isLoading) return <div>Loading...</div>;
  else if (error) return <div>There were an error. Try again later.</div>;

  return (
    <div>
      {allPosts.length ? (
        <div
          className="flex flex-col items-center"
          style={{ position: "relative", top: "-30px" }}
        >
          {allPosts.map((post) => (
            <div
              key={post.id}
              className="m-2.5 p-2.5 bg-white w-[1000px] rounded-md shadow-md"
            >
              <div className="flex items-center">
                <div
                  className={`flex items-center justify-center rounded-full ${randomColor()} w-8 h-8 mr-2 text-white`}
                >
                  JD
                </div>
                <p className="text-bold">JohnDoe</p>
              </div>
              <p className="font-medium mt-1">{post.title}</p>
              <p className="text-sm my-1">{post.body}</p>
              <p className="mt-2 text-xs text-end">
                <Link href={`/post/${post.id}`}>See more</Link>
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div>No posts available.</div>
      )}
    </div>
  );
};

export default App;
