import { Box } from "@mui/material";
import React from "react";
import { IUser } from "../@types/types";
import Droppable from "./Droppable";
import User from "./User";

interface Props {
  userList: IUser[];
}

const Storage = ({ userList }: Props) => {
  return (
    <Box>
      <Droppable droppableId="storage" type="user" direction="vertical">
        {userList.map((user, index) => (
          <Box key={user.charName} flex={1}>
            <User user={user} userIndex={index} />
          </Box>
        ))}
      </Droppable>
    </Box>
  );
};

export default Storage;
