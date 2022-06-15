import { Server } from "socket.io";
import { ACTION_TYPE, SOCKET_SERVER_URL, SOCKET_PORT } from "./config";
const establishSockets = (server: any) => {
  const ProjectLockedFiles: any = {};
  const ProjectContributors: any = {};
  const ProjectSockets: any = {};
  const io = new Server(server, {
    cors: {
      origin: SOCKET_SERVER_URL,
      methods: ["GET", "POST"],
    },
  });
  io.on(ACTION_TYPE.CONNECTION, (socket: any) => {
    console.log("a user connected >", socket.id);
    socket.on(ACTION_TYPE.CHANNEL_JOIN, (id: any) => {
      console.log("channel join", id);
    });
    socket.on(ACTION_TYPE.JOIN, (msg: any) => {
      try {
        const { contributorName, contributorEmail, projectId } = msg;
        if (ProjectContributors[projectId])
          ProjectContributors[projectId] = [
            ...ProjectContributors[projectId],
            {
              contributorName: contributorName,
              contributorEmail: contributorEmail,
              socketId: socket.id,
            },
          ];
        else
          ProjectContributors[projectId] = [
            {
              contributorName: contributorName,
              contributorEmail: contributorEmail,
              socketId: socket.id,
            },
          ];
        io.emit(ACTION_TYPE.JOIN, ProjectContributors[projectId]);
        if (ProjectLockedFiles[projectId])
          io.emit(ACTION_TYPE.FILE_LOCKED, ProjectLockedFiles[projectId]);

        // ProjectSockets[projectId]
      } catch (err) {
        console.log(err);
      }
    });
    socket.on(ACTION_TYPE.FILE_LOCKED, (msg: any) => {
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
      io.emit(ACTION_TYPE.FILE_LOCKED, ProjectLockedFiles[msg.id]);
    });
    socket.on(ACTION_TYPE.DISCONNECT, function () {
      console.log("===== >>> Got disconnect!", socket.id);
      io.emit(ACTION_TYPE.USER_DISCONNECT, socket.id);
    });
  });
  server.listen(SOCKET_PORT, () => {
    console.log(`Socket Listening on port ${SOCKET_PORT}`);
  });
};

export { establishSockets };
