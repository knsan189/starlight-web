import React, { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import { setRaid } from "../../redux/reducers/party";
import RaidService from "../../service/RaidService";
import Droppable from "../Droppable";
import Party from "./Party";

interface Props {
  id: number;
}

const PartyList = ({ id }: Props) => {
  const dispatch = useDispatch();
  const { parties } = useSelector((state: RootState) => state.party);

  const getRaid = useCallback(async () => {
    const response = await RaidService.getRaid(id);

    if (response) {
      dispatch(setRaid(response));
    }
  }, [id, dispatch]);

  useEffect(() => {
    getRaid();
  }, [getRaid]);

  return (
    <Droppable droppableId="party" type="party" direction="vertical">
      {parties.map((party, index) => (
        <Party key={index} party={party} partyIndex={index} />
      ))}
    </Droppable>
  );
};

export default PartyList;
