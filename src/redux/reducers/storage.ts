import {
  AddUser,
  SetUsers,
  StorageAction,
  StorageActionTypes,
  StorageState,
} from "../../@types/redux/storage.interface";
import { IUser } from "../../@types/types";

const { ADD_USER, SET_USERS, SYNC_STORAGE } = StorageActionTypes;

export const addUser = (user: IUser): AddUser => ({
  type: ADD_USER,
  payload: { user },
});

export const setUsers = (users: IUser[]): SetUsers => ({
  type: SET_USERS,
  payload: { users },
});

export const syncStorage = () => ({
  type: SYNC_STORAGE,
  payload: {},
});

const initialState: StorageState = {
  users: [],
  status: "ok",
};

const StorageReducer = (state = initialState, action: StorageAction): StorageState => {
  switch (action.type) {
    case ADD_USER: {
      return { ...state, users: [...state.users, action.payload.user] };
    }
    case SET_USERS: {
      return { ...state, users: action.payload.users };
    }
    case SYNC_STORAGE: {
      return { ...state, status: "loading" };
    }
    default:
      return state;
  }
};

export default StorageReducer;
