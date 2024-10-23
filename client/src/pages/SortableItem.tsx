import { FaRegEdit } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { SortableElement, SortableHandle } from "react-sortable-hoc"; //`react-sortable-hoc` relies on findDOMNode so its will cause several warning
import { ListItem } from "../types/ListItem";

// Props type
interface SortableItemProps {
  value: ListItem;
  checkboxChangeMutation: (data: { id: string; checked: boolean }) => void;
  deleteMutation: (id: string) => void;
  currentPage: number;
}

// Create a Drag D component (the dots)
// SortableHandle is used to create the handle (DragHandle), which limits dragging to that specific element (⋮⋮ dots).
const DragHandle = SortableHandle(() => (
  <span className="active:cursor-grabbing cursor-grab md:mr-4 text-lg md:text-xl lg:text-2xl font-bold">
    ⋮⋮
  </span> // The handle (dots)
));

// Sortable task item component
// Generics <>: set Type
const SortableItem = SortableElement<SortableItemProps>(
  ({
    value,
    checkboxChangeMutation,
    deleteMutation,
    currentPage,
  }: SortableItemProps) => {
    return (
      <div
        className={`flex flex-col md:flex-row items-center gap-1 md:gap-4 bg-white shadow-2xl rounded-lg w-3/4 md:w-full mx-auto md:px-6 py-2 mb-3 transition-all ease-linear duration-150 delay-100 no-select ${
          !value.checked
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
              {value.title}
            </p>

            {/* description */}
            <p className="italic font-light px-1 text-xs md:text-md">
              {value.description}
            </p>

            {/* Time & Button */}
            <div className="text-gray-600 italic font-normal text-xs md:text-base gap-1 md:gap-0 flex flex-col md:flex-row justify-between items-center w-full">
              {/* Date Input Task */}
              <p className="flex items-center gap-1">
                <IoMdTime />
                {new Date(value.date_input).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>

              {/* Deadline */}
              <p className="flex items-center gap-1 font-bold text-orange-400 rounded-lg px-2">
                <IoMdTime />
                {new Date(value.deadline).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
              {/* Edit and Delete Buttons */}
              <div className="flex gap-2 md:gap-3 p-2 md:p-0">
                {/* Edit button */}
                {value.checked ? (
                  <button className="btn btn-warning" disabled={value.checked}>
                    <FaRegEdit />
                  </button>
                ) : (
                  <Link
                    to={`/update/${value.id}`}
                    state={{ currentPage: currentPage }}
                  >
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
                  data-bs-target={`#deleteModal${value.id}`}
                  disabled={value.checked} // Disable based on the checkbox state
                >
                  <MdDeleteOutline />
                </button>

                {/* Modal */}
                <div
                  className="modal fade"
                  id={`deleteModal${value.id}`}
                  tabIndex={-1}
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
                        This Task: <b>{value.title}</b> will be delete
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
                          onClick={() => deleteMutation(value.id)}
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
            htmlFor={value.id}
            data-ripple-dark="true"
          >
            <input
              id={value.id}
              type="checkbox"
              onChange={() =>
                checkboxChangeMutation({
                  id: value.id,
                  checked: !value.checked,
                })
              }
              // Check if the value is checked in the state
              checked={value.checked}
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
    );
  }
);

export default SortableItem;
