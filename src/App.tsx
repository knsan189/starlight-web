import React, { useState } from "react";
import { Container, Box } from "@mui/material";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { USERS } from "./mocks/const";
import PartyList from "./components/PartyList";
import { IUser } from "./@types/types";

function App() {
  const [partyList, setPartyList] = useState<IUser[][]>(USERS);
  const handleDragEnd = (result: DropResult) => {
    const { source, destination, type } = result;

    if (!destination) {
      return;
    }

    if (type === "party") {
      console.log(result);
      return;
    }

    const sourcePartyIndex = parseInt(result.source.droppableId, 10);
    const sourceUserIndex = source.index;
    const targetPartyIndex = parseInt(destination.droppableId, 10);
    const targetUserIndex = destination.index;
    const newPartyList = [...partyList];
    const [target] = newPartyList[sourcePartyIndex].splice(sourceUserIndex, 1);
    newPartyList[targetPartyIndex].splice(targetUserIndex, 0, target);
    setPartyList(newPartyList);
  };
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Container>
        <Box>
          <PartyList list={partyList} />
        </Box>
      </Container>
    </DragDropContext>
  );
}

export default App;
