import { Comment as CommentType } from "@/types/interfaces";
import { FC, useState } from "react";
import { RiEdit2Line, RiDeleteBin2Line } from "react-icons/ri";

interface CommentProps {
  comment: CommentType;
  handleEditing: (commentId: number | null) => void;
  editingCommentId: number | null;
  handleSave: (commentId: number, editedText: string) => Promise<void>;
  handleModal: any;
}

const Comment: FC<CommentProps> = ({
  comment,
  handleEditing,
  editingCommentId,
  handleSave,
  handleModal,
}) => {
  const [editedText, setEditedText] = useState(comment.body);

  return (
    <div className="border-l-2 border-grey hover:border-bi-red m-2.5 p-2.5">
      <div className="flex justify-between">
        <div>
          <p className="font-medium">{comment.email}</p>
          <p className="text-sm">{comment.name}</p>
        </div>
        <div className="flex gap-4">
          <button onClick={() => handleEditing(comment.id)}>
            <RiEdit2Line color={"#505050"} size={"1.3em"} />
          </button>
          <button
            id={"deletion-btn" + comment.id}
            onClick={() => !editingCommentId && handleModal(comment.id)}
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
            onClick={() => handleSave(comment.id, editedText)}
          >
            Confirms
          </button>
          <button
            className="min-w-[100px] bg-red-500 text-white rounded-md text-sm min-h-6"
            onClick={() => handleEditing(null)}
          >
            Cancel
          </button>
        </div>
      ) : (
        <p className="text-xs">{comment.body}</p>
      )}
    </div>
  );
};

export default Comment;
