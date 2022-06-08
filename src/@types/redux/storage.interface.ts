import { IUser } from "../types";

export enum StorageActionTypes {
  ADD_USER = "ADD_USER",
  DELETE_USER = "DELETE_USER",
  SYNC_STORAGE = "SYNC_STORAGE",
  SET_USERS = "SET_USERS",
  SET_SEARCH_LIST = "SET_SEARCH_LIST",
}

export type StorageAction = AddUser | SyncStorage | SetUsers | SetSearchList;

export interface StorageState {
  users: IUser[];
  searchList?: IUser[];
  status: "ok" | "fail" | "loading";
}

export interface AddUser {
  type: StorageActionTypes.ADD_USER;
  payload: { user: IUser };
}

export interface SyncStorage {
  type: StorageActionTypes.SYNC_STORAGE;
  payload: { users: IUser[] };
}

export interface SetUsers {
  type: StorageActionTypes.SET_USERS;
  payload: { users: IUser[] };
}

export interface SetSearchList {
  type: StorageActionTypes.SET_SEARCH_LIST;
  payload: { searchList?: IUser[] };
}
