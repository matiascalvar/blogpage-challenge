import { Dispatch, SetStateAction } from "react";

interface Modal {
  handleDeletion: () => Promise<void>;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}

const DeletionModal = ({ handleDeletion, setOpenModal }: Modal) => {
  return (
    <div
      style={{
        position: "fixed",
        inset: "0px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(1px)",
      }}
      onClick={() => setOpenModal(false)}
    >
      <div
        style={{
          maxWidth: "100vw",
          maxHeight: "100dvh",
          backgroundColor: "white",
          padding: "1rem",
          borderRadius: "0.5rem",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
        }}
      >
        <p className="my-2">Delete comment?</p>
        <div>
          <button
            className="min-w-[100px] bg-red-500 text-white rounded-md text-sm min-h-6 mx-2"
            onClick={() => {
              handleDeletion(), setOpenModal(false);
            }}
          >
            Delete
          </button>
          <button
            className="min-w-[100px] border rounded-md text-sm min-h-6 mx-2"
            onClick={() => setOpenModal(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletionModal;
