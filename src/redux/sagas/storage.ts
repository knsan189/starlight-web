import { setUsers } from "./../reducers/storage";
import { all, call, fork, put, select, takeLatest } from "@redux-saga/core/effects";
import { StorageActionTypes } from "../../@types/redux/storage.interface";
import { IUser } from "../../@types/types";
import FirebaseService from "../../service/FireBaseService";

const { SYNC_STORAGE } = StorageActionTypes;

function* syncStorage() {
  try {
    const userList: IUser[] = yield call(FirebaseService.getUserList);
    yield put(setUsers(userList));
  } catch (error) {
    console.log(error);
  }
}

function* syncStorageWatcher() {
  yield takeLatest(SYNC_STORAGE, syncStorage);
}

export default function* StorageSaga() {
  yield all([fork(syncStorageWatcher)]);
}
