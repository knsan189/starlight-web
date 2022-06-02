import { Box } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { IUser } from "../@types/types";
import { RootState } from "../redux/reducers";
import Droppable from "./Droppable";
import User from "./User";

const Storage = () => {
  const { users } = useSelector((state: RootState) => state.storage);

  return (
    <Box>
      <Droppable droppableId="storage" type="user" direction="vertical">
        {users.map((user: IUser, index: number) => (
          <Box key={user.charName} width="100%">
            <User user={user} userIndex={index} type="storage" />
          </Box>
        ))}
      </Droppable>
    </Box>
  );
};

export default Storage;
