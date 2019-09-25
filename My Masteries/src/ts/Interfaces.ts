export interface ChampionMastery {
    championId: number;
    championPoints: number;
}

export interface Summoner {
    id: string;
    name: string;
    summonerLevel: number;
    profileIconId: number;
    region: string;
}

export declare interface TemplateData {
    view: string,
    title?: string;
    mainText?: string;
    displayError?: boolean;
    errorText?: string;
}

export declare interface MasteriesData{
    view: string;
    title: string;
    masteries: Array<ChampionMastery>;
    topMasteries: Array<ChampionMastery>
    summoner: Summoner;
}