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
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/reducers/storage";
import CharService, { GetCharResponse } from "../../service/CharService";
import UserDetails from "./UserDetails";

interface Props {
  open: boolean;
  onClose: () => void;
}

const UserDialog = ({ open, onClose }: Props) => {
  const [details, setDetails] = useState<GetCharResponse>();
  const [loading, toggleLoading] = useState(false);
  const dispatch = useDispatch();

  const getCharInfo = debounce(async (name) => {
    const response = await CharService.getChar(name);
    if (!response) {
      setDetails(undefined);
      return;
    }
    setDetails(response);
    toggleLoading(false);
  }, 800);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    toggleLoading(true);
    const { value } = event.target;
    getCharInfo(value);
  };

  const handleClickAdd = () => {
    if (details) {
      dispatch(addUser({ ...details, createdTime: new Date().toISOString() }));
    }
    handleClose();
  };

  const handleClose = () => {
    onClose();
    setDetails(undefined);
  };

  return (
    <Dialog open={open} onClose={onClose} closeAfterTransition>
      <Box p={2} display="flex" alignItems="center" sx={{ minWidth: 500 }}>
        <Typography color="primary" sx={{ lineHeight: 0, mr: 1 }}>
          <Search />
        </Typography>
        <InputBase fullWidth placeholder="닉네임 검색하기" onChange={handleChange} />
      </Box>
      <DialogContent dividers sx={{ p: 0 }}>
        {!loading ? (
          <UserDetails details={details} />
        ) : (
          <Box height={200} display="flex" justifyContent="center" alignItems="center">
            <CircularProgress />
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClickAdd}>추가</Button>
        <Button onClick={handleClose}>취소</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserDialog;
