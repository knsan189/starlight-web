import { AnyAction, combineReducers, Reducer } from "redux";
import { RootStateInterface } from "../../@types/redux/rootState";
import PartyReducer from "./party";
import StorageReducer from "./storage";

const rootReducer: Reducer<RootStateInterface, AnyAction> = combineReducers<RootStateInterface>({
  storage: StorageReducer,
  party: PartyReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
