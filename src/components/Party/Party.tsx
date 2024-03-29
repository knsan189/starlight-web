import { MoreVert } from "@mui/icons-material";
import { Button, Card, CardContent, CardHeader, Divider, IconButton } from "@mui/material";
import React from "react";
import { IUser, Member } from "../../@types/types";
import Draggable from "../Draggable";
import UserList from "../User/UserList";

interface Props {
  party: Member[];
  partyIndex: number;
}
const Party = ({ party, partyIndex }: Props) => {
  return (
    <Draggable draggableId={`party-${partyIndex}`} index={partyIndex}>
      <Card sx={{ minWidth: 400 }}>
        <CardHeader title={`파티 ${partyIndex + 1}`} />
        <Divider />
        <CardContent>
          <UserList userList={party} partyIndex={partyIndex} />
        </CardContent>
      </Card>
    </Draggable>
  );
};

export default Party;
