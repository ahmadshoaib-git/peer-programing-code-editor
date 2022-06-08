import { Server } from "socket.io";
import { SOCKET_PORT } from "../utils";
const establishSockets = (server: any) => {
  const ProjectLockedFiles: any = {};
  console.log("Inside Establish Sockets function");
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });
  io.on("connection", (socket: any) => {
    console.log("a user connected >", socket.id);
    socket.on("channel-join", (id: any) => {
      console.log("channel join", id);
    });
    socket.on("file_locked", (msg: any) => {
      console.log(msg);
      if (ProjectLockedFiles[msg.id]) {
        let lockedFiles: any = ProjectLockedFiles[msg.id];
        lockedFiles = [...lockedFiles, msg.name];
      } else {
        ProjectLockedFiles[msg.id] = [msg.name];
      }
      console.log(ProjectLockedFiles);
      io.emit("file_locked", ProjectLockedFiles);
    });
  });
  server.listen(SOCKET_PORT, () => {
    console.log(`Socket Listening on port ${SOCKET_PORT}`);
  });
};

export { establishSockets };
