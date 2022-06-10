import { IUser, Member, Raid, RaidList } from "../types";

export enum PartyActionTypes {
  SET_RAID = "SET_RAID",
  SET_RAID_LIST = "SET_RAID_LIST",
  SET_PARTIES = "SET_PARTIES",
  ADD_PARTY = "ADD_PARTY",
  ADD_RAID = "ADD_RAID",
  REMOVE_MEMBER = "REMOVE_MEMBER",
  REMOVE_PARTY = "REMOVE_PARTY",
  REMOVE_RAID = "REMOVE_RAID",
}

export type PartyAction =
  | SetParties
  | SetRaid
  | SetRaidList
  | AddParty
  | AddRaid
  | RemoveRaid
  | RemoveMember
  | RemoveParty;

export interface PartyState {
  id?: number;
  title?: string;
  parties: Member[][];
  raidList?: RaidList;
  status: "ok" | "loading" | "error";
}

export interface SetParties {
  type: PartyActionTypes.SET_PARTIES;
  payload: { parties: Member[][] };
}

export interface AddParty {
  type: PartyActionTypes.ADD_PARTY;
  payload: {};
}

export interface AddRaid {
  type: PartyActionTypes.ADD_RAID;
  payload: { title: string };
}

export interface RemoveRaid {
  type: PartyActionTypes.REMOVE_RAID;
  payload: { id: number };
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

export interface SetRaidList {
  type: PartyActionTypes.SET_RAID_LIST;
  payload: { raidList: RaidList };
}
