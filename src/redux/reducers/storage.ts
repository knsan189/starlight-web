import { DeleteUser, EditUser } from "./../../@types/redux/storage.interface";
import {
  AddUser,
  SetSearchList,
  SetUsers,
  StorageAction,
  StorageActionTypes,
  StorageState,
} from "../../@types/redux/storage.interface";
import { IUser } from "../../@types/types";

const { ADD_USER, EDIT_USER, DELETE_USER, SET_USERS, SYNC_STORAGE, SET_SEARCH_LIST } =
  StorageActionTypes;

export const addUser = (user: Omit<IUser, "id">): AddUser => ({
  type: ADD_USER,
  payload: { user },
});

export const editUser = (charName: IUser["charName"], user: IUser): EditUser => ({
  type: EDIT_USER,
  payload: { charName, user },
});

export const deleteUser = (userCode: IUser["userCode"]): DeleteUser => ({
  type: DELETE_USER,
  payload: { userCode },
});

export const setUsers = (users: IUser[]): SetUsers => ({
  type: SET_USERS,
  payload: { users },
});

export const setSearchList = (searchList?: IUser[]): SetSearchList => ({
  type: SET_SEARCH_LIST,
  payload: { searchList },
});

export const syncStorage = () => ({
  type: SYNC_STORAGE,
  payload: {},
});

const initialState: StorageState = {
  users: [],
  searchList: undefined,
  status: "ok",
};

const StorageReducer = (state = initialState, action: StorageAction): StorageState => {
  switch (action.type) {
    case SET_USERS: {
      return { ...state, users: action.payload.users, status: "ok" };
    }
    case SET_SEARCH_LIST:
      return { ...state, searchList: action.payload.searchList };
    case ADD_USER:
    case EDIT_USER:
    case DELETE_USER:
    case SYNC_STORAGE: {
      return { ...state, status: "loading" };
    }
    default:
      return state;
  }
};

export default StorageReducer;
