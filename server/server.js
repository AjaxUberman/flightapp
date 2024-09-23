const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());

// MongoDB
const connect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://bariskayikci1:hyzWArqYeHbDDhHs@flighttestcase.8hftw.mongodb.net/?retryWrites=true&w=majority&appName=flightTestCase"
    );
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

app.get("/test", (req, res) => {
  res.json("Server Working.");
});

const flightRoutes = require("./routes/mainRoutes");
app.use("/", flightRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  connect();
  console.log(`Server working at : ${PORT}`);
});
