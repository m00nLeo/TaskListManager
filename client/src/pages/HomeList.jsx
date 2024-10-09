import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { IoMdTime } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import Card from "../components/Card";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from "react-sortable-hoc"; //`react-sortable-hoc` relies on findDOMNode so its will cause several warning
import { arrayMoveImmutable as arrayMove } from "array-move"; // Updated import
import LoadingSpinner from "../components/LoadingSpinner";
import Pagination from "../components/Pagination";

// ignore warning findDOMNode error caused by `react-sortable-hoc`
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

// Create a Drag Handle component (the dots)
// SortableHandle is used to create the handle (DragHandle), which limits dragging to that specific element (⋮⋮ dots).
const DragHandle = SortableHandle(() => (
  <span className="active:cursor-grabbing cursor-grab md:mr-4 text-lg md:text-xl lg:text-2xl font-bold">
    ⋮⋮
  </span> // The handle (dots)
));

// Sortable task item component
const SortableItem = SortableElement(
  ({ item, handleDelete, handleCheckboxChange }) => (
    <div
      className={`flex flex-col md:flex-row items-center gap-1 md:gap-4 bg-white shadow-2xl rounded-lg w-3/4 md:w-full mx-auto md:px-6 py-2 mb-3 transition-all ease-linear duration-150 delay-100 no-select ${
        !item.checked
          ? "opacity-100 hover:animate-gradient-border"
          : "opacity-55"
      }  border-4 borderWhite`}
    >
      {/* Only the DragHandle is draggable */}
      <DragHandle />

      {/* Task UI */}
      <div className="w-full py-2 md:py-4">
        <div className="flex flex-col gap-2 justify-center items-center md:items-start">
          {/* title */}
          <p className="bg-orange-400/80 font-bold text-white rounded-lg px-2 py-1 w-fit capitalize text-xs md:text-base">
            {item.title}
          </p>

          {/* description */}
          <p className="italic font-light px-1 text-xs md:text-md">
            {item.description}
          </p>

          {/* Time & Button */}
          <div className="text-gray-600 italic font-normal text-xs md:text-base gap-1 md:gap-0 flex flex-col md:flex-row justify-between items-center w-full">
            {/* Date Input Task */}
            <p className="flex items-center gap-1">
              <IoMdTime />
              {new Date(item.date_input).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>

            {/* Deadline */}
            <p className="flex items-center gap-1 font-bold text-orange-400 rounded-lg px-2">
              <IoMdTime />
              {new Date(item.deadline).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
            {/* Edit and Delete Buttons */}
            <div className="flex gap-2 md:gap-3 p-2 md:p-0">
              {/* Edit button */}
              {item.checked ? (
                <button className="btn btn-warning" disabled={item.checked}>
                  <FaRegEdit />
                </button>
              ) : (
                <Link to={`/update/${item.id}`}>
                  <button className="btn btn-warning">
                    <FaRegEdit />
                  </button>
                </Link>
              )}

              {/* Delete btn */}
              <button
                type="button"
                className="btn btn-danger"
                data-bs-toggle="modal"
                data-bs-target={`#deleteModal${item.id}`}
                disabled={item.checked} // Disable based on the checkbox state
              >
                <MdDeleteOutline />
              </button>

              {/* Modal */}
              <div
                className="modal fade"
                id={`deleteModal${item.id}`}
                tabIndex="-1"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
              >
                <div
                  className="modal-dialog modal-dialog-centered"
                  role="document"
                >
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title font-bold uppercase">
                        Confirm your delete action
                      </h5>
                      <button
                        type="button"
                        className="close border-none focus:border-none"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      >
                        &times;
                      </button>
                    </div>
                    <div className="modal-body">
                      This Task: <b>{item.title}</b> will be delete
                      intermediately, and no other to retake the action.
                      <br />
                      Are you sure about your action?
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Cancle
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Checkbox */}
      <div className="inline-flex items-center">
        <label
          className="relative flex cursor-pointer items-center rounded-full p-3"
          htmlFor={item.id}
          data-ripple-dark="true"
        >
          <input
            id={item.id}
            type="checkbox"
            onChange={() => handleCheckboxChange(item.id, !item.checked)}
            // Check if the item is checked in the state
            checked={item.checked}
            className="peer relative h-5 w-5 cursor-pointer appearance-none rounded border border-slate-300 shadow-sm hover:shadow-md transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-pink-400 before:opacity-0 before:transition-opacity checked:border-blue-400 checked:bg-blue-400 checked:before:bg-pink-400 hover:before:opacity-10"
          />
          <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5"
              viewBox="0 0 20 20"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </span>
        </label>
      </div>
    </div>
  )
);

// Sortable task list component
const SortableList = SortableContainer(
  ({ items, handleDelete, handleCheckboxChange }) => {
    // Order task by Order when drag and drop
    const sortedTasks = [...items].sort((a, b) => a.order - b.order);
    return (
      <div>
        {sortedTasks?.map((item, index) => (
          <SortableItem
            key={`item-${item.id}`}
            index={index}
            item={item}
            handleDelete={handleDelete}
            handleCheckboxChange={handleCheckboxChange}
          />
        ))}
      </div>
    );
  }
);

const HomeList = () => {
  const [list, setList] = useState([]);

  // Is Loading
  const [isLoading, setIsLoading] = useState(true);

  // Page per sheet
  const [pagePerSheet, setPagePerSheet] = useState(3);

  // List data for pagination for results, pages in total
  const [listData, setListData] = useState([]);

  // Current page for Pagination
  const { page } = useParams();
  const [currentPage, setCurrentPage] = useState(parseInt(page) || 1);

  // useNavigate to programmatically change routes for Pagination page route
  const navigate = useNavigate();

  // Scroll to top by using useRef
  const topElement = useRef(null);

  const scrollToTop = () => {
    if (topElement.current) {
      topElement.current.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Fetch items list
  const fetchList = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000?page=${currentPage}&page_per_sheet=${pagePerSheet}`
      );
      setList(response.data.result);
      setListData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching list:", error);
    }
  };

  useEffect(() => {
    fetchList();
    scrollToTop(); // scroll to the top after fetching the list
  }, [currentPage, pagePerSheet]);

  // Handle delete
  const handleDelete = async (id) => {
    const sortedTasks = [...list].sort((a, b) => a.order - b.order);

    try {
      await axios.delete(`http://localhost:3000/${id}`);

      // Toastify
      toast.success("Task deleted", {
        theme: "dark",
      });

      setTimeout(() => {
        setList(sortedTasks.filter((item) => item.id !== id));
        window.location.reload(); // Consider avoiding reloading if unnecessary
      }, 1000);
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete task. Please try again.", {
        theme: "dark",
      });
    }
  };

  // Handle checkbox
  const handleCheckboxChange = async (id, checked) => {
    const updatedList = list.map((item) =>
      item.id === id ? { ...item, checked } : item
    );

    setList(updatedList);

    // Send updated task to the server to persist the checkbox state
    try {
      await axios.put(`http://localhost:3000/${id}`, { checked }); // Adjust this to API
    } catch (error) {
      console.error(error);
      toast.error("Failed to mark completed task. Please try again.", {
        theme: "dark",
      });
    }
  };

  // Handle sort end event for drag and drop
  const onSortEnd = async ({ oldIndex, newIndex }) => {
    const sortedTasks = [...list].sort((a, b) => a.order - b.order);
    const updatedList = arrayMove(sortedTasks, oldIndex, newIndex);
    console.log(updatedList);

    // After reordering, update each item's 'order' property based on its position
    const reorderedList = updatedList.map((item, index) => ({
      ...item,
      order: index + 1, // Assign new order based on index
    }));

    setList(reorderedList);

    // Send updated order to the server
    try {
      await axios.put("http://localhost:3000/", reorderedList); // Update this to server's route
    } catch (error) {
      console.error(error);
      toast.error("Failed to update list order. Please try again.", {
        theme: "dark",
      });
    }
  };

  // Handle  Function
  const handlePagination = (pageNumber) => {
    navigate(`/page/${pageNumber}`);
  };

  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
      handlePagination(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage <= listData?.totalPages) {
      setCurrentPage(currentPage + 1);
      handlePagination(currentPage + 1);
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
          min={1}
          max={listData?.data?.length}
          defaultValue={pagePerSheet}
          placeholder="Page size"
          onChange={(e) => {
            setPagePerSheet(e.target.value);
            setCurrentPage(1);
            handlePagination(1);
          }}
          className="focus:outline-none px-2 py-1 w-24 rounded-md text-deep-orange-600 font-bold"
        />
        {/* Add a Card Button */}
        <div className="my-4 px-2 text-sm md:text-lg rounded-sm transition-all duration-150 delay-75 hover:text-gray-500 w-full text-right focus:no-underline">
          <Link to="/add" style={{ textDecoration: "none" }}>
            + Add a Card
          </Link>
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <SortableList
          items={list}
          // ensures that only the drag handle is used for dragging
          useDragHandle={true}
          onSortEnd={onSortEnd}
          handleDelete={handleDelete}
          handleCheckboxChange={handleCheckboxChange}
        />
      )}

      {/* Tosattify */}
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
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
        listData={listData}
      />
    </Card>
  );
};

export default HomeList;
