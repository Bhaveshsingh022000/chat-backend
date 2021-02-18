const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const chatRoutes = require("./Routes/chatRoutes");
const cors = require("cors");
const http = require("http");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(chatRoutes);

const MONGODB_URI =
  "mongodb+srv://bhavesh_05:Bhavesh2017@cluster0-yuok1.mongodb.net/chatapplication?retryWrites=true&w=majority";
mongoose
  .connect(MONGODB_URI)
  .then((res) => {
    console.log("Connected");
    const server = http.createServer(app);
    const abc = server.listen(process.env.PORT || 3005);
    const io = require("./socket").init(abc);
    io.on("connection", (socket) => {
      console.log("Client Connected");
      socket.on("sendMessage", (chatData) => {
        console.log(chatData);
        io.emit("chat", {
          message: chatData.message,
        });
      });
    });
  })
  .catch((error) => {
    console.log(error);
  });
