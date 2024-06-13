import Link from "next/link";

const Header = () => {
  return (
    <div
      className="flex justify-between h-72 relative items-start pt-11 shadow-md"
      style={{
        backgroundImage: "url(/porto.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "top",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="min-w-[300px] text-left text-lg text-bi-red font-extrabold tracking-widest relative pl-36"
        id="logo"
      >
        <Link href="/">
          <p>BRIDGE IN</p>
          <p>CHALLENGE</p>
        </Link>
      </div>
      <div className="flex min-w-[300px] justify-between relative pr-36 font-medium ">
        <div>
          <Link href="/">
            <p>Home</p>
          </Link>
        </div>
        <div>
          <Link href="/about">About</Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
