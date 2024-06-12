"use client";

import Loading from "@/components/Loading";
import Post from "@/components/Post";
import usePosts from "@/hooks/usePosts";

const App = () => {
  const { isLoading, data: allPosts, error } = usePosts();

  if (isLoading) return <Loading />;
  else if (error) return <div>There was an error. Try again later.</div>;

  return (
    <div>
      {allPosts.length ? (
        <div
          className="flex flex-col items-center"
          style={{ position: "relative", top: "-30px" }}
        >
          {allPosts.map((post) => (
            <Post post={post} key={post.id} />
          ))}
        </div>
      ) : (
        <div>No posts available.</div>
      )}
    </div>
  );
};

export default App;
