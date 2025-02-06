const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectToMongo = require("./db");
const { default: mongoose } = require("mongoose");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

connectToMongo();

// Note Schema and Model
const noteSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    tag: { type: String, default: "General" },
    date: { type: String, default: new Date().toLocaleString() },
});

const Note = mongoose.model("Note", noteSchema);

// Task Schema and Model
const taskSchema = new mongoose.Schema({
    text: { type: String, required: true },
    completed: { type: Boolean, default: false },
});

const Task = mongoose.model("Task", taskSchema);

// ---------------------------
// Notes Routes
// ---------------------------

// Get all Notes
app.get("/notes", async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch notes" });
    }
});

// Add a new Note
app.post("/notes", async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const newNote = new Note({
            title,
            description,
            tag,
            date: new Date().toLocaleString(),
        });
        await newNote.save();
        res.json(newNote);
    } catch (error) {
        console.error("Error saving note", error);
        res.status(500).json({ error: "Failed to save note" });
    }
});

// Update a Note
app.put("/notes/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, tag } = req.body;
        const updatedNote = await Note.findByIdAndUpdate(
            id,
            { title, description, tag },
            { new: true }
        );
        res.json(updatedNote);
    } catch (error) {
        console.error("Error updating note", error);
        res.status(500).json({ error: "Failed to update note" });
    }
});

// Delete a Note
app.delete("/notes/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await Note.findByIdAndDelete(id);
        res.json({ message: "Note deleted successfully" });
    } catch (error) {
        console.error("Error deleting note", error);
        res.status(500).json({ error: "Failed to delete note" });
    }
});

// ---------------------------
// Task Routes
// ---------------------------

// Add a new Task
app.post("/tasks", async (req, res) => {
    try {
        const { text } = req.body;
        const newTask = new Task({ text, completed: false });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        console.error("Error saving task", error);
        res.status(500).json({ error: "Failed to save task" });
    }
});

// View all Tasks
app.get("/tasks", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch tasks" });
    }
});

// Update Task (completed or text)
app.patch("/tasks/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { text, completed } = req.body;

        const updateFields = {};
        if (text !== undefined) updateFields.text = text;
        if (completed !== undefined) updateFields.completed = completed;

        const updatedTask = await Task.findByIdAndUpdate(id, { $set: updateFields }, { new: true });
        if (!updatedTask) {
            return res.status(404).json({ error: "Task not found" });
        }

        res.json(updatedTask);
    } catch (error) {
        console.error("Error updating task", error);
        res.status(500).json({ error: "Failed to update task" });
    }
});

// Delete a Task
app.delete("/tasks/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTask = await Task.findByIdAndDelete(id);

        if (!deletedTask) {
            return res.status(404).json({ error: "Task not found" });
        }

        res.json({ message: "Task deleted successfully", task: deletedTask });
    } catch (error) {
        console.error("Error deleting task", error);
        res.status(500).json({ error: "Failed to delete task" });
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));