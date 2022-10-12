import { DragDropContext } from "@hello-pangea/dnd";
import { Box } from "@mui/material";
import React, { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import Main from "../components/Main";
import Sidebar from "../components/Sidebar";
import useDragDrop from "../hooks/useDragDrop";
import { syncStorage } from "../redux/reducers/storage";

const Home = () => {
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
};

export default Home;
