import http = require('http');
import url = require('url');
import path = require('path');
import fs = require('fs');

import SummonerSearch = require('./src/ts/Summoner/SummonerSearch');
import ViewController = require('./src/ts/ViewController');
import Cache = require('./src/ts/Cache');
import MasteryMapper = require('./src/ts/Mastery/MasteryMapper');
import { Champion } from './src/ts/Champion/Champion';

const port = 8080;

http.createServer(async function (req, res) {
    if (!Cache.getChampions()) {
        await Cache.mapChampions();
    }
    
    const parsedUrl = url.parse(req.url, true);

    if (req.url == '/') {
        ViewController.renderHome(res);
    }

    if (parsedUrl.pathname == '/search_summoner') {
        handleSearch(res, parsedUrl);
    }

    //// Clean up this
    if (req.url.indexOf('.css') != -1 || req.url.indexOf('.js') != -1 || req.url.indexOf('.jpg') != -1 || req.url.indexOf('.svg') != -1) {
        handleResource(req, res, parsedUrl);
    } //else {  
    // ViewController.renderError(res, '404');
    //}
}).listen(port);

function handleResource(req, res, parsedUrl): void {
    const fileExt = resolveFileExt(parsedUrl);
    const resourcePath = path.join(__dirname, parsedUrl.pathname);
    console.log(resourcePath);
    fs.readFile(resourcePath, function (err, data) {
        if (err) ViewController.renderError(res, '404', fileExt);
        res.writeHead(200, { 'Content-Type': 'text/' + fileExt });
        res.end(data);
    });
}

async function handleSearch(res, parsedUrl) {
    const summoner = await SummonerSearch.getSummoner(parsedUrl);
    const champions: Map<string, Champion> = Cache.getChampions();

    const mappedMasteries = await MasteryMapper.map(summoner.masteries);
    summoner.masteriesProfile = mappedMasteries;
    Cache.saveSummoner(summoner);

    if (!summoner.masteriesProfile) {
        console.log('yikes');
    }

    console.log(mappedMasteries.getAttributeByContribution('tags').keys());
    console.log(mappedMasteries.getAttributeByContribution('advancedTags'));
    console.log(mappedMasteries.getAttributeByContribution('lanes'));
    console.log(mappedMasteries.info);
    console.log(mappedMasteries.advancedTags);
    console.log(mappedMasteries.getTopSubAttribute('tags'));
    console.log(mappedMasteries.getTopSubAttribute('advancedTags'));
    console.log(mappedMasteries.getTopSubAttribute('lanes'));
    console.log(mappedMasteries.getTopChampions());
    console.log(mappedMasteries.getTopChampion());

    ViewController.renderSummonerMasteries(res, summoner, champions);
}

// Fix this;
function resolveFileExt(parsedReq) {
    return 'css';
}

const foo = [
    {
        championId: 57,
        championLevel: 5,
        championPoints: 10,
        lastPlayTime: 1527045467000,
        championPointsSinceLastLevel: 25193,
        championPointsUntilNextLevel: 0,
        chestGranted: false,
        tokensEarned: 2,
        summonerId: '_sjqfnK0gP6_i-ub2fWN4r316Dsuqgavdypbg993WDO3'
    },
    {
        championId: 122,
        championLevel: 5,
        championPoints: 10,
        lastPlayTime: 1532495299000,
        championPointsSinceLastLevel: 25078,
        championPointsUntilNextLevel: 0,
        chestGranted: false,
        tokensEarned: 2,
        summonerId: '_sjqfnK0gP6_i-ub2fWN4r316Dsuqgavdypbg993WDO3'
    },
    {
        championId: 98,
        championLevel: 5,
        championPoints: 10,
        lastPlayTime: 1528016857000,
        championPointsSinceLastLevel: 20884,
        championPointsUntilNextLevel: 0,
        chestGranted: false,
        tokensEarned: 2,
        summonerId: '_sjqfnK0gP6_i-ub2fWN4r316Dsuqgavdypbg993WDO3'
    },
    {
        championId: 8,
        championLevel: 5,
        championPoints: 10,
        lastPlayTime: 1562993600000,
        championPointsSinceLastLevel: 16017,
        championPointsUntilNextLevel: 0,
        chestGranted: false,
        tokensEarned: 2,
        summonerId: '_sjqfnK0gP6_i-ub2fWN4r316Dsuqgavdypbg993WDO3'
    },
    {
        championId: 31,
        championLevel: 5,
        championPoints: 10,
        lastPlayTime: 1527042892000,
        championPointsSinceLastLevel: 840,
        championPointsUntilNextLevel: 0,
        chestGranted: false,
        tokensEarned: 0,
        summonerId: '_sjqfnK0gP6_i-ub2fWN4r316Dsuqgavdypbg993WDO3'
    },
];