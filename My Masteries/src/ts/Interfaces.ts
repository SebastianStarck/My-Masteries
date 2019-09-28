import { MasteriesProfile } from "./MasteriesDigester";

export interface ChampionMastery {
    championId: number;
    championPoints: number;
}

export interface Champion {
    id: number;
    name: string;
    title: string;
    tags: Array<string>;
    advancedTags: Array<string>
    lanes: Array<string>;
}

export interface Summoner {
    id: string;
    name: string;
    summonerLevel: number;
    profileIconId: number;
    region: string;
    masteries?: Array<ChampionMastery>;
    masteriesProfile?: MasteriesProfile;
}

export declare interface TemplateData {
    view: string;
    ddragonVersion?: string;
    title?: string;
    mainText?: string;
    displayError?: boolean;
    errorText?: string;
}

// Rename odd name
export declare interface MasteriesData{
    view: string;
    title: string;
    ddragonVersion?: string;
    masteries: Array<ChampionMastery>;
    topMasteries: Array<ChampionMastery>
    summoner: Summoner;
    champions: Map<string, Champion>;
}