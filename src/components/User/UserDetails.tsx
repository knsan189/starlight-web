import { Box, Divider, Paper, TextField, Typography } from "@mui/material";
import React from "react";
import { GetCharResponse } from "../../service/CharService";

interface Props {
  details?: GetCharResponse;
}

const UserDetails = ({ details }: Props) => {
  if (!details)
    return (
      <Box p={2} height={200}>
        <Typography variant="body2">검색결과가 없습니다</Typography>
      </Box>
    );

  const { serverName, charClass, itemLevel, guildName, charLevel } = details;

  return (
    <Box>
      <Box sx={{ bgcolor: (theme) => theme.palette.grey[100], p: 2 }}>
        <Paper>
          <Box p={1} display="flex" justifyContent="space-between">
            <Typography variant="body2">서버</Typography>
            <Typography variant="body2">{serverName}</Typography>
          </Box>
          <Divider />
          <Box p={1} display="flex" justifyContent="space-between">
            <Typography variant="body2">직업</Typography>
            <Typography variant="body2">{charClass}</Typography>
          </Box>
          <Divider />
          <Box p={1} display="flex" justifyContent="space-between">
            <Typography variant="body2">아이템 레벨</Typography>
            <Typography variant="body2">{itemLevel}</Typography>
          </Box>
          <Divider />
          <Box p={1} display="flex" justifyContent="space-between">
            <Typography variant="body2">길드</Typography>
            <Typography variant="body2">{guildName}</Typography>
          </Box>
          <Divider />
          <Box p={1} display="flex" justifyContent="space-between">
            <Typography variant="body2">캐릭터 레벨</Typography>
            <Typography variant="body2">{charLevel}</Typography>
          </Box>
        </Paper>
      </Box>
      <Divider />
      <Box p={2}>
        <Typography gutterBottom variant="body2">
          메모추가
        </Typography>
        <TextField fullWidth size="small" multiline />
      </Box>
    </Box>
  );
};

UserDetails.defaultProps = {
  details: undefined,
};

export default UserDetails;
