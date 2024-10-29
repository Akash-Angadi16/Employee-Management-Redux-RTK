import React, { useEffect, useState } from "react";
import Sidebar from "./SideBar"; // Ensure you import your Sidebar component
import LineChart from "../components/LineChart";
import BarChart from "../components/BarChart";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please Login", {
          position: "top-center",
          autoClose: 1800,
        });
        setTimeout(() => {
          navigate("/login");
        }, 2000); // Delay navigation to allow the toast to show
        return;
      }

      try {
        await axios.post(
          "http://localhost:3000/api/verify-token",
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setLoading(false);
      } catch (error) {
        localStorage.removeItem("token");
        toast.error("Session expired. Please login again.", {
          position: "top-center",
          autoClose: 200,
        });

        navigate("/login");
      }
    };

    verifyToken();
  }, []);

  if (loading) {
    return (
      <div>
        <ToastContainer />
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow p-2 bg-gradient-to-bl from-gray-700 via-gray-800 to-gray-900">
        <div className="bg-white bg-opacity-80 rounded-lg shadow-2xl p-5 mb-10 transform hover:scale-105 transition-transform duration-100">
          <h1 className="text-4xl font-bold text-indigo-700">
            Hi {user ? user.name : "guest"}, Welcome to your Dashboard!
          </h1>
        </div>
        <div className="flex flex-wrap justify-around">
          <LineChart />
          <BarChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
