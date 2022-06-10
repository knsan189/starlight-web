import axios, { AxiosResponse } from "axios";
import { Raid, RaidList } from "../@types/types";

const url = process.env.NODE_ENV === "development" ? "http://localhost:8001" : "";

class RaidService {
  public static getRaid(id: number): Promise<Raid> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const response: AxiosResponse<Raid> = await axios({
            method: "get",
            url: `${url}/api/raid`,
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
            url: `${url}/api/raidList`,
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
            url: `${url}/api/raid`,
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
