import { Sync } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Chip,
  Divider,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, ChangeEventHandler } from "react";
import { GetCharResponse } from "../../service/CharService";
import { getFormattedTime } from "../../utils/timeUtil";

interface Props {
  form: {
    tags: string[] | undefined;
    memo: string | undefined;
  };
  details?: GetCharResponse;
  editMode: boolean;
  onChange: (name: string, value: any) => void;
  onUpdate: () => void;
}

const UserDetails = ({ details, form, editMode, onChange, onUpdate }: Props) => {
  if (!details)
    return (
      <Box p={2} height={200}>
        <Typography variant="body2">검색결과가 없습니다</Typography>
      </Box>
    );

  const { serverName, charClass, itemLevel, guildName, charLevel, loadTime } = details;
  const { tags, memo } = form;

  const handleChangeMemo: ChangeEventHandler<HTMLInputElement> = (event) => {
    onChange("memo", event.target.value);
  };

  const handleChangeTag = (e: any, newValue: any) => {
    onChange("tags", newValue);
  };

  const fomattedTime = getFormattedTime(new Date(loadTime));

  return (
    <Box>
      <Box sx={{ bgcolor: (theme) => theme.palette.grey[100], p: 2 }}>
        {editMode && (
          <Box pb={1} display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="body2">정보 최신일 : {fomattedTime}</Typography>
            <IconButton size="small" onClick={onUpdate}>
              <Sync fontSize="small" />
            </IconButton>
          </Box>
        )}
        <Paper>
          <Box p={1} display="flex" justifyContent="space-between">
            <Typography variant="body2">서버</Typography>
            <Typography variant="body2">{serverName}</Typography>
          </Box>
          <Divider />
          <Box p={1} display="flex" justifyContent="space-between">
            <Typography variant="body2">직업</Typography>
            <Typography variant="body2">{charClass}</Typography>
          </Box>
          <Divider />
          <Box p={1} display="flex" justifyContent="space-between">
            <Typography variant="body2">아이템 레벨</Typography>
            <Typography variant="body2">{itemLevel}</Typography>
          </Box>
          <Divider />
          <Box p={1} display="flex" justifyContent="space-between">
            <Typography variant="body2">길드</Typography>
            <Typography variant="body2">{guildName}</Typography>
          </Box>
          <Divider />
          <Box p={1} display="flex" justifyContent="space-between">
            <Typography variant="body2">캐릭터 레벨</Typography>
            <Typography variant="body2">{charLevel}</Typography>
          </Box>
        </Paper>
      </Box>
      <Divider />
      <Box p={2}>
        <Box>
          <Typography gutterBottom variant="subtitle2">
            메모추가
          </Typography>
          <TextField
            fullWidth
            size="small"
            multiline
            onChange={handleChangeMemo}
            value={memo || ""}
          />
        </Box>

        <Box pt={1}>
          <Typography gutterBottom variant="subtitle2">
            태그추가
          </Typography>
          <Autocomplete
            freeSolo
            multiple
            size="small"
            options={[]}
            value={tags || []}
            onChange={handleChangeTag}
            renderInput={(params) => <TextField {...params} size="small" />}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => <Chip label={option} {...getTagProps({ index })} />)
            }
          />
        </Box>
      </Box>
    </Box>
  );
};

UserDetails.defaultProps = {
  details: undefined,
};

export default UserDetails;
