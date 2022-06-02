import { Search } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  InputBase,
  Typography,
} from "@mui/material";
import { debounce } from "lodash";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/reducers/storage";
import CharService, { GetCharResponse } from "../service/CharService";

interface Props {
  open: boolean;
  onClose: () => void;
}

const UserDialog = ({ open, onClose }: Props) => {
  const [details, setDetails] = useState<GetCharResponse>();
  const dispatch = useDispatch();

  const getCharInfo = debounce(async (name) => {
    const response = await CharService.getChar(name);
    if (response) {
      console.log(response);
      setDetails(response);
    }
  }, 1000);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value } = event.target;
    getCharInfo(value);
  };

  const handleClickAdd = () => {
    if (details) {
      dispatch(addUser(details));
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <Box p={2} display="flex" alignItems="center" sx={{ minWidth: 500 }}>
        <Typography color="primary" sx={{ lineHeight: 0, mr: 1 }}>
          <Search />
        </Typography>
        <InputBase fullWidth placeholder="닉네임 검색하기" onChange={handleChange} />
      </Box>
      <DialogContent dividers>
        {details ? (
          <Box>
            <Typography>{details.charClass}</Typography>
            <Typography>{details.charLevel}</Typography>
            <Typography>{details.itemLevel}</Typography>
          </Box>
        ) : (
          <Typography variant="body2">검색결과가 없습니다</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClickAdd}>추가</Button>
        <Button onClick={onClose}>취소</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserDialog;
