import { initializeApp } from "firebase/app";
import { collection, doc, getDoc, getDocs, getFirestore, updateDoc } from "firebase/firestore";
import { IUser } from "../@types/types";

const firebaseConfig = {
  apiKey: "AIzaSyAM0NRUM67CYIUswZfCf9fJ45ki2DsbGR0",
  authDomain: "starlight-86322.firebaseapp.com",
  projectId: "starlight-86322",
  storageBucket: "starlight-86322.appspot.com",
  messagingSenderId: "55249082470",
  appId: "1:55249082470:web:f727177da66070e0f675a7",
  measurementId: "G-GR7NH00KGE",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const userListRef = doc(db, "storage", "userList");

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
}

export default FirebaseService;
