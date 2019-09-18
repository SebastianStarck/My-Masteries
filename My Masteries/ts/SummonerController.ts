import { SummonerSearch } from './SummonerSearch';
import { Summoner, ChampionMastery } from './Interfaces';

export async function searchSummoner(name: string, region: string): Promise<Summoner> {
    const search = createSearch();

    return await search.searchSummoner(name, region);
}

export async function searchSummonerMasteries(summoner: Summoner): Promise<Array<ChampionMastery>> {
    const search = createSearch();

    console.log(summoner);
    return await search.searchSummonerMasteries(summoner)
}

export function createSearch(): SummonerSearch {
    return new SummonerSearch();
}