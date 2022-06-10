import { Add, PhotoCamera } from "@mui/icons-material";
import { Box, Button, IconButton, Tab, Tabs } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { Raid, RaidList } from "../../@types/types";
import { RootState } from "../../redux/reducers";
import RaidService from "../../service/RaidService";
import PartyDialog from "./PartyDialog";

interface Props {
  value: number;
  raidList?: RaidList;
  onChange: (event: React.SyntheticEvent, index: number) => void;
  onScreenShot: () => void;
}

const PartyTab = ({ value, raidList, onChange, onScreenShot }: Props) => {
  const raid = useSelector((state: RootState) => state.party);
  const [dialog, toggleDialog] = useState(false);

  const handleClickSave = async () => {
    if (raid.id) {
      await RaidService.editRaid(raid.id, raid as Raid);
    }
  };

  const onToggleDialog = useCallback(() => {
    toggleDialog((prev) => !prev);
  }, []);

  return (
    <Box pb={2} display="flex" justifyContent="space-between" alignItems="center">
      <Box display="flex" alignItems="center">
        <Tabs onChange={onChange} value={value}>
          {raidList?.map((raid, index) => (
            <Tab label={raid.title} tabIndex={index} key={raid.id} />
          ))}
        </Tabs>
        <IconButton size="small" onClick={onToggleDialog}>
          <Add />
        </IconButton>
      </Box>
      <PartyDialog open={dialog} onClose={onToggleDialog} />
      <Box>
        <Button variant="contained" onClick={onScreenShot} color="secondary" sx={{ mr: 1 }}>
          <PhotoCamera />
        </Button>
        <Button variant="contained" onClick={handleClickSave}>
          저장하기
        </Button>
      </Box>
    </Box>
  );
};

PartyTab.defaultProps = {
  raidList: undefined,
};

export default PartyTab;
