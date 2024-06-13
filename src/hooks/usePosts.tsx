import { useEffect, useState } from "react";
import { getAllPosts } from "@/actions/posts";
import { Post, User, UserLookup } from "@/types/interfaces";
import { getAllUsers } from "@/actions/users";

export function getInitials(name: string): string {
  const nameParts = name.split(" ");
  let initials = nameParts.map((part) => part[0].toUpperCase()).join("");
  return initials.slice(0, 2);
}

const usePosts = () => {
  const [allPosts, setAllPosts] = useState<Post[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let [postsRes, usersRes] = await Promise.all([
          getAllPosts(),
          getAllUsers(),
        ]);

        const userLookup = usersRes.reduce((acc: UserLookup, user: User) => {
          acc[user.id] = user;
          return acc;
        }, {});

        const enrichedPosts = postsRes.map((post: Post) => ({
          ...post,
          name: userLookup[post.userId].name,
          email: userLookup[post.userId].email,
          initials: getInitials(userLookup[post.userId].name),
        }));

        setAllPosts(enrichedPosts);
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
