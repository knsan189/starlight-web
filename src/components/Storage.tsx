import { Box } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { IUser } from "../@types/types";
import { RootState } from "../redux/reducers";
import Droppable from "./Droppable";
import User from "./User/User";

interface Props {
  searchList?: IUser[];
}
const Storage = ({ searchList }: Props) => {
  const { users } = useSelector((state: RootState) => state.storage);
  console.log(users);
  const result = searchList ? searchList : users;

  return (
    <Box>
      <Droppable droppableId="storage" type="user" direction="vertical">
        {result.map((user: IUser, index: number) => (
          <Box key={user.charName} width="100%">
            <User user={user} userIndex={index} type="storage" />
          </Box>
        ))}
      </Droppable>
    </Box>
  );
};

Storage.defaultProps = {
  searchList: undefined,
};

export default Storage;
