import { RootState } from "./../reducers/index";
import { setUsers } from "./../reducers/storage";
import { all, call, fork, put, select, takeLatest } from "@redux-saga/core/effects";
import { AddUser, StorageActionTypes, StorageState } from "../../@types/redux/storage.interface";
import { IUser } from "../../@types/types";
import UserService from "../../service/UserService";

const { SYNC_STORAGE, ADD_USER } = StorageActionTypes;

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
    yield call(UserService.addMember, user);

    yield put(setUsers([...users, user]));
  } catch (error) {
    console.log(error);
    yield;
  }
}

function* syncStorageWatcher() {
  yield takeLatest(SYNC_STORAGE, syncStorage);
}

function* addUserWatcher() {
  yield takeLatest(ADD_USER, addUser);
}

export default function* StorageSaga() {
  yield all([fork(syncStorageWatcher), fork(addUserWatcher)]);
}
