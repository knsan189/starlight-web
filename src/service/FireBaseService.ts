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

type PartyList = IUser[][];

export const KOKOU = "kokou";
export const KAYANG = "kayang";
export const ABREL = "abrel";

export type PartyTypes = "kokou" | "kayang" | "abrel";

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

  public static setUserList(userList: IUser[]) {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          await updateDoc(userListRef, { userList });
          resolve("success");
        } catch (err) {
          reject(err);
        }
      })();
    });
  }

  public static async getPartyList(type: PartyTypes): Promise<PartyList | null> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const ref = doc(db, "party", type);
          const response = (await getDoc(ref)).data();

          if (!response?.list) {
            resolve(null);
            return;
          }

          const result = JSON.parse(response.list);

          if (!Array.isArray(result)) {
            throw new Error("error");
          }

          resolve(result);
        } catch (err) {
          reject(err);
        }
      })();
    });
  }

  public static async setPartyList(partyList: PartyList, type: PartyTypes) {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const ref = doc(db, "party", type);
          const string = JSON.stringify(partyList);
          await updateDoc(ref, { list: string });
          resolve("success");
        } catch (err) {
          reject(err);
        }
      })();
    });
  }
}

export default FirebaseService;
