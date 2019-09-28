import NodeCache = require('node-cache');
import { Summoner, Champion } from './Interfaces';
export const cache = new NodeCache();
const cacheDurationInDays = 7;

export function getSummonerFromCache(summonerName: string, region: string): Summoner | undefined {
    return cache.get(`${region}_${summonerName}`);
}

export function cacheSummoner(summoner: Summoner): boolean {
    return cache.set(`${summoner.region}_${summoner.name}`, summoner, cacheDurationInDays * 86400);
}

export function getChampionsDataFromCache(): Map<string, Champion> | undefined {
    return cache.get('mappedChampions');
}

export function cacheChampionsData(championsData: Map<string, Champion>): boolean {
    return cache.set('mappedChampions', championsData, cacheDurationInDays * 86400);
}