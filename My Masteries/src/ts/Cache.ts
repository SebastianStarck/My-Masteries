import NodeCache = require('node-cache');
import { ISummoner } from './Interfaces';
import { getMappedChampions } from './Champion/ChampionMapper';
import { Champion } from './Champion/Champion';
import { Summoner } from './Summoner/Summoner';
export const cache = new NodeCache();
const cacheDurationInDays = 7;

export async function mapChampions() {
    const champions = await getMappedChampions()
    cache.set('mappedChampions', champions, cacheDurationInDays * 86400);
}

export function getSummoner(summonerName: string, region: string): Summoner | undefined {
    return cache.get(`${region}_${summonerName}`);
}

export function saveSummoner(summoner: ISummoner): boolean {
    return cache.set(`${summoner.region}_${summoner.name}`, summoner, cacheDurationInDays * 86400);
}

export function getChampions(): Map<string, Champion> {
    return cache.get('mappedChampions');
}

export function getLocale(): string {
    let locale;
    cache.get('locale', function (e, value) {
        if (!e) {
            locale = value != undefined ? value : process.env.DEFAULT_LOCALE;
        }
    });

    return locale;
}