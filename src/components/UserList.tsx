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
    <Droppable droppableId={partyIndex.toString()} type="user">
      {userList.map((user, index) => (
        <User key={user.charName} user={user} userIndex={index} />
      ))}
    </Droppable>
  );
};

export default UserList;
