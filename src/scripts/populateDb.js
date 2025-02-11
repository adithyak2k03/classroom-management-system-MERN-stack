const BASE_URL = "http://localhost:5000";

const TASKS_API_URL = `${BASE_URL}/tasks`;
const NOTES_API_URL = `${BASE_URL}/notes`;

const token = "";
const userId = "";

// const sampleNotes = [
//     { title: "Math Homework", description: "Complete exercises 5.1 to 5.4 from the textbook.", tag: "Homework" },
//     { title: "Science Project", description: "Research on renewable energy sources and prepare slides.", tag: "Project" },
//     { title: "History Notes", description: "Summarize the chapter on World War II.", tag: "Notes" },
//     { title: "Classroom Meeting", description: "Prepare questions for the upcoming Q&A session.", tag: "Meeting" },
//     { title: "Literature Essay", description: "Write an essay on 'The Role of Symbolism in Modern Poetry'.", tag: "Assignment" },
//     { title: "Physics Practical", description: "Record observations for the lens experiment.", tag: "Practical" },
// ];

// const sampleTasks = [
//     "Review the math assignment.",
//     "Organize science project materials.",
//     "Revise history notes for the quiz.",
//     "Prepare for the classroom meeting.",
//     "Draft the literature essay.",
//     "Submit the physics lab report.",
// ];

const sampleNotes = [
  {
    title: "Frontend Development",
    description: "Complete the React component for the new user dashboard.",
    tag: "Development",
  },
  {
    title: "Backend API Integration",
    description:
      "Implement API routes for user authentication and authorization.",
    tag: "Development",
  },
  {
    title: "ML Model Training",
    description: "Fine-tune the neural network for image classification task.",
    tag: "AI/ML",
  },
  {
    title: "Code Review",
    description: "Review the PR for the new feature in the MERN stack app.",
    tag: "Development",
  },
  {
    title: "Deployment Pipeline",
    description:
      "Set up continuous integration for automated testing and deployment.",
    tag: "DevOps",
  },
  {
    title: "AI/ML Research",
    description: "Read recent research papers on GANs and their applications.",
    tag: "Research",
  },
];

const sampleTasks = [
  "Finish implementing the new React feature for the admin panel.",
  "Write unit tests for the backend routes.",
  "Tune hyperparameters for the machine learning model.",
  "Prepare for the team meeting on the new AI feature.",
  "Review code for the latest pull request from the frontend team.",
  "Debug the issue in the deployment pipeline on the staging environment.",
];

const addNoteApi = async (note) => {
  const payload = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(note),
  };

  try {
    const response = await fetch(NOTES_API_URL, payload);
    if (response.ok) {
      console.log("Note added:", await response.json());
    } else {
      console.error("Failed to add note:", response.statusText);
    }
  } catch (error) {
    console.error("Error adding note:", error);
  }
};

const addTaskApi = async (task) => {
  const payload = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId, text: task }),
  };

  try {
    const response = await fetch(TASKS_API_URL, payload);
    if (response.ok) {
      console.log("Task added:", await response.json());
    } else {
      console.error("Failed to add task:", response.statusText);
    }
  } catch (error) {
    console.error("Error adding task:", error);
  }
};

const populateData = async () => {
  if (!token || !userId) {
    console.error(
      "Token or User ID not provided. Please add them to the script.",
    );
    return;
  }

  console.log("Adding sample notes...");
  for (const note of sampleNotes) {
    await addNoteApi({ ...note, userId });
  }

  console.log("Adding sample tasks...");
  for (const task of sampleTasks) {
    await addTaskApi(task);
  }

  console.log("Database population complete!");
};

populateData();
// get to this directory in cmd prompt, update the userId and token (which can aquired from inspect element > application tab > localstorage)
// node populateDb
