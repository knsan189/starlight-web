import { Save } from "@mui/icons-material";
import { Box, Button, Divider, styled, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../redux/reducers";
import { addParty } from "../redux/reducers/party";
import FirebaseService from "../service/FireBaseService";
import PartyList from "./Party/PartyList";

const PartyLayout = styled(Box)<{ sidebar: boolean }>(({ theme, sidebar }) => ({
  background: theme.palette.grey[100],
  minHeight: "100vh",
  padding: theme.spacing(3),
  flexGrow: 1,
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `20rem`,
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
  const { parties } = useSelector((state: RootState) => state.party);
  const dispatch = useDispatch();

  const handleClickSave = async () => {
    await FirebaseService.setUserList(users);
    await FirebaseService.setPartyList(parties);
    console.log("success");
  };

  const handleClickAdd = () => {
    dispatch(addParty());
  };

  return (
    <PartyLayout sidebar={sidebar}>
      <Box pb={2} display="flex" justifyContent="space-between">
        <Typography variant="h6">쿠크세이튼 파티</Typography>
        <Button variant="contained" onClick={handleClickSave}>
          저장하기
        </Button>
      </Box>
      <Divider />
      <Box pt={2}>
        <PartyList />
      </Box>
      <Button variant="outlined" onClick={handleClickAdd}>
        파티 추가하기
      </Button>
    </PartyLayout>
  );
};

export default Main;
