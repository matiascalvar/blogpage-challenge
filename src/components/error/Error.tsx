import Link from "next/link";
import Button from "../button/Buttton";
import styles from "./Error.module.css";

const Error = () => {
  return (
    <div
      className={styles.Error + " flex flex-row items-center justify-center"}
    >
      <p className="mx-2">There was an error. Try again later.</p>
      <Link href="/">
        <Button text="Home" type="default" />
      </Link>
    </div>
  );
};

export default Error;
