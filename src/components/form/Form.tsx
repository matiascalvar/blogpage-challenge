import { ChangeEvent, FC, FormEvent, useState } from "react";
import Button from "../button/Buttton";

interface FormProps {
  handleAddition: (
    e: FormEvent<HTMLFormElement>,
    formData: any,
    setFormData: any
  ) => Promise<void>;
}

const Form: FC<FormProps> = ({ handleAddition }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    newComment: "",
  });

  const handleFormChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <form
      onSubmit={(e) => handleAddition(e, formData, setFormData)}
      className="w-full px-2.5"
    >
      <div className="flex w-7/12 mb-5">
        <input
          type="text"
          className="w-full my-1 border rounded-md min-h-8 pl-4"
          name="name"
          placeholder="Name..."
          value={formData.name}
          onChange={handleFormChange}
          required={true}
        />
        <input
          type="email"
          className="w-full my-1 border rounded-md ml-5 min-h-8 pl-4"
          name="email"
          placeholder="Email..."
          value={formData.email}
          onChange={handleFormChange}
          required={true}
        />
      </div>
      <textarea
        value={formData.newComment}
        name="newComment"
        placeholder="Leave a comment..."
        onChange={handleFormChange}
        rows={3}
        className="w-full p-2 border rounded-md resize-none"
        required={true}
      />
      <div className="flex justify-end">
        <Button type="warning" text="Add comment" isSubmit />
      </div>
    </form>
  );
};

export default Form;
