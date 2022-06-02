import { setParties } from "./../reducers/party";
import { setUsers } from "./../reducers/storage";
import { all, call, fork, put, select, takeLatest } from "@redux-saga/core/effects";
import { StorageActionTypes } from "../../@types/redux/storage.interface";
import { IUser } from "../../@types/types";
import FirebaseService from "../../service/FireBaseService";

const { SYNC_STORAGE } = StorageActionTypes;

function* syncStorage() {
  try {
    const userList: IUser[] | null = yield call(FirebaseService.getUserList);
    const partyList: IUser[][] | null = yield call(FirebaseService.getPartyList);

    if (userList) yield put(setUsers(userList));
    if (partyList) yield put(setParties(partyList));
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
