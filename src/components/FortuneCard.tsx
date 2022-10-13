import React, { ChangeEvent } from "react";
import { Box, Paper, styled, Typography, InputBase } from "@mui/material";

const StyledBox = styled(Box)(({ theme }) => ({
  background: theme.palette.grey[100],
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
}));

const StyledInput = styled(InputBase)(({ theme }) => ({
  fontSize: theme.typography.body2.fontSize,
}));

interface Props {
  index: number;
  fortune: Fortune;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => void;
  onBlur: (fortune: Fortune) => void;
}

const FortuneCard = ({ index, fortune, onChange, onBlur }: Props) => {
  return (
    <Paper key={fortune.id} sx={{ my: 2, p: 2 }}>
      <Typography variant="subtitle1" gutterBottom>
        {fortune.id}번째 운세
      </Typography>
      <StyledBox mt={2} mb={1}>
        <StyledInput
          name="fortune"
          value={fortune.fortune || undefined}
          fullWidth
          onChange={(event) => onChange(event, index)}
          onBlur={() => onBlur(fortune)}
        />
      </StyledBox>
      <StyledBox>
        <StyledInput
          name="msg"
          value={fortune.msg || undefined}
          fullWidth
          multiline
          onChange={(event) => onChange(event, index)}
          onBlur={() => onBlur(fortune)}
        />
      </StyledBox>
    </Paper>
  );
};

export default React.memo(FortuneCard);
