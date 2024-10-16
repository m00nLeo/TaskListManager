import React, { useState } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useQuery } from "@tanstack/react-query";
import { fetchList } from "../services/my_api";
import { useAddList } from "../hooks/useAddList";

const AddList = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [errors, setErrors] = useState({});

  const day = String(new Date().getDate()).padStart(2, "0");
  const month = String(new Date().getMonth() + 1).padStart(2, "0");
  const year = new Date().getFullYear();
  const today = `${year}-${month}-${day}`;

  // Fetch items list
  const { data } = useQuery({
    queryKey: ["list"],
    queryFn: () => fetchList(),
    refetchOnWindowFocus: false,
  });

  // Validate form fields
  const validateForm = () => {
    let validationErrors = {};
    // Adding key-value pairs to Object
    if (!title) validationErrors.title = "*Title is required";
    if (!description) validationErrors.description = "*Description is required";
    if (!date) validationErrors.date = "*Deadline date is required";
    else if (new Date(date) < new Date(today)) {
      validationErrors.date = "*Deadline cannot be in the past";
    }

    setErrors(validationErrors);

    // Check if there are any Object keys -> Check true===0 (no Object Keys) / false
    return Object.keys(validationErrors).length === 0;
  };

  // UseMutation hook for adding a new list item
  const { mutate, isSuccess } = useAddList();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form.", { theme: "dark" });
      return;
    }

    const newTask = {
      order: Math.max(...data?.data?.map((e) => e.order)) + 1,
      title,
      description,
      date_input: today,
      deadline: date,
    };

    // Trigger the mutation to add a new list
    mutate(newTask);
  };

  return (
    <Card fluid={true}>
      <form
        className="flex flex-col bg-white shadow-xl rounded-lg w-full px-8 py-2"
        onSubmit={handleSubmit}
      >
        {/* Title Input */}
        <div className="flex flex-col mt-1 mb-2">
          <div className="flex flex-col md:flex-row justify-between md:items-center">
            <label className="font-semibold" htmlFor="title">
              Title
            </label>
            {errors.title && (
              <p className="text-red-500 text-sm font-semibold italic mb-2">
                {errors.title}
              </p>
            )}
          </div>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`border focus:outline-none rounded-lg px-3 py-2 ${
              errors.title
                ? "border-red-important-validation "
                : "border-gray-300"
            }`}
          />
        </div>

        {/* Description Input */}
        <div className="flex flex-col mt-1 mb-2">
          <div className="flex flex-col md:flex-row justify-between md:items-center">
            <label className="font-semibold" htmlFor="description">
              Description
            </label>
            {errors.description && (
              <p className="text-red-500 text-sm font-semibold italic mb-2">
                {errors.description}
              </p>
            )}
          </div>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`border focus:outline-none rounded-lg px-3 py-2 ${
              errors.description
                ? "border-red-important-validation "
                : "border-gray-300"
            }`}
          />
        </div>

        {/* Date Input */}
        <div className="flex flex-col mt-1 mb-2">
          <div className="flex flex-col md:flex-row justify-between md:items-center">
            <label className="font-semibold" htmlFor="date">
              Deadline
            </label>
            {errors.date && (
              <p className="text-red-500 text-sm font-semibold italic mb-2">
                {errors.date}
              </p>
            )}
          </div>
          <input
            type="date"
            id="date"
            value={date}
            min={today}
            onChange={(e) => setDate(e.target.value)}
            className={`border focus:outline-none rounded-lg px-3 py-2 ${
              errors.date
                ? "border-red-important-validation "
                : "border-gray-300"
            }`}
          />
        </div>

        {/* Submit Button */}
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
              Add Task
            </button>
          )}
        </div>
      </form>

      {/* Back Link */}
      <div className="hover:text-gray-500">
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className="mt-2 flex justify-center items-center gap-2">
            <FaLongArrowAltLeft /> Back to homepage
          </div>
        </Link>
      </div>
    </Card>
  );
};

export default AddList;
