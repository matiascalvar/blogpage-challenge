import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex justify-center">
      <h1>Nothing to see here.</h1>
      <h2>
        Go back to <Link href="/">Home</Link>
      </h2>
    </div>
  );
};
export default NotFound;
