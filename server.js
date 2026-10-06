const http = require("http");
const WebSocket = require("ws");

const server = http.createServer((req, res) => {
    res.end("Server is alive!");
});

const wss = new WebSocket.Server({
    server,
    path: "/ws"
});

wss.on("connection", (socket) => {
    socket.on("message", (message) => {
        for (const client of wss.clients) {
            if (client !== socket && client.readyState === WebSocket.OPEN) {
                client.send(message.toString());
            }
        }
    });
});

server.listen(process.env.PORT || 10000, "0.0.0.0");
