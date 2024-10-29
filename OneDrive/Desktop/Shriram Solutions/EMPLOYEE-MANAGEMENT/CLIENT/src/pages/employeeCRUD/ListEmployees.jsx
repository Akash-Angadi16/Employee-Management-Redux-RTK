import React from "react";
import Sidebar from "../SideBar";
import SortableTable from "./list";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function EmployeeList() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
      } else {
        setLoading(false);
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
      <div className="flex-grow p-2">
        <div className="bg-white bg-opacity-80 rounded-lg shadow-2xl p-5 mb-10 ">
          <SortableTable />
        </div>
      </div>
    </div>
  );
}

export default EmployeeList;
