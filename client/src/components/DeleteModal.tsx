import { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { ListItem, TaskResponse } from "../types/ListItem";
import { useDelete } from "../hooks/useDelete";
import { useQuery } from "@tanstack/react-query";
import { fetchList } from "../services/my_api";
import { usePageSizeStore } from "../stores/usePageSizeStore";

interface DeleteProps {
  value: ListItem;
  currentPage: number;
}

const DeleteModal = ({ value, currentPage }: DeleteProps) => {
  const { pagePerSheet } = usePageSizeStore();

  // Fetch items list
  const { data } = useQuery<TaskResponse>({
    queryKey: ["list", currentPage, pagePerSheet],
    queryFn: () => fetchList(currentPage, pagePerSheet),
    refetchOnWindowFocus: false,
  });
  const resultLength: number = data?.result.length || 0;

  const { mutate: deleteMutation, isPending: isDeletePending } = useDelete({
    currentPage,
    resultLength,
  });

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false); // State to handle animation

  const openModal = () => {
    setIsOpen(true);
    setTimeout(() => setIsAnimating(true), 10); // Start animation slightly after opening
  };

  const closeModal = () => {
    setIsAnimating(false);
    setTimeout(() => setIsOpen(false), 300); // Delay closing to allow animation to finish
  };

  return (
    <div>
      {/* Delete button */}
      <button
        type="button"
        className="btn btn-danger"
        onClick={openModal}
        disabled={value.checked}
      >
        <MdDeleteOutline />
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          className={`modal fade ${isAnimating ? "show" : "hide"}`}
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          aria-labelledby="staticBackdropLabel"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content transition-all duration-300">
              {" "}
              {/* Smooth transition */}
              <div className="modal-header">
                <h5 className="modal-title font-bold uppercase">
                  Confirm your delete action
                </h5>
                <button
                  type="button"
                  className="close border-none focus:border-none"
                  onClick={closeModal}
                  aria-label="Close"
                >
                  &times;
                </button>
              </div>
              <div className="modal-body">
                This Task: <b>{value.title}</b> will be deleted immediately, and
                there will be no way to undo this action.
                <br />
                Are you sure about your action?
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                {isDeletePending ? (
                  <button className="btn btn-danger opacity-60 flex items-center justify-center px-4">
                    <div
                      className="w-5 h-5 border-4 border-blue-500 border-solid rounded-full animate-spin border-t-transparent"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      deleteMutation(value.id);
                      closeModal();
                    }}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteModal;
