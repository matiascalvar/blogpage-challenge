import { getComments, getPost } from "@/actions/posts";
import { Comment, Post } from "@/types/interfaces";
import { useEffect, useState } from "react";

const usePostAndComments = (id: number | string) => {
  const [post, setPost] = useState<Post>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const [post, comments] = await Promise.all([
          getPost(Number(id)),
          getComments(id as string),
        ]);
        setPost(post);
        setComments(comments);
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, [id]);

  return { post, comments, setComments, isLoading, error };
};

export default usePostAndComments;
