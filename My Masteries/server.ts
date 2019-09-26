import { InvalidArgumentError, SummonerNotFound, MasteriesNotFound } from "./ts/Exceptions";
import SummonerController = require('./src/ts/SummonerController');
import ViewController = require('./src/ts/ViewController');
import Champion = require('./src/ts/Champion');
import http = require('http');
import url = require('url');
import path = require('path');
import fs = require('fs');


const port = 8080;

http.createServer(function (req, res) {
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

async function handleSearch(res, parsedUrl: any) {
    const { summoner_name: summonerName, region } = parsedUrl.query;
    let summoner;

    try {
        summoner = await SummonerController.searchSummoner(summonerName, region);
    } catch (e) {
        if (e instanceof InvalidArgumentError) {
        } else if (e instanceof SummonerNotFound) {
            ViewController.renderSummonerNotFound(res, summonerName);
        }
    };

    if (summoner) {
        let masteries;

        try {
            masteries = await SummonerController.searchSummonerMasteries(summoner);
        } catch (e) {
            console.log(e);
            if (e instanceof MasteriesNotFound || e instanceof InvalidArgumentError) {
                ViewController.renderError(res, '404');
            }
        }

        if (masteries) {
            const champions = await Champion.getMappedChampions();
            ViewController.renderSummonerMasteries(res, summoner, masteries, champions);
        }
    }
}