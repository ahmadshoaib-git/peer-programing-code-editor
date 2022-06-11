import { Server } from "socket.io";
import { SOCKET_PORT } from "../utils";
const establishSockets = (server: any) => {
  const ProjectLockedFiles: any = {};
  const ProjectContributors: any = {};
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
      // console.log(ProjectLockedFiles[msg.id]);
      if (msg.type === "lock") {
        if (ProjectLockedFiles[msg.id]) {
          let lockedFiles: any = ProjectLockedFiles[msg.id];
          lockedFiles = ProjectLockedFiles[msg.id]?.filter((project: any) => {
            if (project.editorEmail !== msg.editorEmail) return project;
          });
          console.log("filtered >", lockedFiles);
          lockedFiles = [
            ...lockedFiles,
            {
              fileName: msg.name,
              fileId: msg.fileId,
              editorEmail: msg.editorEmail,
              editorName: msg.editorName,
            },
          ];
          ProjectLockedFiles[msg.id] = lockedFiles;
        } else {
          ProjectLockedFiles[msg.id] = [
            {
              fileName: msg.name,
              fileId: msg.fileId,
              editorEmail: msg.editorEmail,
              editorName: msg.editorName,
            },
          ];
        }
      } else {
        if (ProjectLockedFiles[msg.id]) {
          let lockedFiles: any = ProjectLockedFiles[msg.id];
          lockedFiles = ProjectLockedFiles[msg.id]?.filter((project: any) => {
            if (project.editorEmail !== msg.editorEmail) return project;
          });
          console.log("lockedFiles >", lockedFiles);
          ProjectLockedFiles[msg.id] = lockedFiles;
        } else ProjectLockedFiles[msg.id] = [];
      }
      // console.log("file_locked", ProjectLockedFiles);
      io.emit("file_locked", ProjectLockedFiles[msg.id]);
    });
    socket.on("disconnect", function () {
      console.log("Got disconnect!");
    });
  });
  server.listen(SOCKET_PORT, () => {
    console.log(`Socket Listening on port ${SOCKET_PORT}`);
  });
};

export { establishSockets };
