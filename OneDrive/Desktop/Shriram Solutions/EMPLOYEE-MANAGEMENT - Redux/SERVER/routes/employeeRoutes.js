const express = require("express");
const router = express.Router();
const Employee = require("../models/employee");

// Create a new employee
router.post("/create", async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.json({ message: "New employee created successfully" });
  } catch (error) {
    res.json({ code: 0, message: "Please try again" });
  }
});

// Get all employees
router.get("/list", async (req, res) => {
  try {
    const employees = await Employee.find({ active: true });
    res.json(employees);
  } catch (error) {
    res.json({ code: 0, message: "Please try again" });
  }
});

// Get an employee by ID
router.get("/edit/:_id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params._id);
    if (!employee) {
      return res.json({ code: 0, message: "Employee not found" });
    }
    res.json(employee);
  } catch (error) {
    res.json({ code: 0, message: "Error, Please try again later" });
  }
});

// Update employee by ID
router.put("/edit/:_id", async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params._id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedEmployee) {
      return res.json({ code: 0, message: "Employee not found" });
    }
    res.json({ message: "Employee updated successfully", updatedEmployee });
  } catch (error) {
    res.json({ code: 0, message: "Error, Please try again later" });
  }
});

// Delete employee by ID
router.delete("/delete/:_id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params._id);
    if (!employee) {
      return res.json({ code: 0, message: "Employee not found" });
    }

    employee.active = false; // Set active flag to false
    await employee.save(); // Save the updated employee

    // await Employee.findByIdAndDelete(req.params._id); // Proceed with deletion
    res.json({ message: "Employee has been deleted" });
  } catch (error) {
    res.json({ code: 0, message: "Please try again later" });
  }
});

module.exports = router;
