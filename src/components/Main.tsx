import { Box, Button, Divider, styled, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/reducers";
import FirebaseService from "../service/FireBaseService";
import PartyList from "./PartyList";

const PartyLayout = styled(Box)<{ sidebar: boolean }>(({ theme, sidebar }) => ({
  background: theme.palette.grey[100],
  minHeight: "100vh",
  width: "70%",
  padding: theme.spacing(2),
  flexGrow: 1,
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-30%`,
  ...(sidebar && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface Props {
  sidebar: boolean;
  onToggleSidebar: () => void;
}

const Main = ({ sidebar, onToggleSidebar }: Props) => {
  const { users } = useSelector((state: RootState) => state.storage);

  const handleClickSave = async () => {
    await FirebaseService.setUserList(users);
    console.log("success");
  };

  return (
    <PartyLayout sidebar={sidebar}>
      <Box py={2} display="flex" justifyContent="space-between">
        <Typography variant="h6">쿠크</Typography>
        <Button variant="contained" onClick={handleClickSave}>
          저장
        </Button>
      </Box>
      <Divider />
      <Box pt={2}>
        <PartyList />
      </Box>
    </PartyLayout>
  );
};

export default Main;
