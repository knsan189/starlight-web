import { PartyState } from "./party.interface";
import { StorageState } from "./storage.interface";

export interface RootStateInterface {
  storage: StorageState;
  party: PartyState;
}
