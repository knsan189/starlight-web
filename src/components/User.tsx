import { MoreVert } from "@mui/icons-material";
import { Avatar, Card, CardContent, CardHeader, IconButton, Typography } from "@mui/material";
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
      <Card>
        <CardHeader
          avatar={<Avatar src="/images/dohwa.png"></Avatar>}
          title={`${charName}`}
          titleTypographyProps={{ variant: "subtitle2" }}
          subheader={`${itemLevel}, ${charClass}`}
          action={
            <IconButton>
              <MoreVert />
            </IconButton>
          }
        />
        {/* <CardContent>
          <Typography variant="subtitle2">
            {charName} / {charClass}
          </Typography>
          <Typography variant="body2">{itemLevel}</Typography>
        </CardContent> */}
      </Card>
    </Draggable>
  );
};

export default User;
