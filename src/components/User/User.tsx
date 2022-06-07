import { MoreVert } from "@mui/icons-material";
import { Avatar, Card, CardContent, CardHeader, IconButton, Typography } from "@mui/material";
import React from "react";
import { DropType, IUser } from "../../@types/types";
import Draggable from "../Draggable";

interface Props {
  user: IUser;
  userIndex: number;
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

const User = ({ user, userIndex, type }: Props) => {
  const { charName, charLevel, charClass, itemLevel, createdTime } = user;

  return (
    <Draggable index={userIndex} draggableId={`${type}-${charName}`} type={type}>
      <Card>
        <CardHeader
          avatar={<Avatar src={`/images/${matchImage(charClass)}.png`}></Avatar>}
          title={`${charName}`}
          titleTypographyProps={{ variant: "subtitle2" }}
          subheader={`${itemLevel}, ${charClass}`}
          action={
            <IconButton>
              <MoreVert />
            </IconButton>
          }
        />
        {/* <CardContent>
          <Typography variant="subtitle2">
            {charName} / {charClass}
          </Typography>
          <Typography variant="body2">{itemLevel}</Typography>
        </CardContent> */}
      </Card>
    </Draggable>
  );
};

export default User;
