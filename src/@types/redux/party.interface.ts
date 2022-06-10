import { IUser, Member, Raid } from "../types";

export enum PartyActionTypes {
  SET_RAID = "SET_RAID",
  SET_PARTIES = "SET_PARTIES",
  ADD_PARTY = "ADD_PARTY",
  REMOVE_MEMBER = "REMOVE_MEMBER",
  REMOVE_PARTY = "REMOVE_PARTY",
}

export type PartyAction = SetParties | SetRaid | AddParty | RemoveMember | RemoveParty;

export interface PartyState {
  id?: number;
  title?: string;
  parties: Member[][];
}

export interface SetParties {
  type: PartyActionTypes.SET_PARTIES;
  payload: { parties: Member[][] };
}

export interface AddParty {
  type: PartyActionTypes.ADD_PARTY;
  payload: {};
}

export interface RemoveMember {
  type: PartyActionTypes.REMOVE_MEMBER;
  payload: { userName: IUser["charName"] };
}
export interface RemoveParty {
  type: PartyActionTypes.REMOVE_PARTY;
  payload: { partyIndex: number };
}

export interface SetRaid {
  type: PartyActionTypes.SET_RAID;
  payload: { raid: Raid };
}
