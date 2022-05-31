import React from "react";
import { IUser } from "../@types/types";
import Droppable from "./Droppable";
import Party from "./Party";

interface Props {
  list: IUser[][];
}
const PartyList = ({ list }: Props) => {
  return (
    <Droppable droppableId="party" type="party" direction="vertical">
      {list.map((item, index) => (
        <Party key={index} party={item} partyIndex={index} />
      ))}
    </Droppable>
  );
};

export default PartyList;
