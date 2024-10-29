import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { login } from "../redux/AuthSlice";

export function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    const newError = {};

    // Validations
    if (!email) {
      newError.email = "Please enter your email!";
      toast.error(newError.email, {
        position: "top-right",
        autoClose: 3000,
      });
    }
    if (!password) {
      newError.password = "Please enter your password";
      toast.error(newError.password, {
        position: "top-right",
        autoClose: 3000,
      });
    }

    if (Object.keys(newError).length === 0) {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/login",
          formData
        );
        if (response.data.code == 0) {
          toast.error(response.data.message, {
            position: "top-center",
            autoClose: 3000,
          });
        }
        dispatch(
          login({ user: response.data.user, token: response.data.token })
        );

        // localStorage.setItem("token", response.data.token);

        if (response.data.code === 1) {
          toast.success(response.data.message, {
            position: "top-center",
            autoClose: 1000,
          });
          setTimeout(() => {
            navigate("/dashboard");
          }, 1000);
        }
      } catch (error) {
        toast.error(
          "Login failed. Please try again.",

          {
            position: "top-center",
            autoClose: 3000,
          }
        );
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-green-200 to-blue-400">
      <Card color="white" shadow={true} className="p-8 w-96">
        <Typography variant="h3" color="blue-gray" className="text-center mb-4">
          Log In
        </Typography>
        <Typography color="gray" className="text-center mb-8 font-normal">
          Welcome Back! Enter your details to log in.
        </Typography>
        <form className="mb-2" onSubmit={handleSubmit}>
          <div className="mb-4">
            <Typography variant="h6" color="blue-gray" className="mb-1">
              Your Email
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              onChange={handleChange}
              value={formData.email}
              name="email"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            />
          </div>
          <div className="mb-4">
            <Typography variant="h6" color="blue-gray" className="mb-1">
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              onChange={handleChange}
              value={formData.password}
              name="password"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            />
          </div>
          <Button className="mt-4" fullWidth type="submit">
            Log In
          </Button>
          <Typography color="gray" className="mt-2 text-center font-normal">
            Don't have an account?{" "}
            <Link to="/" className="font-medium text-blue-500">
              Register Here
            </Link>
          </Typography>
        </form>
      </Card>
      <ToastContainer />
    </div>
  );
}
