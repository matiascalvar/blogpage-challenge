"use client";
import { useParams } from "next/navigation";

const Post = () => {
  const { id } = useParams();

  return (
    <div className="h-auto">
      <h1>Dynamic post #{id}</h1>
    </div>
  );
};
export default Post;
