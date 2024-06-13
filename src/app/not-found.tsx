import Link from "next/link";
import Image from "next/image";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center p-10">
      <Image src="/404.svg" alt="404-image" width={200} height={200} />
      <h1 className="mt-5">Nothing to see here.</h1>
      <h2 className="my-2">
        Go back to
        <Link href="/">
          <button className="mx-3 px-5 border rounded-md text-sm min-h-6 hover:border-bi-red">
            Home
          </button>
        </Link>
      </h2>
    </div>
  );
};
export default NotFound;
