import { Box, Drawer } from "@mui/material";
import React from "react";
import Storage from "./Storage";

interface Props {
  open: boolean;
  onClose: () => void;
}
const Sidebar = ({ open, onClose }: Props) => {
  return (
    <Drawer
      anchor="right"
      variant="persistent"
      open={open}
      onClose={onClose}
      sx={{
        width: "30%",
        "& .MuiDrawer-paper": {
          width: "30%",
        },
      }}
    >
      <Box p={2}>
        <Storage />
      </Box>
    </Drawer>
  );
};

export default Sidebar;
