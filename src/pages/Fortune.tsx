import { Box, Container, Divider, Paper, styled, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import FortuneService from "../service/FortuneService";

const StyledBox = styled(Box)(({ theme }) => ({
  background: theme.palette.grey[100],
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
}));

const Fortune = () => {
  const [fortunes, setFortunes] = useState<Fortune[]>([]);
  useEffect(() => {
    (async () => {
      const response = await FortuneService.getFortunes(0, 100);
      setFortunes(response);
    })();
  }, []);
  return (
    <Container>
      {fortunes.map((fortune) => (
        <Paper key={fortune.id} sx={{ mb: 2, p: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            {fortune.id}번째 운세
          </Typography>
          <Divider />
          <StyledBox my={1}>
            <Typography variant="body2">{fortune.fortune}</Typography>
          </StyledBox>
          <StyledBox>
            <Typography variant="body2" sx={{ wordBreak: "break-all" }}>
              {fortune.msg}
            </Typography>
          </StyledBox>
        </Paper>
      ))}
    </Container>
  );
};

export default Fortune;
