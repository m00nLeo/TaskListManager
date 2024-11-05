import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { handleUpdate } from "../services/my_api";
import { ListItem } from "../types/ListItem";
import { useNavigate } from "react-router-dom";

interface UpdateData {
  id: string;
  updateTask: Partial<ListItem>;
}

export const useUpdate = (currentPage: number) => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (updatedData: UpdateData) => {
      const { id, updateTask } = updatedData;

      // Return for a Promise, understand to wait for promise (async, await) before get to onSuccess step
      return handleUpdate(id, updateTask);
    },
    onSuccess: () => {
      // Back to previous page
      setTimeout(() => {
        navigate(`/page/${currentPage}`, {
          state: { updateSuccess: true },
        });
      }, 100);
    },
    onError: () => {
      toast.error("Failed to update task. Please try again.", {
        theme: "dark",
      });
    },
  });

  return mutation;
};
