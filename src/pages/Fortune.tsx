import { Container, TextField, Paper, Box, Typography } from "@mui/material";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import FortuneCard from "../components/FortuneCard";
import FortuneService from "../service/FortuneService";

const Fortune = () => {
  const [fortunes, setFortunes] = useState<Fortune[]>([]);
  const [active, toggleActive] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await FortuneService.getFortunes(0, 100);
      setFortunes(response);
    })();
  }, []);

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
      const { name, value } = event.target;
      setFortunes((prev) => {
        const newFortunes = [...prev];
        newFortunes[index] = { ...newFortunes[index], [name]: value };
        return newFortunes;
      });
    },
    [],
  );

  const onBlur = useCallback(
    async (fortune: Fortune) => {
      if (active) {
        await FortuneService.updateFortune(fortune);
      }
    },
    [active],
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    toggleActive(value === "qufqlcshdmf" || value === "별빛노을");
  };

  return (
    <Container maxWidth="md">
      <Paper>
        <Box p={2}>
          <TextField size="small" label="관리 비밀번호" type="password" onChange={handleChange} />
          <Box pl={1}>
            {active ? (
              <Typography variant="caption" color="secondary">
                운세 수정 가능
              </Typography>
            ) : (
              <Typography variant="caption" color="error">
                운세 수정 권한 없음
              </Typography>
            )}
          </Box>
        </Box>
      </Paper>
      {fortunes.map((fortune, index) => (
        <FortuneCard
          fortune={fortune}
          index={index}
          key={fortune.id}
          onChange={onChange}
          onBlur={onBlur}
        />
      ))}
    </Container>
  );
};

export default Fortune;
