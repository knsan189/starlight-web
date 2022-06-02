import React, { useCallback, useEffect, useState } from "react";
import { Container, Box, Button, Divider, styled } from "@mui/material";
import { DragDropContext } from "react-beautiful-dnd";
import PartyList from "./components/PartyList";
import Storage from "./components/Storage";
import useDragDrop from "./hooks/useDragDrop";
import { useDispatch } from "react-redux";
import { syncStorage } from "./redux/reducers/storage";
import FirebaseService from "./service/FireBaseService";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";

function App() {
  const { onDragEnd } = useDragDrop();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(syncStorage());
  }, [dispatch]);

  const [sidebar, toggleSidebar] = useState(true);

  const onToggleSidebar = useCallback(() => {
    toggleSidebar((prev) => !prev);
  }, []);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box display="flex">
        <Sidebar open={sidebar} onClose={onToggleSidebar} />
        <Main sidebar={sidebar} onToggleSidebar={onToggleSidebar} />
      </Box>
    </DragDropContext>
  );
}

export default App;
