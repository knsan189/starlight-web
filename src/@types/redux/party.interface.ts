import { IUser } from "../types";

export enum PartyActionTypes {
  SET_PARTIES = "SET_PARTIES",
  ADD_PARTY = "ADD_PARTY",
}

export type PartyAction = SetParties | AddParty;

export interface PartyState {
  parties: IUser[][];
}

export interface SetParties {
  type: PartyActionTypes.SET_PARTIES;
  payload: { parties: IUser[][] };
}

export interface AddParty {
  type: PartyActionTypes.ADD_PARTY;
  payload: {};
}
