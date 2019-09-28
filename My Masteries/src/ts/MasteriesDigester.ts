import { IChampionMastery } from "./Interfaces";
import Champions = require('./Champions');

export function digestMasteries(masteries: Array<IChampionMastery>) {
    const championsData = Champions.getMappedChampions();
    const masteriesProfile = new MasteriesProfile(
        Champions.getChampionAdvancedTagNames(),
        Champions.getChampionLanesNames(),
        Champions.getBaseTagNames()
    );

    masteriesProfile.totalMasteryPoints = addUpMasteriesPoints(masteries);

    masteries.forEach((championMastery) => {
        const champion = championsData.get(`${championMastery.championId}`);
        ['tags', 'advancedTags', 'lanes'].forEach((attribute) => {
            champion[attribute].forEach(digestSubAttribute(attribute, championMastery, masteriesProfile));
        });

        })
    });

    return masteriesProfile;
}

function addUpMasteriesPoints(masteries: Array<IChampionMastery>): number {
    return masteries
        .map((championMastery) => { return championMastery.championPoints })
        .reduce((accumulator, currentValue) => accumulator + currentValue);
}

function digestSubAttribute(attributeName: string, championMastery: IChampionMastery, masteriesProfile: MasteriesProfile): (value: string, index: number, array: string[]) => void {
    return (subAttribute) => {
        const subAttributeName = `${subAttribute.toLowerCase()}MasteryPoints`;
        const subAttributeScore = masteriesProfile[attributeName].get(subAttributeName) + championMastery.championPoints;
        masteriesProfile[attributeName].set(`${subAttributeName}`, subAttributeScore);
    };
}

export class MasteriesProfile {
    totalMasteryPoints: number;
    tags: Map<string, number>;
    advancedTags: Map<string, number>;
    lanes: Map<string, number>;

    constructor(advancedTags: Array<string>, lanes: Array<string>, tags: Array<string>) {
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

}