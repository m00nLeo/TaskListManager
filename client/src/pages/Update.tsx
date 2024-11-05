import { useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Card from "../components/Card";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useQuery } from "@tanstack/react-query";
import { fetchList } from "../services/my_api";
import { useUpdate } from "../hooks/useUpdate";
import { ListItem } from "../types/ListItem";
import { useForm, SubmitHandler } from "react-hook-form";

interface FormFields {
  title: string;
  description: string;
  date: string;
}

const Update = () => {
  // useLocation hook to access the parameters passed via state
  const location = useLocation();
  const { currentPage } = location.state || {}; // Access the state

  // Type the ID param
  const { id } = useParams<{ id: string }>();

  // React-hook-form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormFields>();

  // Fetch items list
  const { data } = useQuery({
    queryKey: ["list", currentPage],
    queryFn: () => fetchList(currentPage),
    refetchOnWindowFocus: false,
  });

  // Call mutation
  const { mutate, isSuccess } = useUpdate(currentPage);

  // Find updated item
  const selectedItem = data?.result.find((item: ListItem) => item?.id == id);

  // Set form values when selectedItem is found
  useEffect(() => {
    if (selectedItem) {
      setValue("title", selectedItem.title);
      setValue("description", selectedItem.description);
      setValue("date", selectedItem.deadline);
    }
  }, [selectedItem, setValue]);

  // Handle form submission
  const onSubmit: SubmitHandler<FormFields> = (formData) => {
    if (
      formData.title !== selectedItem?.title ||
      formData.description !== selectedItem?.description ||
      formData.date !== selectedItem?.deadline
    ) {
      // Task record changed (not included Checkbox)
      const updateTask = {
        order: selectedItem?.order,
        title: formData.title,
        description: formData.description,
        date_input: selectedItem?.date_input,
        deadline: formData.date,
      };

      // Trigger the mutation to update list
      if (id) mutate({ id, updateTask });
    } else {
      toast.error("No changes detected, no update performed.", {
        theme: "dark",
      });
    }
  };

  return (
    <Card fluid={true}>
      <form
        className="flex flex-col bg-white shadow-xl rounded-lg w-full px-8 py-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col mt-1 mb-2">
          <label className="font-semibold" htmlFor="title">
            Title
          </label>
          <input
            {...register("title", { required: "Title is required" })}
            type="text"
            id="title"
            className="border border-gray-300 rounded-lg focus:outline-none px-3 py-2"
          />
          {errors.title && (
            <p className="text-red-500 text-sm font-semibold italic mb-2">
              * {errors.title.message}
            </p>
          )}
        </div>

        <div className="flex flex-col mt-1 mb-2">
          <label className="font-semibold" htmlFor="description">
            Description
          </label>
          <input
            {...register("description", {
              required: "Description is required",
            })}
            type="text"
            id="description"
            className="border border-gray-300 rounded-lg focus:outline-none px-3 py-2"
          />
          {errors.description && (
            <p className="text-red-500 text-sm font-semibold italic mb-2">
              * {errors.description.message}
            </p>
          )}
        </div>

        <div className="flex flex-col mt-1 mb-2">
          <label className="font-semibold" htmlFor="date">
            Date finish
          </label>
          <input
            {...register("date", { required: "A date must be selected" })}
            type="date"
            id="date"
            className="border border-gray-300 rounded-lg focus:outline-none px-3 py-2"
          />
          {errors.date && (
            <p className="text-red-500 text-sm font-semibold italic mb-2">
              * {errors.date.message}
            </p>
          )}
        </div>

        <div className="flex justify-center">
          {isSuccess ? (
            <span className="mt-3 py-2 flex items-center justify-center border w-32 h-fit rounded-lg bg-orange-400/30 cursor-progress">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </span>
          ) : (
            <button
              type="submit"
              className="mt-3 px-2 py-3 border w-fit rounded-lg text-white font-bold bg-orange-400 transition-all duration-150 delay-75 hover:bg-orange-600"
            >
              Apply Change
            </button>
          )}
        </div>
      </form>

      <div className="hover:text-gray-500">
        <Link to={`/page/${currentPage}`} style={{ textDecoration: "none" }}>
          <div className="mt-2 flex justify-center items-center gap-2">
            <FaLongArrowAltLeft /> Back to homepage
          </div>
        </Link>
      </div>
    </Card>
  );
};

export default Update;
