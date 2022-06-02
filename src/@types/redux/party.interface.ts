import { IUser } from "../types";

export enum PartyActionTypes {
  SET_PARTIES = "SET_PARTIES",
}

export type PartyAction = SetParties;

export interface PartyState {
  parties: IUser[][];
}

export interface SetParties {
  type: PartyActionTypes.SET_PARTIES;
  payload: { parties: IUser[][] };
}
