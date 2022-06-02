import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/reducers";
import Droppable from "./Droppable";
import Party from "./Party";

const PartyList = () => {
  const { parties } = useSelector((state: RootState) => state.party);
  return (
    <Droppable droppableId="party" type="party" direction="vertical">
      {parties.map((party, index) => (
        <Party key={index} party={party} partyIndex={index} />
      ))}
    </Droppable>
  );
};

export default PartyList;
