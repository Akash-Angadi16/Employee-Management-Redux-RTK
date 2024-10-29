import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import default styles

const TABLE_HEAD = ["Employee", "Role", "Emp-ID", "Department", "Action"];

const SortableTable = () => {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:3000/employee/list");
        if (response.data.code == 0) {
          toast.error(response.data.message, {
            position: "top-center",
            autoClose: 3000,
          });
        }
        setEmployees(response.data);
      } catch (error) {
        toast.error("Error fetching data", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    };
    fetchEmployees();
  }, []);

  // const handleDelete = async (_id) => {
  //   const confirmed = window.confirm(
  //     "Are you sure you want to delete this employee?"
  //   );
  //   if (confirmed && _id) {
  //     try {
  //       const response = await axios.delete(
  //         `http://localhost:3000/employee/delete/${_id}`
  //       );
  //       if (response.data.code === 0) {
  //         toast.error(response.data.message, {
  //           position: "top-center",
  //           autoClose: 2000,
  //         });
  //       } else {
  //         toast.success(response.data.message, {
  //           position: "top-center",
  //           autoClose: 2000,
  //         });

  //         setEmployees(employees.filter((employee) => employee._id !== _id));
  //       }
  //     } catch (error) {
  //       console.error("Delete error:", error);
  //     }
  //   }
  // };
  const handleDelete = async (_id) => {
    confirmAlert({
      title: "Confirm Deletion",
      message: "Are you sure you want to delete this employee?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              const response = await axios.delete(
                `http://localhost:3000/employee/delete/${_id}`
              );
              if (response.data.code === 0) {
                toast.error(response.data.message, {
                  position: "top-center",
                  autoClose: 2000,
                });
              } else {
                toast.success(response.data.message, {
                  position: "top-center",
                  autoClose: 2000,
                });
                setEmployees(
                  employees.filter((employee) => employee._id !== _id)
                );
              }
            } catch (error) {
              console.error("Delete error:", error);
            }
          },
        },
        {
          label: "No",
          onClick: () => {}, // Do nothing if the user cancels
        },
      ],
    });
  };

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h3" color="blue-gray">
              Employees list
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all employees
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button
              className="flex items-center gap-3"
              size="sm"
              onClick={() => navigate("/create")}
            >
              <UserPlusIcon strokeWidth={2} className="h-6 w-6" /> Add Employee
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={head}
                  className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                >
                  <Typography
                    variant="h5"
                    color="black"
                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                  >
                    {head}{" "}
                    {index !== TABLE_HEAD.length - 1 && (
                      <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                    )}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {employees.map(
              (
                { _id, fullName, email, jobTitle, employeeId, department },
                index
              ) => {
                const isLast = index === employees.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={_id}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        {/* <Avatar src={img} alt={name} size="sm" /> */}
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {fullName}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {email}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {jobTitle}
                        </Typography>
                        {/* <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {org}
                        </Typography> */}
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={employeeId}
                          color={"green"}
                        />
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {department}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <div>
                        <Tooltip content="Edit User">
                          <IconButton
                            variant="text"
                            onClick={() => navigate(`/edit/${_id}`)}
                          >
                            <PencilIcon className="h-4 w-4 " />
                          </IconButton>
                        </Tooltip>

                        <Tooltip content="Delete User">
                          <IconButton
                            variant="text"
                            onClick={() => {
                              handleDelete(_id);
                            }}
                          >
                            <TrashIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
};

export default SortableTable;
