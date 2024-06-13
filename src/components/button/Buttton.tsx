import { FunctionComponent } from "react";

interface ButtonProps {
  type: string;
  text: string;
  onClick?: (params?: unknown) => void;
  isSubmit?: boolean;
}

const Button = ({ type, text, onClick, isSubmit = false }: ButtonProps) => {
  const getButtonType = (type: string) => {
    if (type === "warning") {
      return "bg-red-500 hover:bg-red-800";
    } else if (type === "confirm") {
      return "bg-green-500 hover:bg-green-800";
    } else {
      return "";
    }
  };
  return (
    <button
      className={`min-w-[120px] text-white rounded-md text-sm min-h-6 ease-in duration-300 ${getButtonType(
        type
      )}`}
      type={isSubmit ? "submit" : "button"}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
