import { Search } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  InputBase,
  Typography,
} from "@mui/material";
import { debounce } from "lodash";
import React, { useCallback, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { IUser } from "../../@types/types";
import { addUser, editUser } from "../../redux/reducers/storage";
import CharService from "../../service/CharService";
import UserDetails from "./UserDetails";
import { AddUserRequest } from "../../service/UserService";

interface Props {
  open: boolean;
  onClose: () => void;
  user?: IUser;
}

const UserDialog = ({ open, onClose, user }: Props) => {
  const dispatch = useDispatch();
  const [details, setDetails] = useState<AddUserRequest>();
  const [loading, toggleLoading] = useState(false);

  const getCharInfo = debounce(async (name) => {
    try {
      const response = await CharService.getChar(name);

      if (!response.profile) {
        return;
      }

      setDetails({
        serverName: response.profile.ServerName,
        charName: response.profile.CharacterName,
        charClass: response.profile.CharacterClassName,
        charLevel: response.profile.CharacterLevel,
        itemLevel: parseFloat(response.profile.ItemMaxLevel.replaceAll(",", "")),
        guildName: response.profile.GuildName || "",
        tags: [],
        memo: "",
        loadTime: new Date().toUTCString(),
      });

      toggleLoading(false);
    } catch (error) {}
  }, 2000);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    toggleLoading(true);
    const { value } = event.target;
    getCharInfo(value);
  };

  const handleClickAdd = async () => {
    if (details) {
      dispatch(addUser(details));
    }
    handleClose();
  };

  const handleClose = () => {
    onClose();
    setDetails(undefined);
  };

  const onChangeForm = useCallback((name: "tags" | "memo", value: any) => {
    setDetails((prev) => (prev ? { ...prev, [name]: value } : prev));
  }, []);

  const onUpdate = useCallback(async () => {
    if (!user) return;
    toggleLoading(true);
    const response = await CharService.getChar(user.charName);

    if (response.profile) {
      setDetails({
        serverName: response.profile.ServerName,
        charName: response.profile.CharacterName,
        charClass: response.profile.CharacterClassName,
        charLevel: response.profile.CharacterLevel,
        itemLevel: parseFloat(response.profile.ItemMaxLevel.replaceAll(",", "")),
        guildName: response.profile.GuildName || "",
        tags: [],
        memo: "",
        loadTime: new Date().toUTCString(),
      });
    }

    toggleLoading(false);
  }, [user]);

  const handleClickEdit = async () => {
    if (!user || !details) return;
    dispatch(editUser(user.charName, { ...details, userCode: user.userCode }));
    onClose();
  };

  useEffect(() => {
    if (user) {
      setDetails(user);
    }
  }, [user]);

  return (
    <Dialog open={open} onClose={onClose} closeAfterTransition>
      <Box p={2} display="flex" alignItems="center">
        {user ? (
          <Typography variant="subtitle1">{user.charName} 정보</Typography>
        ) : (
          <>
            <Typography color="primary" sx={{ lineHeight: 0, mr: 1 }}>
              <Search />
            </Typography>
            <InputBase fullWidth placeholder="닉네임 검색하기" onChange={handleChange} />
          </>
        )}
      </Box>

      <DialogContent dividers sx={{ p: 0, minWidth: 500 }}>
        {!loading ? (
          <UserDetails
            details={details}
            editMode={Boolean(user)}
            onChange={onChangeForm}
            onUpdate={onUpdate}
          />
        ) : (
          <Box height={200} display="flex" justifyContent="center" alignItems="center">
            <CircularProgress />
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        {user ? (
          <Button onClick={handleClickEdit}>수정</Button>
        ) : (
          <Button onClick={handleClickAdd}>추가</Button>
        )}
        <Button onClick={handleClose}>취소</Button>
      </DialogActions>
    </Dialog>
  );
};

UserDialog.defaultProps = {
  user: undefined,
};

export default UserDialog;
