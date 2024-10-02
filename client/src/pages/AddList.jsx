import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddList = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [list, setList] = useState([]);
  const [order, setOrder] = useState([0]);

  const day = String(new Date().getDate()).padStart(2, "0");
  const month = String(new Date().getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const year = new Date().getFullYear();

  // Fetch items list
  const fetchList = async () => {
    try {
      const response = await axios.get("http://localhost:3000");
      setList(response.data);
    } catch (error) {
      console.error("Error fetching list:", error);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  useEffect(() => {
    if (list.length > 0) {
      const orders = list.map((e) => e.order); // Get all the order values
      setOrder(orders); // Set them at once
    }
  }, [list]); // Run this effect whenever the 'list' changes

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      axios.post("http://localhost:3000/add", {
        order: Math.max(...order) + 1,
        title: title,
        description: description,
        date_input: `${year}-${month}-${day}`,
        deadline: date,
      });

      // Return results from server
      // Toastify
      toast.success("Task had been added successfully", {
        theme: "light",
      });

      // Back to hompage
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Failed to added task. Please try again.", {
        theme: "dark",
      });
    }
  };

  return (
    <Card>
      <form
        className="flex flex-col bg-white shadow-xl rounded-lg w-full px-8 py-2"
        onSubmit={handleSubmit}
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
            className="border border-gray-300 rounded-lg focus:outline-none px-3 py-2"
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="mt-3 px-2 py-3 border w-fit rounded-lg text-white font-bold bg-orange-400 transition-all duration-150 delay-75 hover:bg-orange-600"
          >
            Add Task
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

export default AddList;
