import { all, fork } from "@redux-saga/core/effects";
import StorageSaga from "./storage";

function* rootSaga() {
  yield all([fork(StorageSaga)]);
}

export default rootSaga;
