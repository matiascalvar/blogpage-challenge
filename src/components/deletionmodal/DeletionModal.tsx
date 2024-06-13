import { Dispatch, SetStateAction } from "react";
import Button from "../button/Buttton";

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
        <div className="flex gap-3">
          <Button
            text="Delete"
            type="warning"
            onClick={() => {
              handleDeletion(), setOpenModal(false);
            }}
          />
          <Button text="Cancel" type="" onClick={() => setOpenModal(false)} />
        </div>
      </div>
    </div>
  );
};

export default DeletionModal;
