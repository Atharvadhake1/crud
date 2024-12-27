require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;
mongoose
  .connect(uri)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

// Student Schema
const studentSchema = new mongoose.Schema({
  name: String,
  course: String,
  email: String,
  phone: String,
});
const Student = mongoose.model("Student", studentSchema, "data");

// Route: Get all students
app.get("/students", async (req, res) => {
  try {
    const students = await Student.find(); // Fetch all students
    res.json(students); // Send response
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ message: "Error fetching students" });
  }
});

// Route: Get a specific student by ID
app.get("/students/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (error) {
    console.error("Error fetching student:", error);
    res.status(500).json({ message: "Error fetching student" });
  }
});

app.post("/students", async (req, res) => {
  try {
    const { name, course, email, phone } = req.body; // Destructure the data from the request body

    // Create a new student instance
    const newStudent = new Student({
      name,
      course,
      email,
      phone,
    });

    // Save the new student to the database
    await newStudent.save();

    res.status(201).json({
      message: "Student created successfully",
      student: newStudent,
    });
  } catch (error) {
    console.error("Error creating student:", error);
    res.status(500).json({ message: "Error creating student" });
  }
});


// Route: Update a specific student
app.put("/students/:id/edit", async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json({ message: "Student updated successfully", updatedStudent });
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).json({ message: "Error updating student" });
  }
});

// Route: Delete a student
app.delete("/students/:id", async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) {
      return res
        .status(404)
        .json({ message: "Student not found or already deleted" });
    }
    res.json({ message: "Student deleted successfully", deletedStudent });
  } catch (error) {
    console.error("Error deleting student:", error);
    res
      .status(500)
      .json({ message: "Failed to delete student. Please try again later." });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
