import { Avatar, Box, Container, Paper, Typography, TextField } from "@mui/material";
import React, { useEffect, useState, useRef, FormEvent, ChangeEvent } from "react";
// import { socket } from "../utils/socket";

interface Message {
  msg: string;
  sender: string;
  date: string;
  imageDB: string;
}

const Chat = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [messages] = useState<Message[]>([]);

  useEffect(() => {
    // if (!socket.hasListeners("server-message")) {
    //   socket.on("server-message", (args: Message) => {
    //     console.log(args);
    //     setMessages((prev) => [...prev, args]);
    //   });
    // }
    // return () => {
    //   if (socket.hasListeners("server-message")) {
    //     socket.off("server-message");
    //   }
    // };
  }, []);

  useEffect(() => {
    window.scrollTo({ behavior: "smooth", top: containerRef.current?.scrollHeight });
  }, [messages]);

  const [value, setValue] = useState("");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // socket.emit("client-message", value, "chat");
    setValue("");
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => setValue(event.target.value);

  return (
    <>
      <Container
        sx={{ background: "#BACEE0", p: 2, minHeight: "100vh", position: "relative" }}
        ref={containerRef}
      >
        {messages.map((msg, index) => (
          <Paper key={index} sx={{ display: "flex", p: 1, my: 1, maxWidth: "80%" }}>
            <Avatar variant="rounded" src={msg.imageDB} />
            <Box pl={2}>
              <Box display="flex" alignItems="end">
                <Typography variant="subtitle2"> {msg.sender}</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ pl: 1 }}>
                  {new Date(msg.date).toLocaleTimeString()}
                </Typography>
              </Box>
              <Typography variant="body2" component="pre">
                {msg.msg}
              </Typography>
            </Box>
          </Paper>
        ))}
        <Box height={50} />
        <Box position="fixed" width="100%" bottom={0} left={0}>
          <Paper square>
            <Box p={1} component="form" onSubmit={onSubmit}>
              <TextField fullWidth size="small" value={value} onChange={onChange} />
            </Box>
          </Paper>
        </Box>
      </Container>
    </>
  );
};

export default Chat;
