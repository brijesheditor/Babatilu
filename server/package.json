const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*"
  }
});

// Frontend folder
const clientPath = path.join(__dirname, "..", "client");

app.use(express.json());
app.use(express.static(clientPath));

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    app: "TELESUPAR",
    server: "online",
    time: new Date().toISOString()
  });
});

// Home page
app.get("/", (req, res) => {
  res.sendFile(path.join(clientPath, "index.html"));
});

// Socket.IO connection
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Send welcome event
  socket.emit("server_message", {
    type: "system",
    message: "TELESUPAR server connected successfully.",
    time: new Date().toISOString()
  });

  // Receive test message
  socket.on("client_message", (data) => {
    console.log("Message received:", data);

    // Send message to everyone
    io.emit("server_message", {
      type: "chat",
      message: data.message || "",
      time: new Date().toISOString(),
      socketId: socket.id
    });
  });

  // Disconnect
  socket.on("disconnect", (reason) => {
    console.log("User disconnected:", socket.id, reason);
  });
});

// Port
const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => {
  console.log("-----------------------------------");
  console.log("TELESUPAR SERVER");
  console.log("-----------------------------------");
  console.log(`Server running on port ${PORT}`);
  console.log(`Local: http://localhost:${PORT}`);
  console.log("-----------------------------------");
});
