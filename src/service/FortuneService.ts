import axios from "axios";
import { SERVER_URL } from "../utils/const";

export default class FortuneService {
  public static getFortunes(page: number, size: number): Promise<Fortune[]> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const response = await axios({
            method: "get",
            url: `${SERVER_URL}/api/fortune`,
            params: {
              page,
              size,
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
