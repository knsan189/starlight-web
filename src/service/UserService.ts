import axios from "axios";
import { IUser } from "../@types/types";

const url = process.env.NODE_ENV === "development" ? "http://localhost:8001" : "";

class UserService {
  public static addMember(user: IUser): Promise<string> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          await axios({
            method: "post",
            url: `${url}/api/members`,
            data: { user },
          });
          resolve("success");
        } catch (err) {
          reject(err);
        }
      })();
    });
  }

  public static getMembers() {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const response = await axios({
            method: "get",
            url: `${url}/api/members`,
          });
          resolve(response.data);
        } catch (err) {
          reject(err);
        }
      })();
    });
  }

  public static editMember(charName: string, user: IUser) {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const response = await axios({
            method: "put",
            url: `${url}/api/members`,
            params: {
              charName,
              user,
            },
          });
          resolve(response.data);
        } catch (err) {
          reject(err);
        }
      })();
    });
  }
}

export default UserService;
