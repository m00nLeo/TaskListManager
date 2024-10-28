import { useMutation } from "@tanstack/react-query";
import { handleDelete } from "../services/my_api";
import { toast } from "react-toastify";
import { TaskResponse } from "../types/ListItem";
import { useNavigate } from "react-router-dom";

export const useDelete = (
  data: TaskResponse | undefined,
  currentPage: number
) => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: handleDelete,
    onSuccess: () => {
      // Consider avoiding reloading if unnecessary
      setTimeout(() => {
        data && data?.result.length < 1
          ? navigate(`/`)
          : data && data?.page > 1
          ? navigate(`/page/${currentPage - 1}`, {
              state: { deleteSuccess: true },
            })
          : navigate("/");
      }, 1000);
      // setTimeout(() => {
      //   navigate(`/page/${currentPage - 1}`, {
      //     state: { deleteSuccess: true },
      //   });
      // }, 1000);
    },
    onError: () => {
      toast.error("Failed to update task status", { theme: "dark" });
    },
  });
  return mutation;
};
