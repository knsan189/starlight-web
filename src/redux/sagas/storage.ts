import { all, call, fork, put, select, takeLatest } from "@redux-saga/core/effects";
import { StorageActionTypes, SyncStorage } from "../../@types/redux/storage.interface";

const { SYNC_STORAGE } = StorageActionTypes;

function* syncStorage({ payload }: SyncStorage) {}

function* syncStorageWatcher() {
  yield takeLatest(SYNC_STORAGE, syncStorage);
}

export default function* StorageSaga() {
  yield all([fork(syncStorageWatcher)]);
}
