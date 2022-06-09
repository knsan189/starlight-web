import React from "react";
import { useSelector } from "react-redux";
import { IUser, Member } from "../../@types/types";
import { RootState } from "../../redux/reducers";
import Droppable from "../Droppable";
import User from "./User";

interface Props {
  userList: Member[];
  partyIndex: number;
}
const UserList = ({ userList, partyIndex }: Props) => {
  const { users } = useSelector((state: RootState) => state.storage);
  return (
    <Droppable droppableId={`party-${partyIndex}`} type="user">
      {userList.map((member, index) => {
        const user = users.find((u) => u.charName === member.userName);

        if (!user) {
          return null;
        }

        return <User key={member.id} user={user} userIndex={index} type="user" member={member} />;
      })}
    </Droppable>
  );
};

export default UserList;
