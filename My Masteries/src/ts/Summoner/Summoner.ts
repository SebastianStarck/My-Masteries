import { IChampionMastery } from "../Interfaces";
import { MasteriesProfile } from "../Mastery/MasteryProfile";
import { MasteriesNotFound } from "../Exceptions/Exceptions";
import ChampionData = require('../Champion/ChampionData');
export class Summoner {
    id: string;
    name: string;
    summonerLevel: number;
    profileIconId: number;
    region: string;
    masteries?: Array<IChampionMastery>;
    masteriesProfile?: MasteriesProfile;

    constructor(data: any) {
        this.id = data.id;
        this.name = data.name;
        this.summonerLevel = data.summonerLevel;
        this.region = data.region;
    }

    public getMasteriesStats = (): object => {
        if (!this.masteriesProfile) {
            throw new MasteriesNotFound();
        }

        return {
            masteriesClassesByContribution: this.masteriesProfile.getAttributeByContribution('tags'),
        }
    }

    public getTagsNames = (): Array<string> => {
        return ChampionData.getChampionTagNames().map((tag) => tag[0].toUpperCase() + tag.slice(1));
    }
}