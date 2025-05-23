const mongoose = require("mongoose");

const mongoURI =
  process.env.MONGO_URI || "mongodb://localhost:27017/classroomDB";

const connectMongo = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully to classroomDB");
  } catch (error) {
    console.error("MongoDB connection Error: ", error);
  }
};

module.exports = connectMongo;
