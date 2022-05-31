import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { IUser } from "../@types/types";
import Draggable from "./Draggable";

interface Props {
  user: IUser;
  userIndex: number;
}

const User = ({ user, userIndex }: Props) => {
  const { charName, charLevel, charClass } = user;
  return (
    <Draggable index={userIndex} draggableId={`user-${charName}`}>
      <Card sx={{ width: 100 }}>
        <CardContent>
          <Typography variant="subtitle2">{charName}</Typography>
          <Typography variant="body2">{charClass}</Typography>
          <Typography variant="caption">{charLevel}</Typography>
        </CardContent>
      </Card>
    </Draggable>
  );
};

export default User;
