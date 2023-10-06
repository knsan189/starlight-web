export interface IUser {
  userCode: number;
  createdTime?: Date | string;
  tags: string[];
  memo: string;
  serverName: string;
  charName: string;
  charClass: string;
  charLevel: number;
  itemLevel: number;
  guildName: string;
  loadTime: string;
}

export const TYPE_STORAGE = "storage";
export const TYPE_PARTY = "party";
export const TYPE_USER = "user";

export type DropType = TYPE_STORAGE | TYPE_PARTY | TYPE_USER;

export interface Member {
  userName: IUser["charName"];
  id: number;
}

export interface Raid {
  id: number;
  title: string;
  parties: Member[][];
}

export type RaidList = Omit<Raid, "parties">[];
