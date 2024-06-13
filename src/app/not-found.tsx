import Link from "next/link";
import Image from "next/image";
import Button from "@/components/button/Buttton";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center p-10 h-[60vh]">
      <Image src="/404.svg" alt="404-image" width={200} height={200} />
      <h1 className="mt-5">Nothing to see here.</h1>
      <Link href="/" className="my-4">
        <Button type="" text="Home" />
      </Link>
    </div>
  );
};
export default NotFound;
