import axios, { AxiosResponse } from "axios";
import * as cheerio from "cheerio";

export interface GetCharResponse {
  itemLevel: number;
  charLevel: string;
  charClass: string;
  charName: string;
  serverName: string;
  guildName?: string;
  loadTime: string | Date;
}

//profile-character-info__server
//game-info__guild

class CharService {
  public static async getChar(nickname: string): Promise<GetCharResponse | null> {
    try {
      const response: AxiosResponse<string> = await axios({
        method: "GET",
        url: `/char/${nickname}`,
      });

      const parseHtml = response.data.replace("<!DOCTYPE html>", "").replace(/\r?\n|\r/g, "");

      const $ = cheerio.load(parseHtml);

      const charClass = $(".profile-character-info__img").attr("alt") as string;

      const itemLevel = $(".level-info2__expedition")
        .text()
        .replace("장착 아이템 레벨Lv.", "")
        .replace(",", "");

      const charLevel = $(".level-info__item")
        .text()
        .replace(/[^0-9]/g, "");

      const serverName = $(".profile-character-info__server").text().replace("@", "");

      const guildName = $(".game-info__guild").text().substring(2);

      const loadTime = new Date();

      return {
        charClass,
        itemLevel: parseFloat(itemLevel),
        charLevel,
        charName: nickname,
        serverName,
        guildName,
        loadTime,
      };
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}

export default CharService;
