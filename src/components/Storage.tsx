import { Add } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import React, { useCallback, useState } from "react";
import { IUser } from "../@types/types";
import Droppable from "./Droppable";
import User from "./User";
import UserDialog from "./UserDialog";

interface Props {
  userList: IUser[];
}

const Storage = ({ userList }: Props) => {
  const [dialog, toggleDialog] = useState(false);

  const onToggleDialog = useCallback(() => {
    toggleDialog((prev) => !prev);
  }, []);

  return (
    <Box>
      <Droppable droppableId="storage" type="user" direction="vertical">
        {userList.map((user, index) => (
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
