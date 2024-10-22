import React from "react";
import "./pagination.css";

// Define the prop types for the Pagination component
interface PaginationProps {
  handlePagination: (page: number) => void;
  previousPage: () => void;
  nextPage: () => void;
  currentPage: number;
  listData: {
    totalPages: number;
  } | null; // Optional chaining or null for cases where data isn't fetched
}

const Pagination: React.FC<PaginationProps> = ({
  handlePagination,
  previousPage,
  nextPage,
  currentPage,
  listData,
}) => {
  return (
    <div className="pagination">
      {/* Previous button */}

      <button onClick={previousPage} disabled={currentPage === 1}>
        &laquo;
      </button>

      {/* If the page you are looking for is page number 1, then no previous page numbers exist */}
      {currentPage === 1 ? (
        <></>
      ) : (
        <button onClick={previousPage}>{currentPage - 1}</button>
      )}

      {/* Current Page */}

      <button
        onClick={() => handlePagination(currentPage)}
        disabled
        className="activeButton"
      >
        {currentPage}
      </button>

      {/* If the page you are looking for is more than total pages, then no next page numbers exist */}
      {currentPage >= (listData?.totalPages ?? 0) ? (
        <></>
      ) : (
        <button onClick={nextPage}>{currentPage + 1}</button>
      )}

      {/* Next button */}

      <button
        onClick={nextPage}
        disabled={currentPage >= (listData?.totalPages ?? 0)}
      >
        &raquo;
      </button>
    </div>
  );
};

export default Pagination;
