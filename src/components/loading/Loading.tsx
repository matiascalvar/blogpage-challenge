import styles from "./Loading.module.css";

const Loading = () => {
  return (
    <div
      className={styles.Loading + " flex justify-center items-center w-[100vw]"}
    >
      <div className={styles["lds-ellipsis"]}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
