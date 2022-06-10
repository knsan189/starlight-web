import { Box, Typography } from "@mui/material";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { IUser } from "../../@types/types";
import { RootState } from "../../redux/reducers";

interface Props {
  user: IUser;
}
const UserPartyCheck = ({ user }: Props) => {
  const { parties } = useSelector((state: RootState) => state.party);

  const partyList = useMemo(() => {
    const list = [];

    for (let i = 0; i < parties.length; i++) {
      for (let j = 0; j < parties[i].length; j++) {
        if (parties[i][j].userName === user.charName) {
          list.push(i);
        }
      }
    }

    if (!list.length) {
      return undefined;
    }

    return list;
  }, [parties, user]);

  if (!partyList) {
    return null;
  }

  return (
    <Box px={2} pb={1}>
      {partyList.map((num, index) => (
        <Typography mr={0.5} key={num} variant="caption" color={index > 0 ? "error" : undefined}>
          {num + 1}파티
        </Typography>
      ))}
    </Box>
  );
};

export default UserPartyCheck;
