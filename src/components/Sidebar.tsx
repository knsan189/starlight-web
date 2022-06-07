import { Add } from "@mui/icons-material";
import { Box, Button, ButtonGroup, Drawer, TextField, Typography } from "@mui/material";
import { debounce } from "lodash";
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { IUser } from "../@types/types";
import { RootState } from "../redux/reducers";
import { setUsers } from "../redux/reducers/storage";
import Storage from "./Storage";
import UserDialog from "./User/UserDialog";
import UserSeachbar from "./User/UserSeachbar";

interface Props {
  open: boolean;
  onClose: () => void;
}
const Sidebar = ({ open, onClose }: Props) => {
  const [dialog, toggleDialog] = useState(false);
  const [searchList, setSearchList] = useState<IUser[]>();
  const { users } = useSelector((state: RootState) => state.storage);
  const dispatch = useDispatch();

  const onToggleDialog = useCallback(() => {
    toggleDialog((prev) => !prev);
  }, []);

  const delayQuery = debounce((inputValue) => {
    const newSearchList: IUser[] = [];

    users.forEach((user) => {
      if (
        user.charClass.includes(inputValue) ||
        user.itemLevel.toString().includes(inputValue) ||
        user.charName.includes(inputValue)
      ) {
        newSearchList.push(user);
      }
    });

    setSearchList(newSearchList);
  }, 500);

  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;

      if (!inputValue) {
        setSearchList(undefined);
      }

      delayQuery(inputValue);
    },
    [delayQuery],
  );

  const handleClickSort = (type: keyof IUser) => () => {
    const newUsers = users.sort((a, b) => {
      if (typeof a[type] === "string") {
        return a[type] < b[type] ? -1 : a[type] > b[type] ? 1 : 0;
      }
      return b[type] - a[type];
    });
    dispatch(setUsers(newUsers));
  };

  return (
    <Drawer
      anchor="left"
      variant="persistent"
      open={open}
      onClose={onClose}
      sx={{
        width: "22rem",
        "& .MuiDrawer-paper": {
          width: "22rem",
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
          <Box pt={2}>
            <ButtonGroup fullWidth>
              <Button onClick={handleClickSort("charName")}>가나다순</Button>
              <Button onClick={handleClickSort("itemLevel")}>레벨순</Button>
              <Button onClick={handleClickSort("charClass")}>직업순</Button>
            </ButtonGroup>
          </Box>
        </Box>
      </Box>
      <Box pl={3} pr={2}>
        <Storage searchList={searchList} />
      </Box>
      <UserDialog open={dialog} onClose={onToggleDialog} />
    </Drawer>
  );
};

export default Sidebar;
