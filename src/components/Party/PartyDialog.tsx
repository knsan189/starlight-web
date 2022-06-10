import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { ChangeEventHandler, useState } from "react";
import { useDispatch } from "react-redux";
import { addRaid } from "../../redux/reducers/party";
import RaidService from "../../service/RaidService";

interface Props {
  open: boolean;
  onClose: () => void;
}

const PartyDialog = ({ open, onClose }: Props) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState<string>("");

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setTitle(event.target.value);
  };

  const handleSubmit = () => {
    dispatch(addRaid(title));
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>레이드 이름</DialogTitle>
      <DialogContent dividers>
        <DialogContentText>생성할 레이드 이름을 정해주세요. ex) 카양겔 노말</DialogContentText>
        <TextField
          onChange={handleChange}
          value={title}
          fullWidth
          margin="dense"
          variant="standard"
          autoFocus
          label="레이드 이름"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit}>완료</Button>
        <Button onClick={onClose}>취소</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PartyDialog;
