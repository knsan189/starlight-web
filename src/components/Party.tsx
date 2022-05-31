import { Card, CardContent, CardHeader, Divider } from "@mui/material";
import React from "react";
import { IUser } from "../@types/types";
import Draggable from "./Draggable";
import UserList from "./UserList";

interface Props {
  party: IUser[];
  partyIndex: number;
}
const Party = ({ party, partyIndex }: Props) => {
  return (
    <Draggable draggableId={`party-${partyIndex}`} index={partyIndex}>
      <Card>
        <CardHeader subheader={`party-${partyIndex}`} />
        <Divider />
        <CardContent>
          <UserList userList={party} partyIndex={partyIndex} />
        </CardContent>
      </Card>
    </Draggable>
  );
};

export default Party;
