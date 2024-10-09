import React from "react";
import paginationUiClasses from "./pagination.module.css";

const Pagination = ({
  handlePagination,
  previousPage,
  nextPage,
  currentPage,
  listData,
}) => {
  return (
    <div className={paginationUiClasses.pagination}>
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
        className={paginationUiClasses.activeButton}
      >
        {currentPage}
      </button>

      {/* If the page you are looking for is more than total pages, then no next page numbers exist */}
      {currentPage >= listData?.totalPages ? (
        <></>
      ) : (
        <button onClick={nextPage}>{currentPage + 1}</button>
      )}

      {/* Next button */}

      <button onClick={nextPage} disabled={currentPage >= listData?.totalPages}>
        &raquo;
      </button>
    </div>
  );
};

export default Pagination;
