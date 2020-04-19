import { InvalidArgumentError, MasteriesNotFound } from '../Exceptions/Exceptions';
import { ISummoner, IChampionMastery } from '../Interfaces';
import Cache = require('../Cache');
const axios = require('axios');
require('dotenv').config();

export async function searchMasteries(summoner: ISummoner): Promise<Array<IChampionMastery>> {
    if (!summoner || !summoner.id) {
        throw new InvalidArgumentError();
    }

    const response = await axios.get(parseSearchSummonerMasteries(summoner))
        .catch((error) => console.log(error));

    if (response.status != 200) {
        throw new MasteriesNotFound();
    }

    const masteries = response.data;
    summoner.masteries = masteries;
    Cache.saveSummoner(summoner);

    return masteries;
}

function parseSearchSummonerMasteries(summoner: ISummoner): string {
    return `https://${summoner.region}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summoner.id}?api_key=${process.env.RIOT_KEY}`
}