import React from "react";
import { IoChevronBackSharp } from "react-icons/io5";
import { IoChevronForwardSharp } from "react-icons/io5";

interface PaginationProps {
  postsPerPage: number;
  length: number;
  handlePagination: (page: number) => void;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  postsPerPage,
  length,
  handlePagination,
  currentPage,
}) => {
  const totalPages = Math.ceil(length / postsPerPage);

  return (
    postsPerPage < length && (
      <div className="flex flex-row justify-center gap-3 z-10 select-none border-red-900 text-sm">
        <button
          className="flex items-center gap-1"
          onClick={() => handlePagination(currentPage - 1)}
          style={{ visibility: currentPage > 1 ? "initial" : "hidden" }}
        >
          <IoChevronBackSharp /> Previous
        </button>

        <p className="min-w-4">{currentPage}</p>

        <button
          className="flex gap-1 items-center"
          onClick={() => handlePagination(currentPage + 1)}
          style={{
            visibility: currentPage < totalPages ? "initial" : "hidden",
          }}
        >
          Next
          <IoChevronForwardSharp />
        </button>
      </div>
    )
  );
};

export default Pagination;
