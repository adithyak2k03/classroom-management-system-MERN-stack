const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectToMongo = require("./db");
const { default: mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
const PORT = 5000;

const JWT_SECRET = process.env.JWT_SECRET;

app.use(cors());
app.use(bodyParser.json());

connectToMongo();

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "student"], default: "student" },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

// ---------------------------
// Note Schema and Model
// ---------------------------
const noteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  tag: { type: String, default: "General" },
  createdDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
});

const Note = mongoose.model("Note", noteSchema);

// ---------------------------
// Task Schema and Model
// ---------------------------
const taskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
  createdDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
});

const Task = mongoose.model("Task", taskSchema);

// ---------------------------
// Authentication Middleware
// ---------------------------
const authenticateUser = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Extract the token
  if (!token) return res.status(401).json({ error: "Access Denied" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid Token" });
  }
};

// ---------------------------
// Profile Routes
// ---------------------------
app.get("/profile", authenticateUser, async (req, res) => {
  try {
    // Fetch user details
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });

    // Count notes and tasks for the user
    const [noteCount, taskCount] = await Promise.all([
      Note.countDocuments({ userId: req.user.id }),
      Task.countDocuments({ userId: req.user.id }),
    ]);

    res.json({
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      noteCount,
      taskCount,
    });
  } catch (error) {
    console.error("Error fetching profile", error);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

// ---------------------------
// Authentication Routes
// ---------------------------

// Signup
app.post("/signup", async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ error: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

// Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ error: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ error: "Invalid email or password" });

    const token = jwt.sign(
      { user: { id: user._id, role: user.role } },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({
      token,
      user: {
        userId: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

// ---------------------------
// Notes Routes
// ---------------------------

// Get all Notes for a User
app.get("/notes", authenticateUser, async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.id });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch notes" });
  }
});

// Add a new Note
app.post("/notes", authenticateUser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    const newNote = new Note({
      userId: req.user.id,
      title,
      description,
      tag,
      createdDate: Date.now(),
      updatedDate: Date.now(),
    });
    await newNote.save();
    res.json(newNote);
  } catch (error) {
    console.error("Error saving note", error);
    res.status(500).json({ error: "Failed to save note" });
  }
});

// Update a Note
app.put("/notes/:id", authenticateUser, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, tag } = req.body;

    const updatedNote = await Note.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      {
        title,
        description,
        tag,
        updatedDate: Date.now(),
      },
      { new: true }
    );
    if (!updatedNote) {
      return res.status(404).json({ error: "Note not found or unauthorized" });
    }
    res.json(updatedNote);
  } catch (error) {
    console.error("Error updating note", error);
    res.status(500).json({ error: "Failed to update note" });
  }
});

// Delete a Note
app.delete("/notes/:id", authenticateUser, async (req, res) => {
  try {
    const { id } = req.params;
    await Note.findOneAndDelete({ _id: id, userId: req.user.id });
    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error deleting note", error);
    res.status(500).json({ error: "Failed to delete note" });
  }
});

// ---------------------------
// Task Routes
// ---------------------------

// Get all Tasks for a User
app.get("/tasks", authenticateUser, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// Add a new Task
app.post("/tasks", authenticateUser, async (req, res) => {
  try {
    const { text } = req.body;
    const newTask = new Task({
      userId: req.user.id,
      text,
      createdDate: Date.now(),
      updatedDate: Date.now(),
    });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error saving task", error);
    res.status(500).json({ error: "Failed to save task" });
  }
});

// Update Task
app.patch("/tasks/:id", authenticateUser, async (req, res) => {
  try {
    const { id } = req.params;
    const { text, completed } = req.body;

    const updateFields = {};
    if (text !== undefined) updateFields.text = text;
    if (completed !== undefined) updateFields.completed = completed;
    updateFields.updatedDate = Date.now();

    const updatedTask = await Task.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { $set: updateFields },
      { new: true }
    );

    res.json(updatedTask);
  } catch (error) {
    console.error("Error updating task", error);
    res.status(500).json({ error: "Failed to update task" });
  }
});

// Delete a Task
app.delete("/tasks/:id", authenticateUser, async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findOneAndDelete({ _id: id, userId: req.user.id });
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task", error);
    res.status(500).json({ error: "Failed to delete task" });
  }
});

// ---------------------------
// Start Server
// ---------------------------
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
