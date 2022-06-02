import { GetCharResponse } from "./../service/CharService";

export interface IUser extends GetCharResponse {
  memo?: string;
  id?: string;
  createdTime: Date | string;
}

export const TYPE_STORAGE = "storage";
export const TYPE_PARTY = "party";
export const TYPE_USER = "user";

export type DropType = TYPE_STORAGE | TYPE_PARTY | TYPE_USER;
