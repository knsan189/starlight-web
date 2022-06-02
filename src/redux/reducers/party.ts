import {
  PartyAction,
  PartyActionTypes,
  PartyState,
  SetParties,
} from "../../@types/redux/party.interface";
import { IUser } from "../../@types/types";

const { SET_PARTIES } = PartyActionTypes;

export const setParties = (parties: IUser[][]): SetParties => ({
  type: SET_PARTIES,
  payload: { parties },
});

const initialState: PartyState = {
  parties: [[]],
};

const PartyReducer = (state = initialState, action: PartyAction): PartyState => {
  switch (action.type) {
    case SET_PARTIES: {
      return { ...state, parties: action.payload.parties };
    }
    default:
      return state;
  }
};

export default PartyReducer;
