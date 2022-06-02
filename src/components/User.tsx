import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { IUser } from "../@types/types";
import Draggable from "./Draggable";

interface Props {
  user: IUser;
  userIndex: number;
}

const User = ({ user, userIndex }: Props) => {
  const { charName, charLevel, charClass, itemLevel } = user;
  return (
    <Draggable index={userIndex} draggableId={`user-${charName}`}>
      <Card sx={{ width: 200 }}>
        <CardContent>
          <Typography variant="subtitle2">
            {charName} / {charClass}
          </Typography>
          <Typography variant="body2">{itemLevel}</Typography>
        </CardContent>
      </Card>
    </Draggable>
  );
};

export default User;
