const socket = io();

const connectionStatus =
    document.getElementById("connectionStatus");

const serverStatus =
    document.getElementById("serverStatus");

const socketStatus =
    document.getElementById("socketStatus");

const messages =
    document.getElementById("messages");

const messageForm =
    document.getElementById("messageForm");

const messageInput =
    document.getElementById("messageInput");


function formatTime(dateString) {

    const date = new Date(dateString);

    return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });
}


function addMessage(data) {

    const empty =
        messages.querySelector(".empty");

    if (empty) {
        empty.remove();
    }

    const item =
        document.createElement("div");

    item.className =
        `message ${data.type || "chat"}`;

    item.innerHTML = `
        <div class="message-text">
            ${escapeHtml(data.message || "")}
        </div>

        <div class="message-time">
            ${formatTime(data.time)}
        </div>
    `;

    messages.appendChild(item);

    messages.scrollTop =
        messages.scrollHeight;
}


function escapeHtml(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}


// Socket connected
socket.on("connect", () => {

    connectionStatus.textContent =
        "● Socket connected";

    connectionStatus.className =
        "status online";

    socketStatus.textContent =
        "Connected";

    console.log(
        "Socket connected:",
        socket.id
    );
});


// Socket disconnected
socket.on("disconnect", () => {

    connectionStatus.textContent =
        "● Socket disconnected";

    connectionStatus.className =
        "status offline";

    socketStatus.textContent =
        "Disconnected";
});


// Server message
socket.on("server_message", (data) => {

    addMessage(data);

    if (data.type === "system") {
        serverStatus.textContent =
            "Online";
    }
});


// Send message
messageForm.addEventListener(
    "submit",
    (event) => {

        event.preventDefault();

        const message =
            messageInput.value.trim();

        if (!message) {
            return;
        }

        socket.emit("client_message", {
            message: message
        });

        messageInput.value = "";

        messageInput.focus();
    }
);
