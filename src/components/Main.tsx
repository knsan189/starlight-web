import { Save } from "@mui/icons-material";
import { Box, Button, Divider, styled } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../redux/reducers";
import { addParty } from "../redux/reducers/party";
import { ABREL, KAYANG, KOKOU } from "../service/FireBaseService";
import PartyList from "./Party/PartyList";
import PartyTab from "./Party/PartyTab";

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

interface TabPanelProps {
  children: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = ({ children, index, value }: TabPanelProps) => {
  if (index !== value) return null;
  return <Box>{children}</Box>;
};

const Main = ({ sidebar, onToggleSidebar }: Props) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

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

  return (
    <PartyLayout sidebar={sidebar}>
      <PartyTab value={activeTabIndex} onChange={onChangeTabIndex} />
      <TabPanel index={0} value={activeTabIndex}>
        <PartyList type={KOKOU} />
      </TabPanel>
      <TabPanel index={1} value={activeTabIndex}>
        <PartyList type={KAYANG} />
      </TabPanel>
      <TabPanel index={2} value={activeTabIndex}>
        <PartyList type={ABREL} />
      </TabPanel>
      <Button variant="outlined" onClick={handleClickAdd}>
        파티 추가하기
      </Button>
    </PartyLayout>
  );
};

export default Main;
