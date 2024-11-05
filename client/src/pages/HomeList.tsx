import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { arrayMoveImmutable as arrayMove } from "array-move"; // Updated task order import
import LoadingSpinner from "../components/LoadingSpinner";
import Pagination from "../components/Pagination";
import { fetchList } from "../services/my_api";
import { useQuery } from "@tanstack/react-query";
import SortableList from "./SortableList";
import { useReorderTasks } from "../hooks/useReorderTasks";
import Card from "../components/Card";
import { TaskResponse } from "../types/ListItem";
import { usePageSizeStore } from "../stores/usePageSizeStore";

// Ignore warning findDOMNode error caused by `react-sortable-hoc`
const originalError = console.error;
console.error = (...args) => {
  if (
    (typeof args[0] === "string" &&
      args[0].includes("Warning: findDOMNode is deprecated")) ||
    args[0].includes("Warning: %s is deprecated")
  ) {
    return;
  }
  originalError(...args);
};

const HomeList: React.FC = () => {
  // Page per sheet
  const { pagePerSheet, setPagePerSheet } = usePageSizeStore();

  // Current page for Pagination
  const { page } = useParams<{ page?: string }>();
  const [currentPage, setCurrentPage] = useState<number>(parseInt(page || "1"));

  // Get page Location
  const location = useLocation();

  // useNavigate to programmatically change routes for Pagination page route
  const navigate = useNavigate();

  // Scroll to top by using useRef
  const topElement = useRef<HTMLDivElement | null>(null);

  const scrollToTop = () => {
    if (topElement.current) {
      topElement.current.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Fetch item list
  const { isFetched, data } = useQuery<TaskResponse>({
    queryKey: ["list", currentPage, pagePerSheet],
    queryFn: () => fetchList(currentPage, pagePerSheet),
    refetchOnWindowFocus: false,
  });

  // Toastify after Delete / Add / Update successfully
  useEffect(() => {
    // Check if deletion was successful
    if (location.state?.deleteSuccess) {
      // Reset the state to avoid triggering the toast again
      navigate(`/page/${currentPage - 1}`, {
        state: {},
      });

      toast.success("Task deleted successfully", { theme: "light" });
    }

    // Check if addition was successful
    if (location.state?.addSuccess) {
      // Reset the state to avoid triggering the toast again
      navigate(`/page/${data?.totalPages || 1}`, {
        state: {},
      });

      toast.success("Task added successfully", { theme: "light" });
    }

    // Check if update was successful
    if (location.state?.updateSuccess) {
      // Reset the state to avoid triggering the toast again
      navigate(`/page/${currentPage}`, {
        state: {},
      });

      toast.success("Task updated successfully", { theme: "light" });
    }
  }, [location.pathname]);

  // Handle sort end event for drag and drop
  const { mutate: reorderedTaskMutation } = useReorderTasks();

  const onSortEnd = ({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number;
    newIndex: number;
  }) => {
    if (!data) return;

    // Step 1: Sort the tasks based on the 'order' property
    const sortedTasks = [...data?.result].sort((a, b) => a.order - b.order);

    // Step 2: Move the item within the sorted array using the absolute indices
    const updatedTask = arrayMove(sortedTasks, oldIndex, newIndex);

    // Bonus step: Gives the index where the current page starts in the full list
    const currentPageOffset = (currentPage - 1) * pagePerSheet;

    // Step 3: After reordering, update the 'order' property for each item
    const reorderedTasks = updatedTask.map((item: any, index: number) => ({
      ...item,
      order: index + currentPageOffset + 1, // Assign new order based on index
    }));

    // Step 4: Send reordered tasks to the server
    reorderedTaskMutation(reorderedTasks);
  };

  // Pagination Function
  const handlePagination = (pageNumber: number) => {
    navigate(`/page/${pageNumber}`);
  };

  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
      handlePagination(currentPage - 1);
      scrollToTop();
    }
  };

  const nextPage = () => {
    if (currentPage <= (data?.totalPages || 1)) {
      setCurrentPage(currentPage + 1);
      handlePagination(currentPage + 1);
      scrollToTop();
    }
  };

  return (
    <Card>
      {/* Scroll to Top */}
      <div className="relative">
        <div ref={topElement} className="absolute -top-32"></div>
      </div>

      {/* Title */}
      <h2 className="text-center mb-4 text-[#f96c6c] uppercase font-bold text-base md:text-xl">
        To do List
      </h2>

      <div className="flex justify-between items-center">
        <input
          type="number"
          id="pagePerSheet"
          min={1}
          max={data?.dataLength || 1}
          defaultValue={pagePerSheet || 3}
          placeholder="Page size"
          onChange={(e) => {
            setPagePerSheet(parseInt(e.target.value) || pagePerSheet);
            setCurrentPage(1);
            handlePagination(1);
          }}
          className="focus:outline-none px-2 py-1 w-24 rounded-md text-deep-orange-600 font-bold"
        />

        {/* Add a Card Button */}
        <div className="my-4 px-2 text-sm md:text-lg rounded-sm transition-all duration-150 delay-75 hover:text-gray-500 w-full text-right focus:no-underline">
          <Link
            to="/add"
            style={{ textDecoration: "none" }}
            state={{ currentPage: currentPage }}
          >
            + Add a Card
          </Link>
        </div>
      </div>

      {/* Content */}
      {!isFetched ? (
        <LoadingSpinner />
      ) : (
        <SortableList
          items={data?.result || []}
          // ensures that only the drag handle is used for dragging
          useDragHandle={true}
          onSortEnd={onSortEnd}
          currentPage={currentPage}
        />
      )}

      {/* Toastify */}
      <ToastContainer
        position="bottom-left"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      {/* Pagination */}
      <Pagination
        handlePagination={handlePagination}
        previousPage={previousPage}
        nextPage={nextPage}
        currentPage={currentPage}
        listData={data ?? null}
      />
    </Card>
  );
};

export default HomeList;
