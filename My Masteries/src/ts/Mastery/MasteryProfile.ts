import ChampionData = require('../Champion/ChampionData');
import { IChampionMastery } from '../Interfaces';
import { InvalidMasteryProfileAttributeMap } from '../Exceptions/Exceptions';
import { Champion, DecoratedChampion } from "../Champion/Champion";

export class MasteriesProfile {
    totalMasteryPoints: number;
    info: Map<string, number>;
    advancedStats: Map<string, number | object>;
    tags: Map<string, number>;
    advancedTags: Map<string, number>;
    lanes: Map<string, number>;
    masteries: Array<IChampionMastery>;

    constructor(masteries: Array<IChampionMastery>) {
        this.info = new Map();
        this.advancedStats = new Map();
        this.tags = new Map();
        this.lanes = new Map();
        this.advancedTags = new Map();
        this.advancedStats.set('damageRating', {});
        this.masteries = masteries;
        this.totalMasteryPoints = addUpMasteriesPoints(masteries);
    };

    public getAttributeByContribution = (attribute: string): Map<string, number> => {
        const map = new Map();

        const attributeMap: Map<string, number> = this.getAttributeMap(attribute);
        const attributeMasteryPoints: number = Array.from(attributeMap.values())
            .reduce((total: number, mastery: number) => total + mastery, 0);

        attributeMap.forEach((subAttributeValue: number, subAttributeKey: string) => {
            map.set(subAttributeKey, (subAttributeValue * 100) / attributeMasteryPoints);
        });

        return map;
    };

    private getAttributeMap = (attribute: string): Map<string, number> => {
        const attributeMap = this[attribute];

        if (!(attributeMap instanceof Map) || !attributeMap) {
            throw new InvalidMasteryProfileAttributeMap();
        }

        return attributeMap;
    };

    public getTopChampions = (amount?: number): Array<DecoratedChampion> => {
        return this.masteries.slice(0, amount || 5).map((championMastery) => {
            return new DecoratedChampion(ChampionData.getChampion(championMastery.championId));
        });
    };

    public getTopChampion = () => {
        return ChampionData.getChampion(this.masteries[0].championId);
    };

    public getTopSubAttribute = (attribute: string) => {
        const tags = this.getAttributeMap(attribute);
        return new Map(
            Array
                .from(tags)
                .sort((a: any, b: any) => {
                    return b[1] - a[1];
                })
        ).entries().next().value[0];
    };

    public getMasteriesProfileArchtype = () => {
        return '';
    };
}

function addUpMasteriesPoints(masteries: Array<IChampionMastery>): number {
    return masteries
        .map((championMastery) => { return championMastery.championPoints })
        .reduce((accumulator, currentValue) => accumulator + currentValue);
}