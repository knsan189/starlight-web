import { DeleteUser } from "./../../@types/redux/storage.interface";
import { RootState } from "./../reducers/index";
import { setUsers } from "./../reducers/storage";
import { all, call, fork, put, select, takeLatest } from "@redux-saga/core/effects";
import {
  AddUser,
  EditUser,
  StorageActionTypes,
  StorageState,
} from "../../@types/redux/storage.interface";
import { IUser } from "../../@types/types";
import UserService from "../../service/UserService";

const { SYNC_STORAGE, ADD_USER, EDIT_USER, DELETE_USER } = StorageActionTypes;

function* syncStorage() {
  try {
    const members: IUser[] = yield call(UserService.getMembers);
    yield put(setUsers(members));
  } catch (error) {
    console.log(error);
  }
}

function* addUser({ payload }: AddUser) {
  try {
    const { user } = payload;
    const { users }: StorageState = yield select((state: RootState) => state.storage);
    const response: IUser = yield call(UserService.addMember, user);
    yield put(setUsers([response, ...users]));
  } catch (error) {
    console.log(error);
    yield;
  }
}

function* editUser({ payload }: EditUser) {
  try {
    const { charName, user } = payload;
    yield call(UserService.editMember, charName, user);

    const { users }: StorageState = yield select((state: RootState) => state.storage);
    const newUsers = [...users];
    const targetIndex = newUsers.findIndex((u) => u.charName === charName);
    newUsers[targetIndex] = user;

    yield put(setUsers(newUsers));
  } catch (error) {
    yield;
  }
}

function* deleteUser({ payload }: DeleteUser) {
  try {
    yield call(UserService.deleteUser, payload.userCode);
    const { users }: StorageState = yield select((state: RootState) => state.storage);
    const newUsers = users.filter((user) => user.userCode !== payload.userCode);
    yield put(setUsers(newUsers));
  } catch (error) {
    yield;
  }
}

function* syncStorageWatcher() {
  yield takeLatest(SYNC_STORAGE, syncStorage);
}

function* addUserWatcher() {
  yield takeLatest(ADD_USER, addUser);
}

function* editUserWatcher() {
  yield takeLatest(EDIT_USER, editUser);
}

function* deleteUserWatcher() {
  yield takeLatest(DELETE_USER, deleteUser);
}

export default function* StorageSaga() {
  yield all([
    fork(syncStorageWatcher),
    fork(addUserWatcher),
    fork(editUserWatcher),
    fork(deleteUserWatcher),
  ]);
}
