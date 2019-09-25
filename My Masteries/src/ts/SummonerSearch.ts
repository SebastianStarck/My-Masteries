import { InvalidArgumentError, SummonerNotFound, MasteriesNotFound } from "./Exceptions";
import { Summoner, ChampionMastery } from "./Interfaces";

require('dotenv').config()
const axios = require('axios');

class SummonerSearch {
    async searchSummoner(name: string, region: string): Promise<Summoner> {
        if (!name || !region) {
            throw new InvalidArgumentError();
        }

        const response = await axios.get(this.parseSearchSummonerUrl(name, region)).catch((error) => console.log(error));

        if (!response || response.status !== 200) {
            throw new SummonerNotFound();
        }

        return {
            ...response.data,
            region
        }
    }

    async searchSummonerMasteries(summoner: Summoner): Promise<Array<ChampionMastery>> {
        if (!summoner || !summoner.id) {
            throw new InvalidArgumentError();
        }

        const response = await axios.get(this.parseSearchSummonerMasteries(summoner))
            .catch((error) => console.log(error))

        return response.data;
    }

    parseSearchSummonerUrl(name: string, region: string): string {
        return `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${process.env.RIOT_KEY}`
    }

    parseSearchSummonerMasteries(summoner: Summoner): string {
        return `https://${summoner.region}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summoner.id}?api_key=${process.env.RIOT_KEY}`
    }
}

export { SummonerSearch };