﻿import { ITemplateData, ITemplateDataMasteries, ISummoner, IChampionMastery, IChampion } from "./Interfaces";
const path = require('path');
const pug = require('pug');
require('dotenv').config();

function compileTemplate(data: ITemplateData | ITemplateDataMasteries): string {
    data.ddragonVersion = process.env.DDRAGON_VERSION;
    return pug.renderFile(`src/templates/${data.view}.pug`, data || {
        title: 'My Masteries',
        stylesheet: path.join('./', data.view),
        view: 'home'
    });
}

export function renderSummonerNotFound(res, summonerName): void {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(compileTemplate({
        view: 'home',
        displayError: true,
        errorText: `Sorry, we have not found any summoner named ${summonerName}!`
    }));
}

export function renderHome(res): void {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(compileTemplate({
        view: 'home',
        title: 'My Masteries'
    }))
}

export function renderError(res, error?: string, fileExt?: string): void {
    res.writeHead(404, { 'Content-Type': 'text/' + fileExt || 'html' });
    res.end(compileTemplate({
        view: 'error',
        title: `Error ${error}`,
        errorText: 'Something went wrong!'
    }));
}

export function renderSummonerMasteries(res, summoner: ISummoner, champions: Map<string, IChampion>): void {
    res.end(compileTemplate({
        view: 'masteries_profile',
        title: `${summoner.name || 'Summoner'}'s Masteries`,
        summoner,
        topMasteries: summoner.masteries.slice(0, 5),
        masteries: summoner.masteries,
        champions
    }));
}