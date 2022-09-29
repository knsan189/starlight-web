import { IUser, Member } from "./../@types/types.d";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../redux/reducers";
import { setParties } from "../redux/reducers/party";
import { DropResult } from "@hello-pangea/dnd";

const getNewMember = (userName: IUser["charName"]): Member => {
  return {
    userName,
    id: Math.floor(Date.now() * Math.random()),
  };
};

const useDragDrop = () => {
  const { parties } = useSelector((state: RootState) => state.party);
  const { users } = useSelector((state: RootState) => state.storage);

  const dispatch = useDispatch();

  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { source, destination, type, draggableId } = result;

      if (!destination) {
        return;
      }

      if (type === "party") {
        return;
      }

      if (type === "user") {
        if (source.droppableId.includes("party")) {
          const newPartyList = [...parties];
          const sourcePartyIndex = parseInt(source.droppableId.replace(`party-`, ""), 10);
          const sourceUserIndex = source.index;
          const [target] = newPartyList[sourcePartyIndex].splice(sourceUserIndex, 1);
          if (destination.droppableId.includes("party")) {
            const targetPartyIndex = parseInt(destination.droppableId.replace(`party-`, ""), 10);
            const targetUserIndex = destination.index;
            newPartyList[targetPartyIndex].splice(targetUserIndex, 0, target);
          } else if (destination.droppableId === "storage") {
            // const newUserList = [...users];
            // newUserList.splice(destination.index, 0, target);
            // dispatch(setUsers(newUserList));
          }
          dispatch(setParties(newPartyList));
        } else if (source.droppableId === "storage") {
          const targetCode = parseInt(draggableId.replace("storage-", ""), 10);
          const target = users.find((user) => user.userCode === targetCode);

          if (!target) {
            return;
          }

          if (destination.droppableId === "storage") {
            // newUserList.splice(destination.index, 0, target);
            return;
          } else if (destination.droppableId.includes("party")) {
            const targetPartyIndex = parseInt(destination.droppableId.replace(`party-`, ""), 10);
            const targetUserIndex = destination.index;
            const newPartyList = [...parties];

            newPartyList[targetPartyIndex].splice(
              targetUserIndex,
              0,
              getNewMember(target.charName),
            );

            dispatch(setParties(newPartyList));
          }
        }
      }
    },
    [users, parties, dispatch],
  );

  return { onDragEnd };
};

export default useDragDrop;
