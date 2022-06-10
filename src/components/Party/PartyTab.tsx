import { PhotoCamera } from "@mui/icons-material";
import { Box, Button, Tab, Tabs, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Raid, RaidList } from "../../@types/types";
import { RootState } from "../../redux/reducers";
import FirebaseService, { PartyTypes } from "../../service/FireBaseService";
import RaidService from "../../service/RaidService";

interface Props {
  value: number;
  raidList?: RaidList;
  onChange: (event: React.SyntheticEvent, index: number) => void;
  onScreenShot: () => void;
}

const PartyTab = ({ value, raidList, onChange, onScreenShot }: Props) => {
  const { users } = useSelector((state: RootState) => state.storage);
  const raid = useSelector((state: RootState) => state.party);

  const handleClickSave = async () => {
    if (raid.id) {
      await RaidService.editRaid(raid.id, raid as Raid);
    }
  };

  return (
    <Box pb={2} display="flex" justifyContent="space-between" alignItems="center">
      <Tabs onChange={onChange} value={value}>
        {raidList?.map((raid, index) => (
          <Tab label={raid.title} tabIndex={index} key={raid.id} />
        ))}
      </Tabs>
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
