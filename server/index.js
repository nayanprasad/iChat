const http = require("http");
const express = require("express");
const core = require("cors");
const socketIO = require("socket.io");

const port = 5000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(core());
app.get("/ichat", (req, res) => {
	res.send("iChat");
})

const users = [{}]

io.on("connection", (socket) => {
	console.log("new connection...");

	//  console.log(socket); // socker reffers to users
	
	socket.on("joined", (data) => {
		users[socket.id] = data.user;
		// console.log(`${data.user} has joined`);
		socket.broadcast.emit("userJoined", {user : "Admin", message : `${users[socket.id]} has joined`, joindedUser : `${users[socket.id]}`})
		socket.emit("welcome", {user : "Admin", message : `welcome to chat ${users[socket.id]}`, joindedUser : `${users[socket.id]}`});
	});

	socket.on("disconnect", () => {
		socket.broadcast.emit("leave", {user : "Admin", message : ` ${users[socket.id]} has left`, joindedUser : `${users[socket.id]}`})
		// console.log(`user left`);
	})

	socket.on("message", (data) => {
		// console.log(`${users[data.id]} : ${data.message} `);
		io.emit("sendMessage", {user : users[data.id], message : data.message, id : data.id});
		// io emite will send to all connected users, socket emite will send current users, socket broadcast emite will send to all users except current users
	})
});


server.listen(port, () => {
	console.log(`server started... http://localhost:${port}`)
})
