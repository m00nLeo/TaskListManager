import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { handleUpdate } from "../services/my_api";

export const useUpdate = () => {
  const mutation = useMutation({
    mutationFn: (updatedData) => {
      const { id, updateTask } = updatedData;

      // Return for a Promise, understand to wait for promise (async, await) before get to onSuccess step
      return handleUpdate(id, updateTask);
    },
    onSuccess: () => {
      // Toastify
      toast.success("Task updated", {
        theme: "light",
      });

      // Back to hompage
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    },
    onError: () => {
      toast.error("Failed to update task. Please try again.", {
        theme: "dark",
      });
    },
  });

  return mutation;
};
