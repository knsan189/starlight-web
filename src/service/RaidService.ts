import axios, { AxiosResponse } from "axios";
import { Raid, RaidList } from "../@types/types";
import { SERVER_URL } from "../utils/const";

class RaidService {
  public static getRaid(id: number): Promise<Raid> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const response: AxiosResponse<Raid> = await axios({
            method: "get",
            url: `${SERVER_URL}/api/raid`,
            params: {
              id,
            },
          });
          resolve(response.data);
        } catch (err) {
          reject(err);
        }
      })();
    });
  }

  public static getRaidList(): Promise<RaidList> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const response: AxiosResponse<RaidList> = await axios({
            method: "get",
            url: `${SERVER_URL}/api/raid/list`,
          });
          resolve(response.data);
        } catch (err) {
          reject(err);
        }
      })();
    });
  }

  public static addRaid(title: string): Promise<Raid> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const response: AxiosResponse<Raid> = await axios({
            method: "post",
            url: `${SERVER_URL}/api/raid`,
            data: {
              title,
            },
          });
          resolve(response.data);
        } catch (err) {
          reject(err);
        }
      })();
    });
  }

  public static editRaid(id: number, raid: Raid) {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const response: AxiosResponse<string> = await axios({
            method: "put",
            url: `${SERVER_URL}/api/raid`,
            data: {
              id,
              raid,
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

export default RaidService;
