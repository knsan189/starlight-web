import React from "react";
import { ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { Close, Search } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import { IUser } from "../../@types/types";
import { useDispatch } from "react-redux";

interface Props {
  user: IUser;
  menu?: EventTarget;
  onClose: (event: any) => void;
}
const UserMenu = ({ user, menu, onClose }: Props) => {
  const dispatch = useDispatch();
  const handleDelete = () => {};

  return (
    <Menu anchorEl={menu as Element} open={Boolean(menu)} onClose={onClose} autoFocus={false}>
      <MenuItem onClick={handleDelete}>
        <ListItemIcon>
          <Close fontSize="small" color="warning" />
        </ListItemIcon>
        <ListItemText primary="파티 추방" primaryTypographyProps={{ variant: "body2" }} />
      </MenuItem>
    </Menu>
  );
};

UserMenu.defaultProps = {
  menu: undefined,
};

export default UserMenu;
