import { AddParty, RemoveMember, RemoveParty } from "./../../@types/redux/party.interface";
import {
  PartyAction,
  PartyActionTypes,
  PartyState,
  SetParties,
} from "../../@types/redux/party.interface";
import { IUser } from "../../@types/types";
import { stat } from "fs";

function findTargetPartyAndIndex(user: IUser, party: IUser[][]) {
  for (let i = 0; i < party.length; i++) {
    for (let j = 0; i < party[i].length; j++) {
      if (party[i][j].charName === user.charName) {
        return { partyIndex: i, memberIndex: j };
      }
    }
  }
  return undefined;
}

const { SET_PARTIES, ADD_PARTY, REMOVE_MEMBER, REMOVE_PARTY } = PartyActionTypes;

export const setParties = (parties: IUser[][]): SetParties => ({
  type: SET_PARTIES,
  payload: { parties },
});

export const addParty = (): AddParty => ({
  type: ADD_PARTY,
  payload: {},
});

export const removeMember = (user: IUser): RemoveMember => ({
  type: REMOVE_MEMBER,
  payload: { user },
});

export const removeParty = (partyIndex: number): RemoveParty => ({
  type: REMOVE_PARTY,
  payload: { partyIndex },
});

const initialState: PartyState = {
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
    case REMOVE_MEMBER: {
      const target = findTargetPartyAndIndex(action.payload.user, state.parties);
      if (!target) return state;
      const { partyIndex, memberIndex } = target;
      const newParties = [...state.parties];
      newParties[partyIndex].splice(memberIndex, 1);
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
