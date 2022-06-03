import { Search } from "@mui/icons-material";
import { Box, InputBase, styled } from "@mui/material";
import React from "react";

interface Props {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputBox = styled(Box)(({ theme }) => ({
  background: theme.palette.grey[200],
  borderRadius: theme.shape.borderRadius,
}));

const UserSeachbar = ({ onChange }: Props) => {
  return (
    <InputBox display="flex" alignItems="center">
      <Box px={1} py={0.5}>
        <Search color="disabled" />
      </Box>
      <InputBase onChange={onChange} fullWidth />
    </InputBox>
  );
};

export default UserSeachbar;
