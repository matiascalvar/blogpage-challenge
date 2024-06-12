import styles from "./Loading.module.css";

const Loading = () => {
  return (
    <div className="absolute inset-x-1/2 inset-y-1/2">
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
