import { Search } from "@mui/icons-material";
import {
  Box,
  Button,
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
      setDetails(response);
    }
  }, 1000);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value } = event.target;
    getCharInfo(value);
  };

  const handleClickAdd = () => {
    if (details) {
      dispatch(addUser({ ...details, createdTime: new Date() }));
      onClose();
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
      <DialogContent dividers sx={{ p: 0 }}>
        {details ? (
          <Box>
            <Box sx={{ bgcolor: (theme) => theme.palette.grey[100], p: 2 }}>
              <Paper>
                <Box p={1} display="flex" justifyContent="space-between">
                  <Typography variant="body2">서버</Typography>
                  <Typography variant="body2">{details.serverName}</Typography>
                </Box>
                <Divider />
                <Box p={1} display="flex" justifyContent="space-between">
                  <Typography variant="body2">직업</Typography>
                  <Typography variant="body2">{details.charClass}</Typography>
                </Box>
                <Divider />
                <Box p={1} display="flex" justifyContent="space-between">
                  <Typography variant="body2">아이템 레벨</Typography>
                  <Typography variant="body2">{details.itemLevel}</Typography>
                </Box>
                <Divider />
                <Box p={1} display="flex" justifyContent="space-between">
                  <Typography variant="body2">길드</Typography>
                  <Typography variant="body2">{details.guildName}</Typography>
                </Box>
                <Divider />
                <Box p={1} display="flex" justifyContent="space-between">
                  <Typography variant="body2">캐릭터 레벨</Typography>
                  <Typography variant="body2">{details.charLevel}</Typography>
                </Box>
              </Paper>
            </Box>
            <Divider />
            <Box p={2}>
              <Typography gutterBottom variant="body2">
                메모추가
              </Typography>
              <TextField fullWidth size="small" multiline />
            </Box>
          </Box>
        ) : (
          <Box height={130} p={2}>
            <Typography variant="body2">검색결과가 없습니다</Typography>
          </Box>
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
