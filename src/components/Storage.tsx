import { Add } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { IUser } from "../@types/types";
import { RootState } from "../redux/reducers";
import Droppable from "./Droppable";
import User from "./User";
import UserDialog from "./UserDialog";

const Storage = () => {
  const [dialog, toggleDialog] = useState(false);

  const onToggleDialog = useCallback(() => {
    toggleDialog((prev) => !prev);
  }, []);

  const { users } = useSelector((state: RootState) => state.storage);

  return (
    <Box>
      <Droppable droppableId="storage" type="user" direction="vertical">
        {users.map((user: IUser, index: number) => (
          <Box key={user.charName} flex={1}>
            <User user={user} userIndex={index} />
          </Box>
        ))}
      </Droppable>
      <Button variant="outlined" onClick={onToggleDialog}>
        <Add />
      </Button>
      <UserDialog open={dialog} onClose={onToggleDialog} />
    </Box>
  );
};

export default Storage;
