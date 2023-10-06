import axios, { AxiosResponse } from "axios";
import { SERVER_URL } from "../utils/const";

interface Profile {
  CharacterImage: string;
  ExpeditionLevel: number;
  PvpGradeName: string;
  TownLevel: number | null;
  TownName: string | null;
  Title: string;
  GuildMemberGrade: string;
  GuildName: string;
  UsingSkillPoint: number;
  TotalSkillPoint: number;
  Stats: [
    {
      Type: string;
      Value: string;
      Tooltip: string[];
    },
  ];
  Tendencies: [
    {
      Type: string;
      Point: number;
      MaxPoint: number;
    },
  ];
  ServerName: string;
  CharacterName: string;
  CharacterLevel: number;
  CharacterClassName: string;
  ItemAvgLevel: string;
  ItemMaxLevel: string;
}

interface Equipment {
  Type: string;
  Name: string;
  Icon: string;
  Grade: string;
  Tooltip: string;
}

interface Effect {
  Name: string;
  Description: string;
}

interface Engraving {
  Slot: number;
  Name: string;
  Icon: string;
  Tooltip: string;
}

interface Gem {
  Slot: number;
  Name: string;
  Icon: string;
  Level: number;
  Grade: string;
  Tooltip: string;
}

interface Card {
  Slot: number;
  Name: string;
  Icon: string;
  AwakeCount: string;
  AwakeTotal: string;
  Grade: string;
  Tooltip: string;
}

export interface GetCharResponse {
  profile: Profile | null;
  equipment: Equipment[] | null;
  engravings: { Engravings: Engraving[]; Effects: Effect[] } | null;
  gems: { Gems: Gem[]; Effects: Effect[] } | null;
  cards: { Cards: Card[]; Effects: Effect[] } | null;
}

//profile-character-info__server
//game-info__guild

class CharService {
  public static getChar(nickname: string): Promise<GetCharResponse> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const response: AxiosResponse<GetCharResponse> = await axios({
            method: "GET",
            url: `${SERVER_URL}/api/lostark/user`,
            params: {
              userName: nickname,
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

export default CharService;
