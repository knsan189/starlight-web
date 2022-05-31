export interface IUser {
  charLevel: number;
  charName: string;
  charClass: string;
}

export const TYPE_STORAGE = "storage";
export const TYPE_PARTY = "party";
export const TYPE_USER = "user";

export type DropType = TYPE_STORAGE | TYPE_PARTY | TYPE_USER;
