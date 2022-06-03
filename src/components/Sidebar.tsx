import { Add } from "@mui/icons-material";
import { Box, Button, Drawer, TextField, Typography } from "@mui/material";
import React, { useCallback, useState } from "react";
import Storage from "./Storage";
import UserDialog from "./User/UserDialog";
import UserSeachbar from "./User/UserSeachbar";

interface Props {
  open: boolean;
  onClose: () => void;
}
const Sidebar = ({ open, onClose }: Props) => {
  const [dialog, toggleDialog] = useState(false);

  const onToggleDialog = useCallback(() => {
    toggleDialog((prev) => !prev);
  }, []);

  const onChange = useCallback(() => {}, []);

  return (
    <Drawer
      anchor="left"
      variant="persistent"
      open={open}
      onClose={onClose}
      sx={{
        width: "20rem",
        "& .MuiDrawer-paper": {
          width: "20rem",
        },
      }}
    >
      <Box p={3}>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h6">별빛노을</Typography>
          <Button variant="contained" onClick={onToggleDialog}>
            <Add />
          </Button>
        </Box>
        <Box pt={2}>
          <UserSeachbar onChange={onChange} />
        </Box>
      </Box>
      <Box pl={3} pr={2}>
        <Storage />
      </Box>
      <UserDialog open={dialog} onClose={onToggleDialog} />
    </Drawer>
  );
};

export default Sidebar;
