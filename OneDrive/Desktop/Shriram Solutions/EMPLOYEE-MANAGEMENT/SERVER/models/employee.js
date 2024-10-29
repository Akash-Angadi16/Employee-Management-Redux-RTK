const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  fullName: { type: String, required: true },
  dob: { type: Date, required: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  nationality: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  employeeId: { type: String, required: true },
  department: { type: String, required: true },
  jobTitle: { type: String, required: true },
  dateOfJoining: { type: Date, required: true },
  employmentStatus: {
    type: String,
    enum: ["Full-time", "Part-time", "Contract"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  modifiedAt: {
    type: Date,
    default: Date.now,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

employeeSchema.pre("save", function (next) {
  this.modifiedAt = Date.now();
  next();
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;

// app.post('/api/employees', async (req, res) => {
//   try {
//     const employee = new Employee(req.body);
//     await employee.save();
//     res.status(201).json(employee);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// app.get('/api/employees', async (req, res) => {
//   try {
//     const employees = await Employee.find();
//     res.status(200).json(employees);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// app.get('/api/employees/:id', async (req, res) => {
//   try {
//     const employee = await Employee.findById(req.params.id);
//     if (!employee) throw new Error('Employee not found');
//     res.status(200).json(employee);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// app.put('/api/employees/:id', async (req, res) => {
//   try {
//     const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
//     if (!employee) throw new Error('Employee not found');
//     res.status(200).json(employee);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// app.delete('/api/employees/:id', async (req, res) => {
//   try {
//     const employee = await Employee.findByIdAndDelete(req.params.id);
//     if (!employee) throw new Error('Employee not found');
//     res.status(200).json({ message: 'Employee deleted successfully' });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// app.listen(3000, () => {
//   console.log('Server running on http://localhost:3000');
// });
