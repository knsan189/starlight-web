import { Box } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { IUser } from "../@types/types";
import { RootState } from "../redux/reducers";
import Droppable from "./Droppable";
import User from "./User/User";

const Storage = () => {
  const { users, searchList } = useSelector((state: RootState) => state.storage);

  const getUserList = useCallback((): IUser[] => {
    if (searchList) {
      const list: IUser[] = [];
      searchList.forEach((item) => {
        users.forEach((user) => {
          if (user.userCode === item) {
            list.push(user);
          }
        });
      });
      return list;
    }
    return users;
  }, [users, searchList]);

  const result = getUserList();

  return (
    <Box>
      <Droppable droppableId="storage" type="user" direction="vertical">
        {result.map((user: IUser, index: number) => (
          <Box key={user.userCode} width="100%">
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
