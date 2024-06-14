"use client";
import { Dispatch, FormEvent, SetStateAction, useRef, useState } from "react";
import { useParams } from "next/navigation";
import DeletionModal from "@/components/deletionmodal/DeletionModal";
import Loading from "@/components/loading/Loading";
import Post from "@/components/post/Post";
import Pagination from "@/components/pagination/Pagination";
import Form from "@/components/form/Form";
import CommentsList from "@/components/comment/CommentsList";
import usePostAndComments from "@/hooks/usePostAndComments";
import usePagination from "@/hooks/usePagination";
import {
  createComment,
  deleteComment,
  updateComment,
} from "@/actions/comments";
import { Comment, FormData } from "@/types/interfaces";
import styles from "./PostDetail.module.css";
import Error from "@/components/error/Error";

const getUniqueCommentId = (comments: Comment[], initialId = 501) => {
  const existingIds = new Set(comments.map((comment) => comment.id));
  let newId = initialId;
  while (existingIds.has(newId)) {
    newId += 1;
  }
  return newId;
};

const PostDetail = () => {
  const { id } = useParams();
  const { post, comments, setComments, isLoading, error } = usePostAndComments(
    id as number | string
  );
  const { currentPage, itemsPerPage, currentItems, handlePagination } =
    usePagination(comments, 3);

  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [currentCommentId, setCurrentCommentId] = useState<number>();
  const commentnewId = useRef(501);

  const handleEditing = (commentId: number | null) => {
    setEditingCommentId(commentId);
  };

  const handleSave = async (commentId: number, editedText: string) => {
    try {
      const updatedComment = await updateComment(commentId, editedText);
      setEditingCommentId(null);
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

  const handleAddition = async (
    e: FormEvent<HTMLFormElement>,
    formData: FormData,
    setFormData: Dispatch<SetStateAction<FormData>>
  ) => {
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
      if (resNewComment) {
        const uniqueId = getUniqueCommentId(comments);
        setComments((prevComments) => [
          { ...resNewComment, id: uniqueId },
          ...prevComments,
        ]);
      }
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
  else if (error) return <Error />;
  return (
    <div className={styles.PostDetail + " h-auto"}>
      <div
        className="flex flex-col items-center"
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
          className="flex items-center flex-col lg:w-[1000px] border rounded-md"
        >
          <div className="flex my-5 mx-5 w-full">
            <Form handleAddition={handleAddition} />
          </div>
          {comments.length ? (
            <>
              <CommentsList
                comments={currentItems}
                handleEditing={handleEditing}
                editingCommentId={editingCommentId}
                handleSave={handleSave}
                handleModal={handleModal}
              />
              <Pagination
                length={comments.length}
                postsPerPage={itemsPerPage}
                handlePagination={handlePagination}
                currentPage={currentPage}
              />
            </>
          ) : (
            <div className="my-4 text-sm">No comments yet. Add a new one!</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
