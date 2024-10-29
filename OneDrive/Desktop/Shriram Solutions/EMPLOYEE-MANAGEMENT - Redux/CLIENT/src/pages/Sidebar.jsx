import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import default styles
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/AuthSlice";

function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [isEmployeeMasterOpen, setIsEmployeeMasterOpen] = useState(false);

  const handleLogout = () => {
    confirmAlert({
      title: "Confirm Logout",
      message: "Are you sure you want to log out?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            dispatch(logout());
            toast.info("Logged out successfully!", {
              position: "top-center",
              autoClose: 1000,
            });
            setTimeout(() => {
              navigate("/login");
            }, 1000);
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  const toggleEmployeeMaster = () => {
    setIsEmployeeMasterOpen(!isEmployeeMasterOpen);
  };

  return (
    <div className="min-h-screen flex">
      <Card className="h-full w-64 p-6 bg-white shadow-lg rounded-lg">
        <div className="mb-4">
          <Typography variant="h3" className="font-bold text-blue-500">
            Hey {user ? user.name : "Guest"}!
          </Typography>
        </div>
        <List>
          <ListItem
            className="cursor-pointer hover:bg-blue-50 rounded-md transition duration-150"
            onClick={() => navigate("/dashboard")}
          >
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-5 w-5 text-blue-600" />
            </ListItemPrefix>
            Dashboard
          </ListItem>
          <ListItem
            onClick={toggleEmployeeMaster}
            className="cursor-pointer hover:bg-blue-50 rounded-md transition duration-150"
          >
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5 text-blue-600" />
            </ListItemPrefix>
            Employee Masters
          </ListItem>
          {isEmployeeMasterOpen && (
            <>
              <ListItem
                className="pl-10 cursor-pointer hover:bg-blue-50 rounded-md transition duration-150"
                onClick={() => navigate("/create")}
              >
                Create
              </ListItem>
              <ListItem
                className="pl-10 cursor-pointer hover:bg-blue-50 rounded-md transition duration-150"
                onClick={() => navigate("/list")}
              >
                List
              </ListItem>
            </>
          )}

          <ListItem className="cursor-pointer hover:bg-blue-50 rounded-md transition duration-150">
            <ListItemPrefix>
              <InboxIcon className="h-5 w-5 text-blue-600" />
            </ListItemPrefix>
            Inbox
            <ListItemSuffix>
              <Chip
                value="14"
                size="sm"
                variant="ghost"
                color="blue-gray"
                className="rounded-full"
              />
            </ListItemSuffix>
          </ListItem>
          <ListItem className="cursor-pointer hover:bg-blue-50 rounded-md transition duration-150">
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5 text-blue-600" />
            </ListItemPrefix>
            Profile
          </ListItem>
          <ListItem className="cursor-pointer hover:bg-blue-50 rounded-md transition duration-150">
            <ListItemPrefix>
              <Cog6ToothIcon className="h-5 w-5 text-blue-600" />
            </ListItemPrefix>
            Settings
          </ListItem>
          <ListItem
            onClick={handleLogout}
            className="cursor-pointer hover:bg-red-100 rounded-md transition duration-150"
          >
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5 text-red-600" />
            </ListItemPrefix>
            Log Out
          </ListItem>
        </List>
        <ToastContainer />
      </Card>
    </div>
  );
}

export default Sidebar;
