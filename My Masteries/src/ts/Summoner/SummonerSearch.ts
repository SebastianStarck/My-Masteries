import { InvalidArgumentError, SummonerNotFound } from '../Exceptions/Exceptions';
import { ISummoner } from '../Interfaces';
import MasterySearch = require('../Mastery/MasterySearch');
import Cache = require('../Cache');
import { Summoner } from './Summoner';
const axios = require('axios');
require('dotenv').config();

export async function getSummoner(parsedUrl: any): Promise<Summoner> {
    const { summoner_name: summonerName, region } = parsedUrl.query;

    if (!summonerName || !region) {
        throw new InvalidArgumentError();
    }

    let summoner = Cache.getSummoner(summonerName, region);

    if (summoner == undefined) {
        summoner = new Summoner(await searchSummoner(summonerName, region));
    }

    if (!summoner) {
        throw new SummonerNotFound();
    }

    let masteries = summoner.masteries;

    if (!masteries) {
        summoner.masteries = await MasterySearch.searchMasteries(summoner);
    }

    return summoner;
}

async function searchSummoner(name: string, region: string): Promise<ISummoner> {
    if (!name || !region) {
        throw new InvalidArgumentError();
    }

    const response = await axios.get(parseSearchSummonerUrl(name, region)).catch((error) => console.log(error));

    if (!response || response.status != 200) {
        throw new SummonerNotFound();
    }

    return {
        ...response.data,
        region
    }
}

function parseSearchSummonerUrl(name: string, region: string): string {
    return `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${process.env.RIOT_KEY}`
}

