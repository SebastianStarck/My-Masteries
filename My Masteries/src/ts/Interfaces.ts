import { MasteriesProfile } from "./MasteriesDigester";
import { Champion } from "./Champion/Champion";

export interface IChampionMastery {
    championId: number;
    championPoints: number;
}

export interface IChampion {
    id: number;
    name: string;
    title: string;
    info: object;
    tags: Array<string>;
    advancedTags: Array<string>
    lanes: Array<string>;
}

export interface ISummoner {
    id: string;
    name: string;
    summonerLevel: number;
    profileIconId: number;
    region: string;
    masteries?: Array<IChampionMastery>;
    masteriesProfile?: MasteriesProfile;
}

export declare interface ITemplateData {
    view: string;
    ddragonVersion?: string;
    title?: string;
    mainText?: string;
    displayError?: boolean;
    errorText?: string;
}

export declare interface ITemplateDataMasteries {
    view: string;
    title: string;
    ddragonVersion?: string;
    masteries: Array<IChampionMastery>;
    topMasteries: Array<IChampionMastery>
    summoner: ISummoner;
    champions: Map<string, Champion>;
}