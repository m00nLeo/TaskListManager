import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Card from "../components/Card";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Update = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [list, setList] = useState([]);

  const { id } = useParams();

  // Fetch items list
  const fetchList = async () => {
    try {
      const response = await axios.get("http://localhost:3000");
      setList(response.data);
    } catch (error) {
      console.error("Error fetching list:", error);
    }
  };

  const selectedItem = list?.find((item) => item?.id == id);
  const day = String(new Date(selectedItem?.date_input).getDate()).padStart(
    2,
    "0"
  );
  const month = String(
    new Date(selectedItem?.date_input).getMonth() + 1
  ).padStart(2, "0");
  const year = new Date(selectedItem?.date_input).getFullYear();

  useEffect(() => {
    fetchList();
  }, []);

  useEffect(() => {
    if (selectedItem) {
      setTitle(selectedItem.title);
      setDescription(selectedItem.description);
      setDate(selectedItem.deadline);
    }
  }, [selectedItem]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    // Check if there are any change detected
    if (
      title !== selectedItem?.title ||
      description !== selectedItem?.description ||
      date !== selectedItem?.deadline
    ) {
      // Send data to database
      try {
        await axios.put(`http://localhost:3000/update/${id}`, {
          order: selectedItem?.order,
          title: title,
          description: description,
          date_input: `${year}-${month}-${day}`,
          deadline: date,
        });

        // Return results from server
        // Toastify
        toast.success("Task updated", {
          theme: "light",
        });

        // Back to hompage
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      } catch (err) {
        console.error("Update failed:", err);
        toast.error("Failed to update task. Please try again.", {
          theme: "dar;k",
        });
      }
    } else {
      toast.error("No changes detected, no update performed.", {
        theme: "dark",
      });
    }
  };

  return (
    <Card>
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
          <button
            type="submit"
            className="mt-3 px-2 py-3 border w-fit rounded-lg text-white font-bold bg-orange-400 transition-all duration-150 delay-75 hover:bg-orange-600"
          >
            Apply Change
          </button>
        </div>
      </form>

      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

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
