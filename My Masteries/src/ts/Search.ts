﻿import { InvalidArgumentError, SummonerNotFound, MasteriesNotFound } from './Exceptions';
import { Summoner, ChampionMastery } from './Interfaces';
import { cache, getSummonerFromCache, cacheSummoner } from './Cache';
const ViewController = require('./ViewController');
const axios = require('axios');
require('dotenv').config();

export async function getSummoner(res, parsedUrl: any) {
    const { summoner_name: summonerName, region } = parsedUrl.query;
    if (!summonerName || !region) {
        throw new InvalidArgumentError();
    }

    let summoner = getSummonerFromCache(summonerName, region);

    try {
        if (summoner == undefined) {
            summoner = await searchSummoner(summonerName, region);
        }
    } catch (e) {
        if (e instanceof SummonerNotFound) {
            ViewController.renderSummonerNotFound(res, summonerName);
        }
    };

    let masteries = summoner.masteries;

    try {
        if (!masteries) {
            summoner.masteries = await searchMasteries(summoner);
            cacheSummoner(summoner);
        }
    } catch (e) {
        console.log(e);
        if (e instanceof MasteriesNotFound || e instanceof InvalidArgumentError) {
            ViewController.renderError(res, '404');
        }
    }

    return summoner;
}

async function searchSummoner(name: string, region: string): Promise<Summoner> {
    if (!name || !region) {
        throw new InvalidArgumentError();
    }

    const response = await axios.get(parseSearchSummonerUrl(name, region)).catch((error) => console.log(error));

    if (!response || response.status !== 200) {
        throw new SummonerNotFound();
    }

    return {
        ...response.data,
        region
    }
}

async function searchMasteries(summoner: Summoner): Promise<Array<ChampionMastery>> {
    if (!summoner || !summoner.id) {
        throw new InvalidArgumentError();
    }

    const response = await axios.get(parseSearchSummonerMasteries(summoner)).catch((error) => console.log(error))

    return response.data;
}

function parseSearchSummonerUrl(name: string, region: string): string {
    return `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${process.env.RIOT_KEY}`
}

function parseSearchSummonerMasteries(summoner: Summoner): string {
    return `https://${summoner.region}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summoner.id}?api_key=${process.env.RIOT_KEY}`
}
