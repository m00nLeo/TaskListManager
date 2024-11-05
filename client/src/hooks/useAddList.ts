import { useMutation } from "@tanstack/react-query";
import { addList } from "../services/my_api";
import { toast } from "react-toastify";
import { ListItem, TaskResponse } from "../types/ListItem";
import { useNavigate } from "react-router-dom";
import { usePageSizeStore } from "../stores/usePageSizeStore";

export const useAddList = (
  lastPage: number,
  data: TaskResponse | undefined
) => {
  const navigate = useNavigate();
  const { pagePerSheet } = usePageSizeStore();

  // Generics <>: set Type
  const mutation = useMutation<ListItem, Error, ListItem>({
    mutationFn: addList, // addList should return a Promise
    onSuccess: () => {
      // Redirect to home page after success
      setTimeout(() => {
        pagePerSheet === data?.result.length
          ? navigate(`/page/${lastPage + 1}`, {
              state: { addSuccess: true },
            })
          : navigate(`/page/${lastPage}`, {
              state: { addSuccess: true },
            });
      }, 100);
    },
    onError: () => {
      toast.error("Failed to add task. Please try again.", { theme: "dark" });
    },
  });
  
  return mutation;
};
