import React, { useEffect } from "react";
import { Container, Box, Button } from "@mui/material";
import { DragDropContext } from "react-beautiful-dnd";
import PartyList from "./components/PartyList";
import Storage from "./components/Storage";
import useDragDrop from "./hooks/useDragDrop";
import { useDispatch } from "react-redux";
import { syncStorage } from "./redux/reducers/storage";
import FirebaseService from "./service/FireBaseService";
import { useSelector } from "react-redux";
import { RootState } from "./redux/reducers";

function App() {
  const { onDragEnd } = useDragDrop();
  const { users } = useSelector((state: RootState) => state.storage);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(syncStorage());
  }, [dispatch]);

  const handleClickSave = async () => {
    const response = await FirebaseService.setUserList(users);
  };

  return (
    <>
      {/* <Header /> */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Container>
          <Button onClick={handleClickSave}>Save</Button>
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
