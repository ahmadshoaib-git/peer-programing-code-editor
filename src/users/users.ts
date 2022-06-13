import * as fs from "fs";

const USERSFILE: string = "data.json";

interface UserDetailInterface {
  email: string;
  name: string;
}

interface RoomInterface {
  roomId: string;
  name: string;
  password: string;
  activeUsers: Array<UserDetailInterface>;
  invitedUsers: Array<UserDetailInterface>;
}

interface UserInterface {
  owner: UserDetailInterface;
  rooms: Array<RoomInterface>;
}

const getDataFromFile = (fileName: string): any => {
  return fs.readFile(fileName, (err, data: any) => {
    if (err) throw err;
    let parsedData = JSON.parse(data);
    console.log(parsedData);
    return parsedData.users;
  });
};

const updateDataFromFile = (
  fileName: string,
  usersData: Array<UserInterface>
) => {
  let data = JSON.stringify({
    users: usersData,
  });
  fs.writeFileSync(fileName, data);
};

class Users {
  private data: Array<UserInterface>;
  constructor() {
    try {
      this.data = getDataFromFile(USERSFILE);
    } catch (err) {
      this.data = [];
    }
  }
  createOwnerAndRoom = (
    roomId: string,
    roomName: string,
    password: string,
    newOwner: UserDetailInterface
  ) => {
    const roomData = {
      roomId: roomId,
      name: roomName,
      password: password,
      activeUsers: [],
      invitedUsers: [],
    };
    const upDatedRecord: Array<UserInterface> = [
      ...this.data,
      { owner: newOwner, rooms: [roomData] },
    ];
    this.data = upDatedRecord;
  };
  createRoom = (
    roomId: string,
    roomName: string,
    password: string,
    tempOwner: UserDetailInterface
  ) => {
    if (this.data.length === 0) return false;
    const roomData = {
      roomId: roomId,
      password: password,
      name: roomName,
      activeUsers: [],
      invitedUsers: [],
    };
    const upDatedRecord: Array<UserInterface> = this.data.map((obj) => {
      if (obj.owner.email === tempOwner.email) {
        const tempRoomsData = [...obj.rooms, roomData];
        return {
          owner: obj.owner,
          rooms: tempRoomsData,
        };
      }
      return obj;
    });
    this.data = upDatedRecord;
  };
  checkRoomExist = (newRoomId: string) => {
    if (this.data.length === 0) return false;
    else {
      const roomExist = this.data.find((obj) => checkRooms(obj.rooms));
      const checkRooms = (rooms: Array<RoomInterface>) => {
        rooms.find((room) => room.roomId === newRoomId);
      };
      return roomExist;
    }
  };
  setInvitedUser = (
    tempRoomId: string,
    newUserData: UserDetailInterface,
    tempOwner: UserDetailInterface
  ) => {
    if (this.data.length === 0) return false;
    else {
      const upDatedRecord: Array<UserInterface> = this.data.map((obj) => {
        if (obj.owner.email === tempOwner.email) {
          const tempRooms = obj.rooms.map((room) => {
            if (room.roomId === tempRoomId) {
              const tempInvitedUsersData = [...room.invitedUsers, newUserData];
              return {
                roomId: room.roomId,
                name: room.name,
                password: room.password,
                activeUsers: room.activeUsers,
                invitedUsers: tempInvitedUsersData,
              };
            }
            return room;
          });
          return {
            owner: obj.owner,
            rooms: tempRooms,
          };
        }
        return obj;
      });
      this.data = upDatedRecord;
    }
  };

  checkUserExists = (userData: UserDetailInterface) => {
    let tempUserDetail = this.data.find(
      (user) => user.owner.email === userData.email
    );
    if (tempUserDetail?.owner?.email) return true;
    tempUserDetail = this.data.find((user) => {
      user.rooms.find((room) => checkUserExists(room.invitedUsers));
    });
    const checkUserExists = (users: Array<UserDetailInterface>) => {
      users.find((user) => {
        if (user.email === userData.email) return userData;
      });
    };
    if (tempUserDetail?.owner?.email) return tempUserDetail;
    return undefined;
  };
  checkValidCredentials = (roomId: string, password: string) => {
    const tempResponse = this.data.find((user) =>
      checkUserRoomCredentials(user.rooms)
    );
    const checkUserRoomCredentials = (rooms: Array<RoomInterface>) => {
      rooms.find((room) => {
        if (room.roomId === roomId) {
          if (room.password === password) {
            return {
              status: "User Exists",
              flag: true,
            };
          }
          return {
            status: "Invalid Password",
            flag: false,
          };
        }
      });
    };
    if (!tempResponse) {
      return {
        status: "Invalid Room ID",
        flag: false,
      };
    }
  };
  setActivedUser = (
    tempRoomId: string,
    newActiveUserData: UserDetailInterface,
    tempOwner: UserDetailInterface
  ) => {
    if (this.data.length === 0) return false;
    else {
      const upDatedRecord: Array<UserInterface> = this.data.map((obj) => {
        if (obj.owner.email === tempOwner.email) {
          const tempRooms = obj.rooms.map((room) => {
            if (room.roomId === tempRoomId) {
              const tempInvitedUsersData = [
                ...room.invitedUsers,
                newActiveUserData,
              ];
              return {
                roomId: room.roomId,
                name: room.name,
                password: room.password,
                activeUsers: tempInvitedUsersData,
                invitedUsers: room.invitedUsers,
              };
            }
            return room;
          });
          return {
            owner: obj.owner,
            rooms: tempRooms,
          };
        }
        return obj;
      });
      this.data = upDatedRecord;
    }
  };
  removeInvitedUser = (tempRoomId: string, tempOwner: UserDetailInterface) => {
    if (this.data.length === 0) return false;
    else {
      const upDatedRecord: Array<UserInterface> = this.data.map((obj) => {
        if (obj.owner.email === tempOwner.email) {
          const tempRooms: Array<RoomInterface> = obj.rooms.filter((room) => {
            if (room.roomId !== tempRoomId) {
              return room;
            }
          });
          return {
            owner: obj.owner,
            rooms: tempRooms,
          };
        }
        return obj;
      });
      this.data = upDatedRecord;
    }
  };
}

export default Users;
