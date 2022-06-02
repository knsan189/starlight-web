import { initializeApp } from "firebase/app";
import { collection, doc, getDoc, getDocs, getFirestore, updateDoc } from "firebase/firestore";
import { IUser } from "../@types/types";

const {
  REACT_APP_FIREBASE_API_KEY,
  REACT_APP_FIREBASE_AUTH_DOMAIN,
  REACT_APP_FIREBASE_PROJECT_ID,
  REACT_APP_FIREBASE_STORAGE_BUCKET,
  REACT_APP_FIREBASE_SENDER_ID,
  REACT_APP_FIREBASE_APP_ID,
  REACT_APP_FIREBASE_MEASUREMENT_ID,
} = process.env;

const firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_API_KEY,
  authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_FIREBASE_SENDER_ID,
  appId: REACT_APP_FIREBASE_APP_ID,
  measurementId: REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const userListRef = doc(db, "storage", "userList");
const partyListRef = doc(db, "storage", "partyList");

class FirebaseService {
  public static async getUserList(): Promise<IUser[] | null> {
    try {
      const response = (await getDoc(userListRef)).data();

      if (!response) {
        throw new Error("error");
      }

      return response.userList;
    } catch (error) {
      return null;
    }
  }

  public static async setUserList(userList: IUser[]) {
    try {
      await updateDoc(userListRef, { userList });
    } catch (err) {}
  }

  public static async getPartyList(): Promise<IUser[][] | null> {
    try {
      const response = (await getDoc(partyListRef)).data();

      if (!response) {
        throw new Error("error");
      }

      const result = JSON.parse(response.partyList);

      if (!Array.isArray(result)) {
        throw new Error("error");
      }

      return result;
    } catch (error) {
      return null;
    }
  }

  public static async setPartyList(partyList: IUser[][]) {
    try {
      const string = JSON.stringify(partyList);
      await updateDoc(partyListRef, { partyList: string });
    } catch (err) {}
  }
}

export default FirebaseService;
