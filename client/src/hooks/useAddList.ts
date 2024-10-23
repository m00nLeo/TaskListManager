import { useMutation } from "@tanstack/react-query";
import { addList } from "../services/my_api";
import { toast } from "react-toastify";
import { ListItem } from "../types/ListItem";

export const useAddList = (lastPage: number) => {
  // Generics <>: set Type
  const mutation = useMutation<ListItem, Error, ListItem>({
    mutationFn: addList, // addList should return a Promise
    onSuccess: () => {
      toast.success("Task added successfully", {
        theme: "light",
      });

      // Redirect to home page after success
      setTimeout(() => {
        window.location.href = `/page/${lastPage}`;
      }, 1000);
    },
    onError: () => {
      toast.error("Failed to add task. Please try again.", { theme: "dark" });
    },
  });
  return mutation;
};
