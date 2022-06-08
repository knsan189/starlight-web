import { Search } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  InputBase,
  List,
  ListItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { debounce } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { IUser } from "../../@types/types";
import { addUser } from "../../redux/reducers/storage";
import CharService, { GetCharResponse } from "../../service/CharService";
import UserService from "../../service/UserService";
import UserDetails from "./UserDetails";

interface Props {
  open: boolean;
  onClose: () => void;
  mode: "create" | "edit";
  user?: IUser;
}

const UserDialog = ({ open, onClose, mode, user }: Props) => {
  const dispatch = useDispatch();
  const [details, setDetails] = useState<GetCharResponse | IUser | undefined>(user);
  const [loading, toggleLoading] = useState(false);
  const [form, setForm] = useState(
    user ? { tags: user.tags, memo: user.memo } : { tags: [], memo: "" },
  );

  const getCharInfo = debounce(async (name) => {
    const response = await CharService.getChar(name);
    if (!response) {
      setDetails(undefined);
      return;
    }
    setDetails(response);
    toggleLoading(false);
  }, 1000);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    toggleLoading(true);
    const { value } = event.target;
    getCharInfo(value);
  };

  const handleClickAdd = async () => {
    if (details) {
      dispatch(addUser({ ...details, ...form }));
    }
    handleClose();
  };

  const handleClose = () => {
    onClose();
    setDetails(undefined);
    setForm({ tags: [], memo: "" });
  };

  const onChangeForm = useCallback((name: string, value: any) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const onUpdate = useCallback(async () => {
    if (!user) return;
    toggleLoading(true);
    const response = await CharService.getChar(user.charName);
    if (response) setDetails(response);
    toggleLoading(false);
  }, [user]);

  const handleClickEdit = async () => {
    if (!user) return;
    await UserService.editMember(user.charName, { ...user, ...details, ...form });
    onClose();
  };

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
            form={form}
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
