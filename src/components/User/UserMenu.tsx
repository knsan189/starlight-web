import React from "react";
import { ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { Close, Delete, Person, Search } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import { DropType, IUser } from "../../@types/types";
import { useDispatch } from "react-redux";
import { removeMember, setParties } from "../../redux/reducers/party";
import { deleteUser } from "../../redux/reducers/storage";

interface Props {
  user: IUser;
  menu?: EventTarget;
  onClose: (event?: any) => void;
  onToggleDialog: () => void;
  type: DropType;
}
const UserMenu = ({ user, menu, onClose, onToggleDialog, type }: Props) => {
  const { parties } = useSelector((state: RootState) => state.party);
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (type === "user") {
      dispatch(removeMember(user.charName));
    }
    dispatch(deleteUser(user.userCode));
    onClose();
  };

  const handleEdit = () => {
    onToggleDialog();
    onClose();
  };

  return (
    <Menu anchorEl={menu as Element} open={Boolean(menu)} onClose={onClose} autoFocus={false}>
      <MenuItem onClick={handleDelete}>
        <ListItemIcon>
          <Delete fontSize="small" color="warning" />
        </ListItemIcon>
        <ListItemText
          primary={type === "user" ? "파티 추방" : "유저 삭제"}
          primaryTypographyProps={{ variant: "body2" }}
        />
      </MenuItem>
      <MenuItem onClick={handleEdit}>
        <ListItemIcon>
          <Person fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="유저 정보 수정" primaryTypographyProps={{ variant: "body2" }} />
      </MenuItem>
    </Menu>
  );
};

UserMenu.defaultProps = {
  menu: undefined,
};

export default UserMenu;
