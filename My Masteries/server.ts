import { InvalidArgumentError, SummonerNotFound, MasteriesNotFound } from "./ts/Exceptions";
import SummonerController = require('./ts/SummonerController')
import ViewController = require('./ts/ViewController')

import http = require('http');
import url = require('url');
const port = 8080;

http.createServer(function (req, res) {
    const parsedUrl = url.parse(req.url, true);

    if (req.url == '/') {
        res.end(ViewController.compileTemplate('home', { title: 'My Masteries' }))
    }
    else if (parsedUrl.pathname == '/search_summoner') {
        handleSearch(req, res, parsedUrl)
    } else {
        res.end(ViewController.compileTemplate('error', { title: 'Not found', errorText: 'foobar' }));
    }
}).listen(port);

async function handleSearch(req, res, parsedReq: any) {
    const { summoner_name: summonerName, region } = parsedReq.query;
    let summoner;

    try {
        summoner = await SummonerController.searchSummoner(summonerName, region);
    } catch (e) {
        if (e instanceof InvalidArgumentError) {
            res.end(ViewController.compileTemplate('home', {
                displayError: true,
                errorText: 'Sorry, something went wrong!'
            }));
        } else if (e instanceof SummonerNotFound) {
            res.end(ViewController.compileTemplate('home', {
                displayError: true,
                errorText: `Sorry, we have not found any summoner named ${summonerName}!`
            }));
        }
    };

    if (summoner) {
        let masteries;

        try {
            masteries = await SummonerController.searchSummonerMasteries(summoner);
        } catch (e) {
            console.log(e);
            if (e instanceof MasteriesNotFound || e instanceof InvalidArgumentError) {
                res.end(ViewController.compileTemplate('error', {
                    errorText: `Masteries not found!`
                }));
            }
        }

        if (masteries) {
            res.end(ViewController.compileTemplate('masteries_profile', {
                title: `${summoner.name || 'Summoner'}'s Masteries`,
                summoner,
                topMasteries: masteries.slice(0, 5),
                masteries            
            }));      
        }
    }
}