import Link from "next/link";

const Footer = () => {
  return (
    <div className="flex justify-center items-center w-[100%] bg-bi-red fixed bottom-0 h-[25px] text-white shadow text-xs">
      <Link href={"https://www.linkedin.com/in/matiascalvar/"}>
        <p className="font-medium tracking-wide">
          Made with love by Matias Calvar
        </p>
      </Link>
    </div>
  );
};

export default Footer;
