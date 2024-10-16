import { useMutation } from "@tanstack/react-query";
import { addList } from "../services/my_api";
import { toast } from "react-toastify";

export const useAddList = () => {
  const mutation = useMutation({
    mutationFn: addList,
    onSuccess: () => {
      toast.success("Task added successfully", {
        theme: "light",
      });

      // Redirect to home page after success
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    },
    onError: () => {
      toast.error("Failed to add task. Please try again.", { theme: "dark" });
    },
  });
  return mutation;
};
