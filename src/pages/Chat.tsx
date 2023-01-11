import { Avatar, Box, Container, Paper, Typography } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { socket } from "../utils/socket";

interface Message {
  msg: string;
  sender: string;
  date: string;
}

const Chat = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket.connect();
    if (!socket.hasListeners("message")) {
      socket.on("message", (args: Message) => {
        setMessages((prev) => [...prev, args]);
      });
    }

    return () => {
      socket.disconnect();
      if (socket.hasListeners("message")) {
        socket.off("message");
      }
    };
  }, []);

  useEffect(() => {
    window.scrollTo({ behavior: "smooth", top: containerRef.current?.scrollHeight });
  }, [messages]);

  return (
    <Container sx={{ background: "#BACEE0", p: 2 }} ref={containerRef}>
      {messages.map((msg, index) => (
        <Paper key={index} sx={{ display: "flex", p: 1, my: 1 }}>
          <Avatar variant="rounded" />
          <Box pl={2}>
            <Box display="flex" alignItems="end">
              <Typography variant="subtitle2"> {msg.sender}</Typography>
              <Typography variant="caption" color="text.secondary" sx={{ pl: 1 }}>
                {new Date(msg.date).toLocaleTimeString()}
              </Typography>
            </Box>
            <Typography variant="body2"> {msg.msg}</Typography>
          </Box>
        </Paper>
      ))}
    </Container>
  );
};

export default Chat;
