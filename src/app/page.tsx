"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const getAllPosts = async () => {
  try {
    const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
    return res.data;
  } catch (err) {
    throw err;
  }
};

const App = () => {
  const [allPosts, setAllPosts] = useState<
    { userId: number; id: string; title: string; body: string }[]
  >([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsRes = await getAllPosts();
        setAllPosts(postsRes.slice(93));
      } catch (err) {
        console.error(err);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      {allPosts.length > 0 ? (
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
        <div>Loading...</div>
      )}
    </div>
  );
};

export default App;
