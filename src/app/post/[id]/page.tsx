"use client";
import {
  createComment,
  deleteComment,
  updateComment,
} from "@/actions/comments";
import { getComments } from "@/actions/posts";
import { useParams } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

const PostDetail = () => {
  const { id } = useParams();

  const [comments, setComments] = useState<
    { postId: number; id: number; name: string; email: string; body: string }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editedText, setEditedText] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    newComment: "",
  });

  const handleFormChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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

  const handleAddition = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { name, email, newComment } = formData;
      const resNewComment = await createComment(
        Number(id),
        name,
        email,
        newComment
      );
      setFormData({ name: "", email: "", newComment: "" });

      resNewComment &&
        setComments((prevComments) => [resNewComment, ...prevComments]);
    } catch (error) {
      console.error("Error creating comment:", error);
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
    const fetchComments = async () => {
      try {
        const comments = await getComments(id as string);
        setComments(comments);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.error(err);
      }
    };

    fetchComments();
  }, [id]);

  return (
    <div className="h-auto">
      <h1>Dynamic post #{id}</h1>
      <div className="flex my-5 mx-5">
        <form onSubmit={handleAddition}>
          <div>
            <input
              type="text"
              className="w-full my-1"
              id="name-input"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
            />
            <input
              type="email"
              className="w-full my-1"
              id="email-input"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
            />
          </div>
          <textarea
            value={formData.newComment}
            name="newComment"
            onChange={handleFormChange}
            rows={1}
            className="w-full p-2 border border-gray-300 ml-1"
          />

          <button
            className="mx-5 min-w-[100px] bg-red-500 text-white"
            type="submit"
          >
            Add
          </button>
        </form>
      </div>
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

export default PostDetail;
