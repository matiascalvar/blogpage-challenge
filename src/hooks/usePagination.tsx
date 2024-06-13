import { useState } from "react";

const usePagination = <T,>(totalItems: T[], initialItemsPerPage = 3) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = totalItems.slice(indexOfFirstItem, indexOfLastItem);

  const handlePagination = (pageNumber: number) => setCurrentPage(pageNumber);

  return {
    currentPage,
    itemsPerPage,
    currentItems,
    handlePagination,
  };
};

export default usePagination;
