"use client";
import { getComments } from "@/actions/posts";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Post = () => {
  const { id } = useParams();

  const [comments, setComments] = useState<
    { postId: number; id: number; name: string; email: string; body: string }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);

  const handleEditing = (commentId: number) => {
    // open edition
    // call API with PATCH
    console.log("EDIT", commentId);
  };

  const handleDeletion = (commentId: number) => {
    // call API with DELETE
    console.log("DELETE", commentId);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const comments = await getComments(id as string);
        setComments(comments);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.error(err);
      }
    };

    fetchPosts();
  }, [id]);

  return (
    <div className="h-auto">
      <h1>Dynamic post #{id}</h1>
      {loading ? (
        <div>Loading...</div>
      ) : comments.length ? (
        <div className="border border-gray-500">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="border border-gray-500 m-2.5 p-2.5"
            >
              <div>
                <p>{comment.email}</p>
                <p>{comment.name}</p>
                <div>
                  <button onClick={() => handleEditing(comment.id)}>
                    Edit
                  </button>
                  <button onClick={() => handleDeletion(comment.id)}>
                    Delete
                  </button>
                </div>
              </div>

              <p>{comment.body}</p>
            </div>
          ))}
        </div>
      ) : (
        <div>No comments yet. Add a new one!</div>
      )}
    </div>
  );
};
export default Post;
