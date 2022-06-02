import { AddParty } from "./../../@types/redux/party.interface";
import {
  PartyAction,
  PartyActionTypes,
  PartyState,
  SetParties,
} from "../../@types/redux/party.interface";
import { IUser } from "../../@types/types";

const { SET_PARTIES, ADD_PARTY } = PartyActionTypes;

export const setParties = (parties: IUser[][]): SetParties => ({
  type: SET_PARTIES,
  payload: { parties },
});

export const addParty = (): AddParty => ({
  type: ADD_PARTY,
  payload: {},
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
    default:
      return state;
  }
};

export default PartyReducer;
