import React, { useCallback, useState } from "react";
import { Container, Box } from "@mui/material";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { PARTY_LIST, USER_LIST } from "./mocks/const";
import PartyList from "./components/PartyList";
import { IUser } from "./@types/types";
import Header from "./components/Header";
import Storage from "./components/Storage";

function App() {
  const [partyList, setPartyList] = useState<IUser[][]>(PARTY_LIST);
  const [userList, setUserList] = useState<IUser[]>(USER_LIST);
  const handleDragEnd = useCallback(
    (result: DropResult) => {
      const { source, destination, type } = result;

      if (!destination) {
        return;
      }

      if (type === "party") {
        return;
      }

      if (type === "user") {
        if (source.droppableId.includes("party")) {
          const newPartyList = [...partyList];
          const sourcePartyIndex = parseInt(
            source.droppableId.replace(`party-`, ""),
            10
          );
          const sourceUserIndex = source.index;
          const [target] = newPartyList[sourcePartyIndex].splice(
            sourceUserIndex,
            1
          );
          if (destination.droppableId.includes("party")) {
            const targetPartyIndex = parseInt(
              destination.droppableId.replace(`party-`, ""),
              10
            );
            const targetUserIndex = destination.index;
            newPartyList[targetPartyIndex].splice(targetUserIndex, 0, target);
          } else if (destination.droppableId === "storage") {
            const newUserList = [...userList];
            newUserList.splice(destination.index, 0, target);
            setUserList(newUserList);
          }
          setPartyList(newPartyList);
        } else if (source.droppableId === "storage") {
          const newUserList = [...userList];
          const [target] = newUserList.splice(source.index, 1);
          if (destination.droppableId === "storage") {
            newUserList.splice(destination.index, 0, target);
          } else if (destination.droppableId.includes("party")) {
            const targetPartyIndex = parseInt(
              destination.droppableId.replace(`party-`, ""),
              10
            );
            const targetUserIndex = destination.index;
            const newPartyList = [...partyList];
            newPartyList[targetPartyIndex].splice(targetUserIndex, 0, target);
            setPartyList(newPartyList);
          }
          setUserList(newUserList);
        }
      }
    },
    [partyList, userList]
  );
  return (
    <>
      <Header />
      <DragDropContext onDragEnd={handleDragEnd}>
        <Container>
          <Box pt={4}>
            <Box display="flex" justifyContent="space-between">
              <Box flex={2}>
                <PartyList list={partyList} />
              </Box>
              <Box
                flex={1}
                sx={{
                  borderLeft: (theme) => `1px solid ${theme.palette.divider}`,
                  px: 2,
                }}
              >
                <Storage userList={userList} />
              </Box>
            </Box>
          </Box>
        </Container>
      </DragDropContext>
    </>
  );
}

export default App;
