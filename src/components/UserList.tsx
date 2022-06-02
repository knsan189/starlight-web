import React from "react";
import { IUser } from "../@types/types";
import Droppable from "./Droppable";
import User from "./User";

interface Props {
  userList: IUser[];
  partyIndex: number;
}
const UserList = ({ userList, partyIndex }: Props) => {
  return (
    <Droppable droppableId={`party-${partyIndex}`} type="user">
      {userList.map((user, index) => (
        <User key={user.charName} user={user} userIndex={index} type="user" />
      ))}
    </Droppable>
  );
};

export default UserList;
