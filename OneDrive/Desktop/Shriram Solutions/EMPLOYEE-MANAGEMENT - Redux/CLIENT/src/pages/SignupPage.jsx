import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState({});
  const [checked, setChecked] = useState(true);
  // let [userEmail, setUserEmail] = useState("");
  const [showVerifyButton, setShowVerifyButton] = useState(false);

  const navigate = useNavigate();
  // Event function for input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrorMessage((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleCheckbox = (e) => {
    setChecked(e.target.checked);
  };

  // Event function on form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const { name, email, password, confirmPassword } = formData;
    const newError = {};

    if (!name) {
      newError.name = "Please enter your name";
    } else if (!/^[A-Za-z\s]+$/.test(name)) {
      newError.name = "Name can only contain letters.";
    }

    if (!email) {
      newError.email = "Please enter your email";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newError.email = "Invalid email format.";
    }

    if (!password) {
      newError.password = "Please enter your password";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      newError.password =
        "Password must contain at least one special character.";
    }

    if (!confirmPassword) {
      newError.confirmPassword = "Please re-enter your password again";
    } else if (password !== confirmPassword) {
      newError.confirmPassword = "Passwords do not match";
    }

    setErrorMessage(newError);

    console.log(Object.keys(newError).length);
    if (Object.keys(newError).length == 0) {
      try {
        let response = await axios.post("http://localhost:3000/api/users", {
          ...formData,
          creator: "Admin",
        });
        console.log(response.data);
        if (response.data.code == 0) {
          toast.error(response.data.message, {
            position: "top-center",
            autoClose: 3000,
          });
          setFormData((prevData) => ({ ...prevData, email: "" }));
        } else {
          toast.success("Successfully Registered!", {
            position: "top-center",
            autoClose: 2000,
          });
          setShowVerifyButton(true);
          setFormData((prevData) => ({
            ...prevData,
            name: "",
            password: "",
            confirmPassword: "",
          }));
        }
      } catch (error) {
        toast.error("Error Saving Data", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    }
  };
  const handleVerificationEmail = async () => {
    try {
      let response = await axios.post(
        "http://localhost:3000/api/verify-email",
        { email: formData.email }
      );
      console.log(response.data);
      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 2000,
      });
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      toast.error("Error sending verification email", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-300 to-blue-500">
      <Card color="white" shadow={true} className="p-8 w-100 max-h-100">
        <Typography variant="h3" color="blue-gray" className="text-center mb-2">
          Sign Up
        </Typography>
        <Typography color="gray" className="text-center mb-1 font-normal">
          Nice to meet you! Enter your details to register.
        </Typography>
        <form className="mb-1" onSubmit={handleSubmit}>
          <div>
            <Typography variant="h6" color="blue-gray" className="mb-1">
              Your Name
            </Typography>
            <Input
              size="lg"
              placeholder="Enter your name"
              onChange={handleChange}
              value={formData.name}
              name="name"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            />
          </div>
          {errorMessage.name && (
            <Typography color="red" className="mb-1">
              {errorMessage.name}
            </Typography>
          )}

          <div>
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
          {errorMessage.email && (
            <Typography color="red" className="mb-1">
              {errorMessage.email}
            </Typography>
          )}

          <div>
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
          {errorMessage.password && (
            <Typography color="red" className="mb-1">
              {errorMessage.password}
            </Typography>
          )}
          <div>
            <Typography variant="h6" color="blue-gray" className="mb-1">
              Re-enter Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              onChange={handleChange}
              value={formData.confirmPassword}
              name="confirmPassword"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            />
          </div>
          {errorMessage.confirmPassword && (
            <Typography color="red" className="mb-1">
              {errorMessage.confirmPassword}
            </Typography>
          )}
          <Checkbox
            onChange={handleCheckbox}
            checked={checked}
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center font-normal"
              >
                I agree the
                <a
                  href="#"
                  className="font-medium transition-colors hover:text-gray-900"
                >
                  &nbsp;Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          <Button className="mt-6" fullWidth type="submit" disabled={!checked}>
            Sign Up
          </Button>

          <Typography color="gray" className="mt-2 text-center font-normal">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-blue-500">
              Log In
            </Link>
          </Typography>
          {showVerifyButton && (
            <Button
              className="mt-3"
              fullWidth
              onClick={handleVerificationEmail}
            >
              Verify Email
            </Button>
          )}
        </form>
        <ToastContainer />
      </Card>
    </div>
  );
}
