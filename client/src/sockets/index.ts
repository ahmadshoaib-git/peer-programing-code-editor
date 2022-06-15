import io from "socket.io-client";
import { SOCKET_SERVER_URL, ACTION_TYPE } from "./config";
class CustomSocket {
  private static _instance: any;
  private socket: any;
  private data: any;
  constructor() {
    if (CustomSocket._instance) {
      return CustomSocket._instance;
    }
    CustomSocket._instance = this;
    this.socket = io(SOCKET_SERVER_URL);
    this.data = "abc";
  }
  getSocket() {
    console.log("SOCKET >", this.socket, " -- ", this.data);
  }
  onConnect(...args: any) {
    const projectId = args[0];
    const callBack = args[1];
    this.socket.on(ACTION_TYPE.CONNECT, () => {
      this.socket.emit("room", projectId);
      callBack();
    });
  }
  onConnection(...args: any) {
    const callBack = args[0];
    this.socket.on(ACTION_TYPE.CONNECTION, () => {
      callBack();
    });
  }
  onJoin(...args: any) {
    const callBack = args[0];
    this.socket.on(ACTION_TYPE.JOIN, (msg: any) => {
      callBack(msg);
    });
  }
  onUserDisconnect(...args: any) {
    const callBack = args[0];
    this.socket.on(ACTION_TYPE.USER_DISCONNECT, (msg: any) => {
      callBack(msg);
    });
  }
  onFileLocked(...args: any) {
    const callBack = args[0];
    this.socket.on(ACTION_TYPE.FILE_LOCKED, (msg: any) => {
      callBack(msg);
    });
  }
  emitJoin(...args: any) {
    const data = args[0];
    this.socket.emit(ACTION_TYPE.JOIN, data);
  }
  emitFileLocked(...args: any) {
    const data = args[0];
    this.socket.emit(ACTION_TYPE.FILE_LOCKED, data);
  }
  onSocketClose() {
    this.socket.close();
  }
}

export default CustomSocket;
