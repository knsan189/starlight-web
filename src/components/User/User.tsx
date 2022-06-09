import { MoreVert } from "@mui/icons-material";
import { Avatar, Card, CardHeader, IconButton, Chip, Box } from "@mui/material";
import React, { MouseEventHandler, useCallback, useState } from "react";
import { DropType, IUser, Member } from "../../@types/types";
import Draggable from "../Draggable";
import UserDialog from "./UserDialog";
import UserMenu from "./UserMenu";

interface Props {
  user: IUser;
  userIndex: number;
  member?: Member;
  type: DropType;
}

const matchImage = (text: string): string => {
  switch (text) {
    case "창술사":
      return "chang";
    case "인파이터":
      return "infight";
    case "배틀마스터":
      return "battle";
    case "스트라이커":
      return "strike";
    case "기공사":
      return "gigong";
    case "블레이드":
      return "blade";
    case "리퍼":
      return "reaper";
    case "호크아이":
      return "halk";
    case "스카우터":
      return "scout";
    case "소서리스":
      return "sorce";
    case "아르카나":
      return "alka";
    case "서머너":
      return "summon";
    case "바드":
      return "bard";
    case "도화가":
      return "dohwa";
    case "디스트로이어":
      return "destory";
    case "버서커":
      return "berser";
    case "워로드":
      return "warload";
    case "홀리나이트":
      return "holy";
    case "건슬링어":
    default:
      return "gun";
  }
};

const User = ({ user, userIndex, type, member }: Props) => {
  const [menu, toggleMenu] = useState<EventTarget>();
  const [dialog, toggleDialog] = useState(false);

  const { charName, charLevel, charClass, itemLevel, createdTime } = user;

  const onToggleMenu: MouseEventHandler<HTMLButtonElement> = useCallback((event) => {
    toggleMenu((prev) => (prev ? undefined : event.target));
  }, []);

  const onToggleDialog = useCallback(() => {
    toggleDialog((prev) => !prev);
  }, []);

  return (
    <Draggable
      index={userIndex}
      draggableId={`${type}-${member ? member.id : charName}`}
      type={type}
    >
      <Card>
        <CardHeader
          avatar={<Avatar src={`/images/${matchImage(charClass)}.png`}></Avatar>}
          title={`${charName}`}
          titleTypographyProps={{ variant: "subtitle2" }}
          subheader={`${itemLevel}, ${charClass}`}
          action={
            <IconButton onClick={onToggleMenu}>
              <MoreVert />
            </IconButton>
          }
        />
        <Box px={1} pb={2}>
          {user.tags?.map((tag, index) => (
            <Chip label={tag} sx={{ mr: 0.5 }} key={index} />
          ))}
        </Box>
        <UserMenu
          user={user}
          menu={menu}
          type={type}
          onClose={onToggleMenu}
          onToggleDialog={onToggleDialog}
        />
        <UserDialog open={dialog} onClose={onToggleDialog} mode="edit" user={user} />
      </Card>
    </Draggable>
  );
};

User.defaultProps = {
  member: undefined,
};

export default User;
