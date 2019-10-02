export class Champion {
    id: string;
    key: number;
    name: string;
    title: string;
    info: IChampionInfo;
    tags: Array<string>;
    advancedTags: Array<string>;
    lanes: Array<string>;
    advancedStats: IChampionAdvancedStats;
}

// Implement interfaces
export interface IChampionAdvancedStats {

}

export interface IChampionInfo {

}