import ChampionData = require('./ChampionData');
import { Champion } from './Champion';
import { ChampionsDataNotFound } from '../Exceptions/Exceptions';

/*
 * Champions are served as championId(#Chogath) => {data} 
 * For practical reasons, champions are mapped as championKey(#31) => {data} instead.
 */
export async function getMappedChampions(): Promise<IChampionsMap> {
    const championsData = await ChampionData
        .retrieveChampionsData()
        .catch((e) => { throw new ChampionsDataNotFound() });

    const champions: IChampionsMap = {};
    for (let [id, data] of Object.entries(championsData)) {
        const champion: Champion = new Champion();

        try {
            champion.id = id;
            ['key', 'name', 'title', 'tags', 'info'].forEach((field) => {
                champion[field] = data[field];
            });

            champion.advancedTags = ChampionData.getChampionAdvancedTags(champion.id);
            champion.lanes = ChampionData.getChampionLanes(champion.id);
            champion.advancedStats = ChampionData.getChampionAdvancedStats(champion.id);
        } catch (e) {
            console.log(e);
        }

        champions[champion.key] = champion;
    }

    return champions;
}

export interface IChampionsMap {
    [index: string]: Champion;
}