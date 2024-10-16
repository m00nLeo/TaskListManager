import { useMutation } from "@tanstack/react-query";
import { handleDelete } from "../services/my_api";
import { toast } from "react-toastify";

export const useDelete = (data, currentPage) => {
  const mutation = useMutation({
    mutationFn: handleDelete,
    onSuccess: () => {
      toast.success("Task status updated", { theme: "dark" });

      // Consider avoiding reloading if unnecessary
      setTimeout(() => {
        data?.result.length > 1
          ? window.location.reload()
          : data?.page > 1
          ? (window.location.href = `/page/${currentPage - 1}`)
          : window.location.reload();
      }, 1000);
    },
    onError: () => {
      toast.error("Failed to update task status", { theme: "dark" });
    },
  });
  return mutation;
};
