import React, { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import { setParties } from "../../redux/reducers/party";
import FirebaseService, { PartyTypes } from "../../service/FireBaseService";
import Droppable from "../Droppable";
import Party from "./Party";

interface Props {
  type: PartyTypes;
}

const PartyList = ({ type }: Props) => {
  const dispatch = useDispatch();

  const { parties } = useSelector((state: RootState) => state.party);

  const getPartyList = useCallback(async () => {
    const list = await FirebaseService.getPartyList(type);

    if (!list) {
      dispatch(setParties([[]]));
      return;
    }

    dispatch(setParties(list));
  }, [dispatch, type]);

  useEffect(() => {
    getPartyList();
  }, [getPartyList]);

  return (
    <Droppable droppableId="party" type="party" direction="vertical">
      {parties.map((party, index) => (
        <Party key={index} party={party} partyIndex={index} />
      ))}
    </Droppable>
  );
};

export default PartyList;
