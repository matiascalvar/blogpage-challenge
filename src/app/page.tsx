"use client";

import { getAllPosts } from "@/actions/posts";
import Link from "next/link";
import { useEffect, useState } from "react";

const App = () => {
  const [allPosts, setAllPosts] = useState<
    { userId: number; id: string; title: string; body: string }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsRes = await getAllPosts();
        setAllPosts(postsRes.slice(93));
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : allPosts.length ? (
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
