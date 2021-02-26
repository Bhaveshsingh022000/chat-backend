const express = require("express");
const bodyParser = require("body-parser");
const chatRoutes = require("./Routes/chatRoutes");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(chatRoutes);

const server = app.listen(process.env.PORT || 3005);
const io = require("./socket").init(server);
io.on("connection", (socket) => {
  socket.on("sendMessage", (chatData) => {
    io.emit("chat", {
      message: chatData.message,
    });
  });
});
