import http = require('http');
import url = require('url');
import path = require('path');
import fs = require('fs');
import ChampionData = require('./src/ts/Champion/ChampionMapper');
import Search = require('./src/ts/Search');
import ViewController = require('./src/ts/ViewController');
import Cache = require('./src/ts/Cache');
import { mapMasteries } from './src/ts/Mastery/MasteryMapper';
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

    if (req.url.indexOf('.css') != -1 || req.url.indexOf('.js') != -1) {
        handleResource(req, res, parsedUrl);
    } else {
        ViewController.renderError(res, '404');
    }
}).listen(port);

function handleResource(req, res, parsedUrl): void {
    const fileExt = req.url.indexOf('.css') != -1 ? 'css' : 'javascript'
    const resourcePath = path.join(__dirname, parsedUrl.pathname);
    fs.readFile(resourcePath, function (err, data) {
        if (err) ViewController.renderError(res, '404', fileExt);
        res.writeHead(200, { 'Content-Type': 'text/' + fileExt });
        res.end(data);
    });
}

async function handleSearch(res, parsedUrl) {
    const summoner = await Search.getSummoner(res, parsedUrl);
    const champions: Map<string, Champion> = Cache.getChampions();

    const mappedMasteries = await mapMasteries(summoner.masteries);
    summoner.masteriesProfile = mappedMasteries;
    Cache.saveSummoner(summoner);
    const digestedMasteries = digestMasteries(summoner.masteries);
    summoner.masteriesProfile = digestedMasteries;
    cacheSummoner(summoner);

    if (!summoner.masteriesProfile) {
        console.log('yikes');
    }

    ViewController.renderSummonerMasteries(res, summoner, champions);
}