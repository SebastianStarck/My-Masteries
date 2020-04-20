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

export class DecoratedChampion extends Champion {
  constructor(championData: Champion) {
    super();
    this.id = championData.id;
    this.key = championData.key;
    this.name = championData.name;
    this.title = championData.title;
    this.info = championData.info;
    this.tags = championData.tags;
    this.advancedTags = championData.advancedTags;
    this.lanes = championData.lanes;
    this.advancedStats = championData.advancedStats;
  }

  getSquareIconUrl(): string {
    return `http://ddragon.leagueoflegends.com/cdn/${process.env.DDRAGON_VERSION}/img/${this.id}`;
  }
}

// Implement interfaces
export interface IChampionAdvancedStats {

}

export interface IChampionInfo {

}