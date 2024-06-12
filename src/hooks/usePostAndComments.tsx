import { getComments, getPost } from "@/actions/posts";
import { getUser } from "@/actions/users";
import { Comment, Post, User } from "@/types/interfaces";
import { useEffect, useState } from "react";
import { getInitials } from "./usePosts";

const usePostAndComments = (id: number | string) => {
  const [post, setPost] = useState<Post>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        let [post, comments]: [Post, Comment[]] = await Promise.all([
          getPost(Number(id)),
          getComments(id as string),
        ]);
        const user: User = await getUser(post.userId);

        post["name"] = user.name;
        post["email"] = user.email;
        post["initials"] = getInitials(user.name);
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
