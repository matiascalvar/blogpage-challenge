"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import { useParams } from "next/navigation";
import DeletionModal from "@/components/DeletionModal";
import {
  createComment,
  deleteComment,
  updateComment,
} from "@/actions/comments";
import usePostAndComments from "@/hooks/usePostAndComments";
import Loading from "@/components/Loading";
import Post from "@/components/Post";
import { RiEdit2Line } from "react-icons/ri";
import { RiDeleteBin2Line } from "react-icons/ri";
import usePagination from "@/hooks/usePagination";
import Pagination from "@/components/pagination/Pagination";

const PostDetail = () => {
  const { id } = useParams();
  const { post, comments, setComments, isLoading, error } = usePostAndComments(
    id as number | string
  );
  const { currentPage, itemsPerPage, currentItems, handlePagination } =
    usePagination(comments, 3);

  console.log({ currentItems, currentPage, itemsPerPage });

  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editedText, setEditedText] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    newComment: "",
  });
  const [currentCommentId, setCurrentCommentId] = useState<number>();
  const [openModal, setOpenModal] = useState(false);

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

  const handleModal = (commentId: number) => {
    setCurrentCommentId(commentId);
    setOpenModal(true);
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

  if (isLoading) return <Loading />;
  else if (error) return <div>There was an error. Try again later.</div>;

  return (
    <div className="h-auto">
      {comments.length ? (
        <div
          className=" flex flex-col items-center"
          style={{ position: "relative", top: "-30px" }}
        >
          {openModal && (
            <DeletionModal
              handleDeletion={() => handleDeletion(currentCommentId as number)}
              setOpenModal={setOpenModal}
            />
          )}
          {post && <Post post={post} />}
          <div
            id="input-comments"
            className="flex items-center flex-col w-[1000px] border rounded-md"
          >
            <div className="flex my-5 mx-5 w-full">
              <form onSubmit={handleAddition} className="w-full px-10">
                <div className="flex w-7/12 mb-5">
                  <input
                    type="text"
                    className="w-full my-1 border rounded-md min-h-8 pl-4"
                    id="name-input"
                    name="name"
                    placeholder="Name..."
                    value={formData.name}
                    onChange={handleFormChange}
                  />
                  <input
                    type="email"
                    className="w-full my-1 border rounded-md ml-5 min-h-8 pl-4"
                    id="email-input"
                    name="email"
                    placeholder="Email..."
                    value={formData.email}
                    onChange={handleFormChange}
                  />
                </div>
                <textarea
                  value={formData.newComment}
                  name="newComment"
                  placeholder="Leave a comment..."
                  onChange={handleFormChange}
                  rows={3}
                  className="w-full p-2 border rounded-md"
                />
                <div id="add-btn-container" className="flex justify-end">
                  <button
                    className="min-w-[120px] bg-red-500 text-white rounded-md text-sm min-h-6"
                    type="submit"
                  >
                    Add comment
                  </button>
                </div>
              </form>
            </div>
            <div>
              {currentItems.map((comment) => (
                <div
                  key={comment.id}
                  className="border-l-2 border-grey hover:border-bi-red m-2.5 p-2.5"
                >
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">{comment.email}</p>
                      <p className="text-sm">{comment.name}</p>
                    </div>
                    <div className="flex gap-4">
                      <button
                        onClick={() => handleEditing(comment.id, comment.body)}
                      >
                        <RiEdit2Line color={"#505050"} size={"1.3em"} />
                      </button>
                      <button
                        onClick={() =>
                          !editingCommentId && handleModal(comment.id)
                        }
                      >
                        <RiDeleteBin2Line color={"#505050"} size={"1.3em"} />
                      </button>
                    </div>
                  </div>

                  {editingCommentId === comment.id ? (
                    <div>
                      <textarea
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                        autoFocus
                        rows={3}
                        className="w-full p-2 border border-gray-300 text-sm"
                      />
                      <button
                        className="min-w-[100px] bg-green-500 text-white rounded-md text-sm min-h-6 mr-4"
                        onClick={() => handleSave(comment.id)}
                      >
                        Confirms
                      </button>
                      <button
                        className="min-w-[100px] bg-red-500 text-white rounded-md text-sm min-h-6"
                        onClick={() => setEditingCommentId(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <p className="text-xs">{comment.body}</p>
                  )}
                </div>
              ))}
              <Pagination
                length={comments.length}
                postsPerPage={itemsPerPage}
                handlePagination={handlePagination}
                currentPage={currentPage}
              />
            </div>
          </div>
        </div>
      ) : (
        <div>No comments yet. Add a new one!</div>
      )}
    </div>
  );
};

export default PostDetail;
