const io = require("../socket");

const ChatModel = require("../Model/chatModel");

exports.getHomePage = (request, response, next) => {
  response.status(200).json({
    success: true,
    successMessage: "Working",
  });
};

exports.postMessage = (request, response, next) => {
  const chat = new ChatModel({
    message: request.body.message,
  });
  chat.save().then(() => {
    io.getIo().emit("chat", { message: request.body.message });
    response.status(200).json({
      success: true,
    });
  });
};
