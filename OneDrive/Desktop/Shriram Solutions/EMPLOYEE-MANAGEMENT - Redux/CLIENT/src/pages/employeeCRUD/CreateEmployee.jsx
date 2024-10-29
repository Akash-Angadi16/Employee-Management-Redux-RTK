import React, { useState, useEffect } from "react";
import { Card, Typography, Input, Button } from "@material-tailwind/react";
import Sidebar from "../SideBar";
import schema from "../../../utils/Schema";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    gender: "",
    nationality: "",
    address: "",
    phone: "",
    email: "",
    employeeId: "",
    department: "",
    jobTitle: "",
    dateOfJoining: "",
    employmentStatus: "",
  });

  const [errors, setErrors] = useState({});

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = schema.validate(formData, { abortEarly: false });
    if (error) {
      const newErrors = {};
      error.details.forEach((err) => {
        newErrors[err.path[0]] = err.message;
      });
      setErrors(newErrors);
      return;
    }

    // If valid, proceed with submission logic
    try {
      const response = await axios.post(
        "http://localhost:3000/employee/create",
        formData
      );
      if (response.data.code == 0) {
        toast.error(response.data.message, {
          position: "top-center",
          autoClose: 2000,
        });
      }
      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 2000,
      });
      console.log("Form submitted", response.data.message, response.data);
      setFormData({
        fullName: "",
        dob: "",
        gender: "",
        nationality: "",
        address: "",
        phone: "",
        email: "",
        employeeId: "",
        department: "",
        jobTitle: "",
        dateOfJoining: "",
        employmentStatus: "",
      });
      setErrors({});
    } catch (error) {
      toast.error("server error, Please try later", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="min-h-screen flex overflow-hidden bg-gray-100">
      <Sidebar className="h-full" />

      <div className="flex-1 flex items-stretch p-8">
        <Card className="flex-1 m-0 p-8 bg-white rounded-xl shadow-lg">
          <Typography
            variant="h3"
            className="text-center mb-6 font-bold text-blue-600"
          >
            Employee Master Data
          </Typography>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Typography className="mb-1" variant="h6" color="blue-gray">
                  Full Name
                </Typography>
                <Input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="block w-full border rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500"
                />
                {errors.fullName && (
                  <div className="text-red-500">{errors.fullName}</div>
                )}
              </div>
              <div>
                <Typography className="mb-1" variant="h6" color="blue-gray">
                  Date of Birth
                </Typography>
                <Input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="block w-full border rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500"
                />
                {errors.dob && <div className="text-red-500">{errors.dob}</div>}
              </div>
              <div>
                <Typography className="mb-1" variant="h6" color="blue-gray">
                  Gender
                </Typography>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="block w-full border rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && (
                  <div className="text-red-500">{errors.gender}</div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Typography className="mb-1" variant="h6" color="blue-gray">
                  Nationality
                </Typography>
                <Input
                  type="text"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                  className="block w-full border rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500"
                />
                {errors.nationality && (
                  <div className="text-red-500">{errors.nationality}</div>
                )}
              </div>
              <div>
                <Typography className="mb-1" variant="h6" color="blue-gray">
                  Address
                </Typography>
                <Input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="block w-full border rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500"
                />
                {errors.address && (
                  <div className="text-red-500">{errors.address}</div>
                )}
              </div>
              <div>
                <Typography className="mb-1" variant="h6" color="blue-gray">
                  Phone Number
                </Typography>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="block w-full border rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500"
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Allow only numbers
                  }}
                />
                {errors.phone && (
                  <div className="text-red-500">{errors.phone}</div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Typography className="mb-1" variant="h6" color="blue-gray">
                  Email Address
                </Typography>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full border rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500"
                />
                {errors.email && (
                  <div className="text-red-500">{errors.email}</div>
                )}
              </div>
              <div>
                <Typography className="mb-1" variant="h6" color="blue-gray">
                  Employee ID
                </Typography>
                <Input
                  type="text"
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleChange}
                  className="block w-full border rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500"
                />
                {errors.employeeId && (
                  <div className="text-red-500">{errors.employeeId}</div>
                )}
              </div>
              <div>
                <Typography className="mb-1" variant="h6" color="blue-gray">
                  Department
                </Typography>
                <Input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="block w-full border rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500"
                />
                {errors.department && (
                  <div className="text-red-500">{errors.department}</div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Typography className="mb-1" variant="h6" color="blue-gray">
                  Job Title
                </Typography>
                <Input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  className="block w-full border rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500"
                />
                {errors.jobTitle && (
                  <div className="text-red-500">{errors.jobTitle}</div>
                )}
              </div>
              <div>
                <Typography className="mb-1" variant="h6" color="blue-gray">
                  Date of Joining
                </Typography>
                <Input
                  type="date"
                  name="dateOfJoining"
                  value={formData.dateOfJoining}
                  onChange={handleChange}
                  className="block w-full border rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500"
                />
                {errors.dateOfJoining && (
                  <div className="text-red-500">{errors.dateOfJoining}</div>
                )}
              </div>
              <div>
                <Typography className="mb-1" variant="h6" color="blue-gray">
                  Employment Status
                </Typography>
                <select
                  name="employmentStatus"
                  value={formData.employmentStatus}
                  onChange={handleChange}
                  className="block w-full border rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Employment Status</option>

                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                </select>
                {errors.employmentStatus && (
                  <div className="text-red-500">{errors.employmentStatus}</div>
                )}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md shadow hover:bg-blue-700 transition duration-300 "
            >
              Submit
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default EmployeeForm;
