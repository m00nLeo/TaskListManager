import React, { FormEvent, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Card from "../components/Card";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useQuery } from "@tanstack/react-query";
import { fetchList } from "../services/my_api";
import { useUpdate } from "../hooks/useUpdate";
import { ListItem } from "../types/ListItem";

const Update = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");

  // Type the ID param
  const { id } = useParams<{ id: string }>();

  // Fetch items list
  const { data } = useQuery({
    queryKey: ["list"],
    queryFn: () => fetchList(),
    refetchOnWindowFocus: false,
  });

  // Call mutation
  const { mutate, isSuccess } = useUpdate();

  // Find updated item
  const selectedItem = data?.data.find((item: ListItem) => item?.id == id);

  // Date format
  const day = String(
    new Date(selectedItem?.date_input || "").getDate()
  ).padStart(2, "0");
  const month = String(
    new Date(selectedItem?.date_input || "").getMonth() + 1
  ).padStart(2, "0");
  const year = new Date(selectedItem?.date_input || "").getFullYear();

  // Record change each input
  useEffect(() => {
    if (selectedItem) {
      setTitle(selectedItem.title);
      setDescription(selectedItem.description);
      setDate(selectedItem.deadline);
    }
  }, [selectedItem]);

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if there are any change detected
    if (
      title !== selectedItem?.title ||
      description !== selectedItem?.description ||
      date !== selectedItem?.deadline
    ) {
      // Task change record data
      const updateTask = {
        order: selectedItem?.order,
        title: title,
        description: description,
        date_input: `${year}-${month}-${day}`,
        deadline: date,
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
        onSubmit={handleUpdate}
      >
        <div className="flex flex-col mt-1 mb-2">
          <label className="font-semibold" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            name=""
            id="title"
            required
            defaultValue={selectedItem?.title}
            className="border border-gray-300 rounded-lg focus:outline-none px-3 py-2"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex flex-col mt-1 mb-2">
          <label className="font-semibold" htmlFor="des">
            Description
          </label>
          <input
            type="text"
            name=""
            id="des"
            required
            defaultValue={selectedItem?.description}
            className="border border-gray-300 rounded-lg focus:outline-none px-3 py-2"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="flex flex-col mt-1 mb-2">
          <label className="font-semibold" htmlFor="date">
            Date finish
          </label>
          <input
            type="date"
            name=""
            id="date"
            required
            defaultValue={selectedItem?.deadline}
            className="border border-gray-300 rounded-lg focus:outline-none px-3 py-2"
            onChange={(e) => setDate(e.target.value)}
          />
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
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className="mt-2 flex justify-center items-center gap-2">
            <FaLongArrowAltLeft /> Back to homepage
          </div>
        </Link>
      </div>
    </Card>
  );
};

export default Update;
