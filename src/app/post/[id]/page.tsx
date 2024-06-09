"use client";
import { deleteComment, updateComment } from "@/actions/comments";
import { getComments } from "@/actions/posts";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Post = () => {
  const { id } = useParams();

  const [comments, setComments] = useState<
    { postId: number; id: number; name: string; email: string; body: string }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editedText, setEditedText] = useState("");

  const handleEditing = (commentId: number, commentBody: string) => {
    setEditingCommentId(commentId);
    setEditedText(commentBody);
  };

  const handleSave = async (commentId: number) => {
    try {
      const updatedComment = await updateComment(commentId, editedText);

      setEditingCommentId(null);
      setEditedText("");

      const updateComments = comments.map((comment) =>
        commentId === comment.id
          ? { ...comment, body: updatedComment.body }
          : comment
      );
      setComments(updateComments);
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  const handleDeletion = async (commentId: number) => {
    try {
      const deletedComment = await deleteComment(commentId);
      const updateComments = comments.filter(
        (comment) => comment.id !== commentId
      );
      setComments(updateComments);
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
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
              <div className="flex justify-between">
                <div>
                  <p>{comment.email}</p>
                  <p>{comment.name}</p>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => handleEditing(comment.id, comment.body)}
                  >
                    Edit
                  </button>
                  <button onClick={() => handleDeletion(comment.id)}>
                    Delete
                  </button>
                </div>
              </div>

              {editingCommentId === comment.id ? (
                <div>
                  <textarea
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                    autoFocus
                    rows={4}
                    className="w-full p-2 border border-gray-300"
                  />
                  <button onClick={() => handleSave(comment.id)}>
                    Confirms
                  </button>
                  <button onClick={() => setEditingCommentId(null)}>
                    Cancel
                  </button>
                </div>
              ) : (
                <p>{comment.body}</p>
              )}
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
