import { IChampionMastery } from "./Interfaces";
import Champions = require('./Champions');

export function digestMasteries(masteries: Array<IChampionMastery>) {
    const championsData = Champions.getMappedChampions();
    const masteriesProfile = new MasteriesProfile(
        Champions.getChampionAdvancedTagNames(), Champions.getChampionLanesNames(), Champions.getBaseTagNames()
    );

    masteriesProfile.totalMasteryPoints = addUpMasteriesPoints(masteries);
    masteries.forEach(function (championMastery) {
        const champion = championsData.get(`${championMastery.championId}`);
        champion.tags.forEach((tag) => {
            const tagName = `${tag.toLowerCase()}MasteryPoints`;
            const tagScore = masteriesProfile.tags.get(tagName) + championMastery.championPoints;
            masteriesProfile.tags.set(`${tagName}`, tagScore);
        })

        champion.advancedTags.forEach((tag) => {
            const advancedTagName = `${tag.toLowerCase()}MasteryPoints`;
            const tagScore = masteriesProfile.advancedTags.get(advancedTagName) + championMastery.championPoints;
            masteriesProfile.advancedTags.set(`${advancedTagName}`, tagScore);
        })

        champion.lanes.forEach((lane) => {
            const laneName = `${lane.toLowerCase()}MasteryPoints`;
            const laneScore = masteriesProfile.lanes.get(laneName) + championMastery.championPoints
            masteriesProfile.lanes.set(`${laneName}`, laneScore);
        })
    });

    return masteriesProfile;
}

function addUpMasteriesPoints(masteries: Array<IChampionMastery>): number {
    return masteries
        .map((championMastery) => { return championMastery.championPoints })
        .reduce((accumulator, currentValue) => accumulator + currentValue);
}

export class MasteriesProfile {
    totalMasteryPoints: number;
    constructor(advancedTags, lanes, tags) {
        this.tags = new Map();
        this.lanes = new Map();
        this.advancedTags = new Map();

        tags.forEach((tagName) => {
            this.tags.set(`${tagName}MasteryPoints`, 0);
        });
        advancedTags.forEach((tagName) => {
            this.advancedTags.set(`${tagName}MasteryPoints`, 0);
        });
        lanes.forEach((laneName) => {
            this.lanes.set(`${laneName}MasteryPoints`, 0);
        });
    }

    tags: Map<string, number>;
    advancedTags: Map<string, number>;
    lanes: Map<string, number>;
}