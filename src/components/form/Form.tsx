import { ChangeEvent, FC, FormEvent, useState } from "react";

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
      className="w-full px-10"
    >
      <div className="flex w-7/12 mb-5">
        <input
          type="text"
          className="w-full my-1 border rounded-md min-h-8 pl-4"
          name="name"
          placeholder="Name..."
          value={formData.name}
          onChange={handleFormChange}
        />
        <input
          type="email"
          className="w-full my-1 border rounded-md ml-5 min-h-8 pl-4"
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
      <div className="flex justify-end">
        <button
          className="min-w-[120px] bg-red-500 text-white rounded-md text-sm min-h-6"
          type="submit"
        >
          Add comment
        </button>
      </div>
    </form>
  );
};

export default Form;
