import { useEffect, useState } from "react";
import { getAllPosts } from "@/actions/posts";
import { Post } from "@/types/interfaces";

const usePosts = () => {
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsRes = await getAllPosts();
        setAllPosts(postsRes.slice(93));
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return { isLoading, data: allPosts, error };
};

export default usePosts;
