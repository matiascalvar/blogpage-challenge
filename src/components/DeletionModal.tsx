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
    >
      <div
        style={{
          width: "12rem",
          height: "5rem",
          maxWidth: "100vw",
          maxHeight: "100dvh",
          backgroundColor: "white",
          padding: "1rem",
          borderRadius: "0.5rem",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        Delete comment?
        <div>
          <button
            style={{ backgroundColor: "red" }}
            onClick={() => {
              handleDeletion(), setOpenModal(false);
            }}
          >
            Delete
          </button>
          <button onClick={() => setOpenModal(false)}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default DeletionModal;
