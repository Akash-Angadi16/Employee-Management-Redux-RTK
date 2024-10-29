import "./App.css";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DashBoard from "./pages/DashBoard";
import EmployeeForm from "./pages/employeeCRUD/CreateEmployee";
import EmployeeList from "./pages/employeeCRUD/ListEmployees";

import EmployeeEdit from "./pages/employeeCRUD/UpdateEmployee";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<SignupPage />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/create" element={<EmployeeForm />} />
          <Route path="/list" element={<EmployeeList />} />
          <Route path="/edit/:_id" element={<EmployeeEdit />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
