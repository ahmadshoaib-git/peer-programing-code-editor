import React from "react";
import Tooltip from "../Tooltip";
import { userList, colorList } from "./avatarGroup.config";
import { CustomAvatar } from "./avatargroup.style";
const AvatarGroup = () => {
  return (
    <CustomAvatar.Group maxCount={3}>
      {userList?.map((user) => {
        const randomIndex = Math.floor(Math.random() * colorList.length);
        return (
          <Tooltip title={user} placement="bottom">
            <CustomAvatar
              style={{
                backgroundColor: colorList[randomIndex].background,
                color: colorList[randomIndex].color,
              }}
            >
              <span className="alias">{user?.charAt(0)}</span>
            </CustomAvatar>
          </Tooltip>
        );
      })}
    </CustomAvatar.Group>
  );
};

export default AvatarGroup;
