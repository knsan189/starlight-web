import { all, fork } from "@redux-saga/core/effects";
import RaidSaga from "./raid";
import StorageSaga from "./storage";

function* rootSaga() {
  yield all([fork(StorageSaga), fork(RaidSaga)]);
}

export default rootSaga;
