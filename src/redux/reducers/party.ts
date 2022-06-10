import { AddParty, RemoveMember, RemoveParty, SetRaid } from "./../../@types/redux/party.interface";
import {
  PartyAction,
  PartyActionTypes,
  PartyState,
  SetParties,
} from "../../@types/redux/party.interface";
import { IUser, Member, Raid } from "../../@types/types";
import { stat } from "fs";

function findTargetPartyAndIndex(userName: IUser["charName"], parties: Member[][]) {
  let target: { partyIndex: number; memberIndex: number } | undefined;

  for (let i = 0; i < parties.length; i++) {
    for (let j = 0; j < parties[i].length; j++) {
      if (parties[i][j].userName === userName) {
        target = { partyIndex: i, memberIndex: j };
        break;
      }
    }
  }

  return target;
}

const { SET_PARTIES, SET_RAID, ADD_PARTY, REMOVE_MEMBER, REMOVE_PARTY } = PartyActionTypes;

export const setParties = (parties: Member[][]): SetParties => ({
  type: SET_PARTIES,
  payload: { parties },
});

export const setRaid = (raid: Raid): SetRaid => ({
  type: SET_RAID,
  payload: { raid },
});

export const addParty = (): AddParty => ({
  type: ADD_PARTY,
  payload: {},
});

export const removeMember = (userName: IUser["charName"]): RemoveMember => ({
  type: REMOVE_MEMBER,
  payload: { userName },
});

export const removeParty = (partyIndex: number): RemoveParty => ({
  type: REMOVE_PARTY,
  payload: { partyIndex },
});

const initialState: PartyState = {
  id: undefined,
  title: undefined,
  parties: [[]],
};

const PartyReducer = (state = initialState, action: PartyAction): PartyState => {
  switch (action.type) {
    case SET_PARTIES: {
      return { ...state, parties: action.payload.parties };
    }
    case ADD_PARTY: {
      return { ...state, parties: [...state.parties, []] };
    }
    case SET_RAID:
      return action.payload.raid;
    case REMOVE_MEMBER: {
      const target = findTargetPartyAndIndex(action.payload.userName, state.parties);
      if (!target) {
        return state;
      }
      const newParties = [...state.parties];
      newParties[target.partyIndex].splice(target.memberIndex, 1);
      return {
        ...state,
        parties: newParties,
      };
    }
    default:
      return state;
  }
};

export default PartyReducer;
