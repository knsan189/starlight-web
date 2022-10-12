import { Box, Button, styled } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addParty, setRaidList } from "../redux/reducers/party";
import PartyList from "./Party/PartyList";
import PartyTab from "./Party/PartyTab";
import RaidService from "../service/RaidService";
import { useSelector } from "react-redux";
import { RootState } from "../redux/reducers";

const PartyLayout = styled(Box, { shouldForwardProp: (prop) => prop !== "sidebar" })<{
  sidebar: boolean;
}>(({ theme, sidebar }) => ({
  background: theme.palette.grey[100],
  minHeight: "100vh",
  padding: theme.spacing(3),
  flexGrow: 1,
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `22rem`,
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

interface TabPanelProps {
  children: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = ({ children, index, value }: TabPanelProps) => {
  if (index !== value) return null;
  return <Box id={`party-${index}`}>{children}</Box>;
};

const Main = ({ sidebar, onToggleSidebar }: Props) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const { raidList } = useSelector((state: RootState) => state.party);

  const dispatch = useDispatch();

  const handleClickAdd = () => {
    dispatch(addParty());
  };

  const onChangeTabIndex = useCallback(
    (event: React.SyntheticEvent, index: number) => {
      if (activeTabIndex === index) return;
      setActiveTabIndex(index);
    },
    [activeTabIndex],
  );

  const onScreenShot = useCallback(async () => {
    // const element = document.getElementById(`party-${activeTabIndex}`);
    // if (element) {
    //   const response = await html2canvas(element);
    //   const link = document.createElement("a");
    //   link.download = "파티.jpeg";
    //   link.href = response.toDataURL("image/jpeg");
    //   link.click();
    // }
  }, []);

  const getRaidList = useCallback(async () => {
    const response = await RaidService.getRaidList();
    dispatch(setRaidList(response));
  }, [dispatch]);

  useEffect(() => {
    getRaidList();
  }, [getRaidList]);

  return (
    <PartyLayout sidebar={sidebar}>
      <PartyTab
        value={activeTabIndex}
        onChange={onChangeTabIndex}
        onScreenShot={onScreenShot}
        raidList={raidList}
      />

      {raidList?.map((raid, index) => (
        <TabPanel key={raid.id} index={index} value={activeTabIndex}>
          <PartyList id={raid.id} />
        </TabPanel>
      ))}

      <Button variant="outlined" onClick={handleClickAdd}>
        파티 추가하기
      </Button>
    </PartyLayout>
  );
};

export default Main;
