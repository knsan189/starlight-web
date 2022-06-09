import { PhotoCamera } from "@mui/icons-material";
import { Box, Button, Tab, Tabs, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import FirebaseService, { ABREL, KAYANG, KOKOU, PartyTypes } from "../../service/FireBaseService";

interface Props {
  value: number;
  onChange: (event: React.SyntheticEvent, index: number) => void;
  onScreenShot: () => void;
}

const types = [KOKOU, KAYANG, ABREL];

const PartyTab = ({ value, onChange, onScreenShot }: Props) => {
  const { users } = useSelector((state: RootState) => state.storage);
  const { parties } = useSelector((state: RootState) => state.party);

  const handleClickSave = async () => {
    await FirebaseService.setPartyList(parties, types[value] as PartyTypes);
  };

  return (
    <Box pb={2} display="flex" justifyContent="space-between" alignItems="center">
      <Tabs onChange={onChange} value={value}>
        <Tab label="쿠크세이튼" />
        <Tab label="카양겔" />
        <Tab label="아브렐슈드" />
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

export default PartyTab;
