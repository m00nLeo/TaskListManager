import React from "react";

const retake = () => {
  return (
    <div>
      <div className="task-list">
        {list?.map((item) => (
          <div
            key={item.id}
            className={`flex items-center gap-4 bg-white shadow-xl rounded-lg w-full px-8 py-2 mb-3 transition-all duration-150 delay-100  ${
              checkedItems[item.id] ? "opacity-55 no-select" : "opacity-100"
            }`}
          >
            {/* Task UI */}
            <div className="w-full py-4">
              <div className="flex flex-col gap-2 justify-center ">
                {/* title */}
                <p className="bg-orange-400/80 font-bold text-white rounded-lg px-2 py-1 w-fit capitalize">
                  {item.title}
                </p>

                {/* description */}
                <p className="italic font-light px-1 text-md">
                  {item.description}
                </p>

                {/* Time & Button */}
                <div className="text-gray-600 italic font-normal text-md flex justify-between items-center w-full">
                  {/* 2024-09-23 format */}
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
                  {/* Button */}
                  <div className="flex gap-3">
                    {/* Edit btn */}
                    <Link to={`/update/${item.id}`}>
                      <button
                        className="btn btn-warning"
                        style={{ textDecoration: "none" }}
                        disabled={checkedItems[item.id]} // Disable based on the checkbox state
                      >
                        <FaRegEdit />
                      </button>
                    </Link>

                    {/* Delete btn */}
                    <button
                      type="button"
                      className="btn btn-danger"
                      data-toggle="modal"
                      data-target={`#deleteModal${item.id}`}
                      disabled={checkedItems[item.id]} // Disable based on the checkbox state
                    >
                      <MdDeleteOutline />
                    </button>

                    {/* <!-- Modal --> */}
                    <div
                      className="modal fade"
                      id={`deleteModal${item.id}`}
                      tabIndex="-1"
                      role="dialog"
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
                              className="close"
                              data-dismiss="modal"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">&times;</span>
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
                              data-dismiss="modal"
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
                onChange={() => handleCheckboxChange(item.id)}
                // Check if the item is checked in the state
                checked={checkedItems[item.id]}
              >
                <input
                  id={item.id}
                  type="checkbox"
                  className="peer relative h-5 w-5 cursor-pointer appearance-none rounded border border-slate-300 shadow hover:shadow-md transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-pink-400 before:opacity-0 before:transition-opacity checked:border-blue-400 checked:bg-blue-400 checked:before:bg-pink-400 hover:before:opacity-10"
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
        ))}
      </div>
    </div>
  );
};

export default retake;
