﻿import http = require('http');
import url = require('url');
import path = require('path');
import fs = require('fs');

import Search = require('./src/ts/Search');
import ViewController = require('./src/ts/ViewController');
import Champions = require('./src/ts/Champions');
import { cache, cacheSummoner } from './src/ts/Cache';
import { digestMasteries, MasteriesProfile } from './src/ts/MasteriesDigester';
const port = 8080;

http.createServer(function (req, res) {
    const parsedUrl = url.parse(req.url, true);

    cache.flushAll();
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
    const champions = await Champions.getMappedChampions();

    const digestedMasteries = digestMasteries(summoner.masteries);
    summoner.masteriesProfile = digestedMasteries;
    cacheSummoner(summoner);

    if (!summoner.masteriesProfile) {
        console.log('yikes');
    }

    ViewController.renderSummonerMasteries(res, summoner, champions);
}