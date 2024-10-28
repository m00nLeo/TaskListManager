import { MdDeleteOutline } from "react-icons/md";
import { ListItem } from "../types/ListItem";

interface DeleteProps {
  value: ListItem;
  deleteMutation: (id: string) => void;
  deleteSuccess: boolean;
}

const DeleteModal = ({ value, deleteMutation, deleteSuccess }: DeleteProps) => {
  return (
    <div>
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
        <div className="modal-dialog modal-dialog-centered" role="document">
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
              This Task: <b>{value.title}</b> will be delete intermediately, and
              no other to retake the action.
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

              {deleteSuccess ? (
                <button
                  className="btn btn-danger opacity-60 flex items-center justify-center px-4"
                >
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
                  onClick={() => deleteMutation(value.id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
