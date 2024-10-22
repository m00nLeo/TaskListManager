import { useMutation } from "@tanstack/react-query";
import { handleDelete } from "../services/my_api";
import { toast } from "react-toastify";

interface Task {
  id: string;
  title: string;
  description: string;
  date_input: string;
  deadline: string;
  order: number;
  checked: boolean;
}

interface Data {
  result: Task[];
  page: number;
}

export const useDelete = (data: Data | undefined, currentPage: number) => {
  const mutation = useMutation({
    mutationFn: handleDelete,
    onSuccess: () => {
      toast.success("Task status updated", { theme: "dark" });

      // Consider avoiding reloading if unnecessary
      setTimeout(() => {
        data && data?.result.length > 1
          ? window.location.reload()
          : data && data?.page > 1
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
