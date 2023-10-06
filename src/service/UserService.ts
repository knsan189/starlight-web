import axios from "axios";
import { IUser } from "../@types/types";
import { SERVER_URL } from "../utils/const";

export type AddUserRequest = Omit<IUser, "userCode">;

class UserService {
  public static addMember(user: AddUserRequest) {
    return new Promise<IUser>((resolve, reject) => {
      (async () => {
        try {
          const response = await axios({
            method: "post",
            url: `${SERVER_URL}/api/members`,
            data: { user },
          });
          resolve(response.data);
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
            url: `${SERVER_URL}/api/members`,
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
            url: `${SERVER_URL}/api/members`,
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

  public static deleteUser(userCode: number) {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const response = await axios({
            method: "delete",
            url: `${SERVER_URL}/api/members`,
            params: {
              userCode,
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
