"use client";

import usePosts from "@/hooks/usePosts";
import Link from "next/link";

const App = () => {
  const { isLoading, data: allPosts, error } = usePosts();

  if (isLoading) return <div>Loading...</div>;
  else if (error) return <div>There were an error. Try again later.</div>;

  return (
    <div>
      {allPosts.length ? (
        <div className="border border-gray-500">
          {allPosts.map((post) => (
            <div key={post.id} className="border border-gray-500 m-2.5 p-2.5">
              <p>{post.userId}</p>
              <p>{post.title}</p>
              <p>{post.body}</p>
              <p style={{ marginTop: "10px" }}>
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
