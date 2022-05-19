"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const USERSFILE = "data.json";
const getDataFromFile = (fileName) => {
    return fs.readFile(fileName, (err, data) => {
        if (err)
            throw err;
        let parsedData = JSON.parse(data);
        console.log(parsedData);
        return parsedData.users;
    });
};
const updateDataFromFile = (fileName, usersData) => {
    let data = JSON.stringify({
        users: usersData,
    });
    fs.writeFileSync(fileName, data);
};
class Users {
    constructor() {
        this.createOwnerAndRoom = (roomId, roomName, password, newOwner) => {
            const roomData = {
                roomId: roomId,
                name: roomName,
                password: password,
                activeUsers: [],
                invitedUsers: [],
            };
            const upDatedRecord = [
                ...this.data,
                { owner: newOwner, rooms: [roomData] },
            ];
            this.data = upDatedRecord;
        };
        this.createRoom = (roomId, roomName, password, tempOwner) => {
            if (this.data.length === 0)
                return false;
            const roomData = {
                roomId: roomId,
                password: password,
                name: roomName,
                activeUsers: [],
                invitedUsers: [],
            };
            const upDatedRecord = this.data.map((obj) => {
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
        this.checkRoomExist = (newRoomId) => {
            if (this.data.length === 0)
                return false;
            else {
                const roomExist = this.data.find((obj) => checkRooms(obj.rooms));
                const checkRooms = (rooms) => {
                    rooms.find((room) => room.roomId === newRoomId);
                };
                return roomExist;
            }
        };
        this.setInvitedUser = (tempRoomId, newUserData, tempOwner) => {
            if (this.data.length === 0)
                return false;
            else {
                const upDatedRecord = this.data.map((obj) => {
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
        this.checkUserExists = (userData) => {
            let tempUserDetail = this.data.find((user) => user.owner.email === userData.email);
            if (tempUserDetail?.owner?.email)
                return true;
            tempUserDetail = this.data.find((user) => {
                user.rooms.find((room) => checkUserExists(room.invitedUsers));
            });
            const checkUserExists = (users) => {
                users.find((user) => {
                    if (user.email === userData.email)
                        return userData;
                });
            };
            if (tempUserDetail?.owner?.email)
                return tempUserDetail;
            return undefined;
        };
        this.checkValidCredentials = (roomId, password) => {
            const tempResponse = this.data.find((user) => checkUserRoomCredentials(user.rooms));
            const checkUserRoomCredentials = (rooms) => {
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
        this.setActivedUser = (tempRoomId, newActiveUserData, tempOwner) => {
            if (this.data.length === 0)
                return false;
            else {
                const upDatedRecord = this.data.map((obj) => {
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
        this.removeInvitedUser = (tempRoomId, tempOwner) => {
            if (this.data.length === 0)
                return false;
            else {
                const upDatedRecord = this.data.map((obj) => {
                    if (obj.owner.email === tempOwner.email) {
                        const tempRooms = obj.rooms.filter((room) => {
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
        try {
            this.data = getDataFromFile(USERSFILE);
        }
        catch (err) {
            this.data = [];
        }
    }
}
exports.default = Users;
