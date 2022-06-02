import React from "react";
import { Container, Box } from "@mui/material";
import { DragDropContext } from "react-beautiful-dnd";
import PartyList from "./components/PartyList";
import Storage from "./components/Storage";
import useDragDrop from "./hooks/useDragDrop";

function App() {
  const { onDragEnd } = useDragDrop();
  return (
    <>
      {/* <Header /> */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Container>
          <Box pt={4}>
            <Box display="flex" justifyContent="space-between">
              <Box flex={2}>
                <PartyList />
              </Box>
              <Box
                flex={1}
                sx={{
                  borderLeft: (theme) => `1px solid ${theme.palette.divider}`,
                  px: 2,
                }}
              >
                <Storage />
              </Box>
            </Box>
          </Box>
        </Container>
      </DragDropContext>
    </>
  );
}

export default App;
