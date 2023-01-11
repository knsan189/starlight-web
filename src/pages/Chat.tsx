import { Avatar, Box, Container, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { socket } from "../utils/socket";

interface Message {
  msg: string;
  sender: string;
  date: string;
}

const Chat = () => {
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
    };
  }, []);

  return (
    <div>
      <Container>
        <Paper>
          {messages.map((msg) => (
            <Box key={msg.date} display="flex" p={1}>
              <Avatar />
              <Box pl={2}>
                <Typography variant="subtitle2"> {msg.sender}</Typography>
                <Typography variant="body2"> {msg.msg}</Typography>
              </Box>
            </Box>
          ))}
        </Paper>
      </Container>
    </div>
  );
};

export default Chat;
