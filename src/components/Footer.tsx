import Link from "next/link";
import { DiReact } from "react-icons/di";

const Footer = () => {
  return (
    <div className="flex justify-end items-center w-[100%] bg-bi-red fixed bottom-0 h-[25px] text-white shadow text-xs pr-5">
      <Link href={"https://www.linkedin.com/in/matiascalvar/"}>
        <p className="font-medium tracking-wide flex">
          Made with <DiReact size={"1.5em"} /> by Matias Calvar
        </p>
      </Link>
    </div>
  );
};

export default Footer;
