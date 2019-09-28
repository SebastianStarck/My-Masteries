import { getChampionsDataFromCache, cacheChampionsData, getLocale } from "./Cache";
import { IChampion } from "./Interfaces";
const axios = require('axios');
require('dotenv').config();

export function getMappedChampions(): Map<string, IChampion> {
    let championsData;
    championsData = getChampionsDataFromCache();

    if (!championsData) {
        championsData = mapChampions();
    }

    return championsData;
}

/* 
 * Champions are served as championName => {data} 
 * For practical reasons, champions are mapped as championId => {data} instead.
 */
async function mapChampions(): Promise<Map<string, IChampion>> {
    const mappedChampions: Map<string, IChampion> = new Map();
    let championsData;

    championsData = await retrieveChampionsData().catch((e) => console.log(e));

    for (let [_key, value] of Object.entries(championsData)) {
        const championId = value['key'];

        const championData: IChampion = <IChampion>value;
        championData.advancedTags = getChampionAdvancedTags(_key);
        championData.lanes = getChampionLanes(_key);

        mappedChampions.set(championId, championData);
    }

    cacheChampionsData(mappedChampions);

    return mappedChampions;
}

// TODO: Tidy up error handling
async function retrieveChampionsData(): Promise<object> {
    const source = `http://ddragon.leagueoflegends.com/cdn/${process.env.DDRAGON_VERSION}/data/${getLocale()}/champion.json`;
    let response = await axios.get(source).catch((e) => console.log(e));

    return response.data.data || {};
}

function getChampionAdvancedTags(champion: string): Array<string> {
    const championsByAdvancedTags = getChampionsByAdvancedTags();
    const advancedTagNames = getChampionAdvancedTagNames();

    return advancedTagNames.filter(function (tag: string) {
        return championsByAdvancedTags[tag].indexOf(champion) != -1;
    });
}

function getChampionLanes(champion: string): Array<string> {
    const championsByLane = getChampionsByLane();
    const laneNames = getChampionLanesNames();

    return laneNames.filter(function (lane: string) {
        return championsByLane[lane].indexOf(champion) != -1;
    });
}

// TODO: Review data storing
export function getChampionsByLane(): object {
    return {
        top: [
            'Aatrox', 'Akali', 'Camille', 'ChoGath', 'Darius', 'DrMundo', 'Fiora', 'Gangplank', 'Garen',
            'Gnar', 'Illaoi', 'Irelia', 'Jax', 'Jayce', 'Kayle', 'Kennen', 'Kled', 'Malphite', 'Maokai',
            'Mordekaiser', 'Nasus', 'Olaf', 'Ornn', 'Pantheon', 'Poppy', 'Quinn', 'Renekton', 'Riven',
            'Rumble', 'Ryze', 'Shen', 'Singed', 'Sion', 'Swain', 'Sylas', 'Tahm', 'Kench', 'Tahm', 'Kench',
            'Teemo', 'Tryndamere', 'Urgot', 'Vayne', 'Viktor', 'Vladimir', 'Volibear', 'Wukong', 'Yasuo', 'Yorick',
        ],
        jungle: [
            'Aatrox', 'Amumu', 'DrMundo', 'Elise', 'Evelynn', 'Gragas', 'Graves', 'Hecarim', 'Ivern',
            'JarvanIV', 'Jax', 'Karthus', 'Kayn', 'KhaZix', 'Kindred', 'LeeSin', 'Malphite', 'MasterYi',
            'Nautilus', 'Nidalee', 'Nocturne', 'Nunu', 'Olaf', 'Pantheon', 'Rammus', 'RekSai', 'Rengar',
            'Sejuani', 'Shaco', 'Shyvana', 'Skarner', 'Sylas', 'Taliyah', 'Trundle', 'Udyr', 'Vi', 'Volibear',
            'Warwick', 'Wukong', 'XinZhao', 'Zac',
        ],
        mid: [
            'Aatrox', 'Ahri', 'Akali', 'Anivia', 'Annie', 'AurelionSol', 'Azir', 'Brand', 'Cassiopeia', 'Corki',
            'Diana', 'Ekko', 'Fizz', 'Heimerdinger', 'Irelia', 'Kassadin', 'Katarina', 'KogMaw', 'LeBlanc',
            'Lissandra', 'Lux', 'Malzahar', 'Neeko', 'Orianna', 'Pantheon', 'Qiyana', 'Ryze', 'Swain', 'Sylas',
            'Syndra', 'Taliyah', 'Talon', 'Tristana', 'TwistedFate', 'Veigar', 'VelKoz', 'Viktor', 'Vladimir',
            'Xerath', 'Yasuo', 'Zed', 'Ziggs', 'Zilean', 'Zoe', 'Zyra',
        ],
        bottom: [
            'Ashe', 'Caitlyn', 'Draven', 'Ezreal', 'Jhin', 'Jinx', 'KaiSa', 'Kalista', 'KogMaw', 'Lucian',
            'Lucian', 'MissFortune', 'Mordekaiser', 'Quinn', 'Sivir', 'Swain', 'Tristana', 'Twitch', 'Varus',
            'Vayne', 'Vladimir', 'Xayah', 'Yasuo',
        ],
        support: [
            'Alistar', 'Bard', 'Blitzcrank', 'Brand', 'Braum', 'Fiddlesticks', 'Galio', 'Janna', 'Karma',
            'Leona', 'Lulu', 'Lux', 'Malphite', 'Morgana', 'Nami', 'Nautilus', 'Pyke', 'Rakan', 'Sona',
            'Soraka', 'Swain', 'TahmKench', 'Taric', 'Thresh', 'Veigar', 'VelKoz', 'Volibear', 'Xerath',
            'Yuumi', 'Zilean', 'Zyra',
        ]
    };
}

export function getChampionsByAdvancedTags(): object {
    return {
        // Controllers
        catcher: [
            'Bard', 'Blitzcrank', 'Ivern', 'Jhin', 'Lux', 'Morgana', 'Neeko', 'Rakan', 'Thresh', 'Zyra'
        ],
        enchanter: [
            'Janna', 'Lulu', 'Nami', 'Sona', 'Soraka', 'Taric', 'Yuumi'
        ],

        // Fighers 
        diver: [
            'Camille', 'Diana', 'Elise', 'Hecarim', 'Irelia', 'JarvanIV', 'LeeSin', 'Olaf',
            'Pantheon', 'RekSai', 'Rengar', 'Skarner', 'Vi', 'Warwick', 'Wukong', 'XinZhao',
        ],
        juggernaut: [
            'Aatrox', 'Darius', 'DrMundo', 'Garen', 'Illaoi', 'Mordekaiser',
            'Nasus', 'Shyvana', 'Trundle', 'Udyr', 'Urgot', 'Volibear', 'Yorick'
        ],

        // Mages
        burst: [
            'Ahri', 'Annie', 'Brand', 'Karma', 'LeBlanc', 'Lissandra', 'Lux', 'Neeko',
            'Orianna', 'Sylas', 'Syndra', 'TwistedFate', 'Veigar', 'Zoe', 'Zyra'
        ],
        battlemage: [
            'Anivia', 'AurelionSol', 'Cassiopeia', 'Karthus', 'Malzahar', 'Morgana',
            'Rumble', 'Ryze', 'Swain', 'Taliyah', 'Viktor', 'Vladimir',
        ],
        artillery: [
            'Jayce', 'Lux', 'Varus', 'VelKoz', 'Xerath', 'Ziggs', 'Zoe',
        ],

        // Marksman
        marksman: [
            'Ashe', 'Caitlyn', 'Corki', 'Draven', 'Ezreal', 'Jhin', 'Jinx', 'KaiSa', 'Kalista', 'Kindred',
            'KogMaw', 'Lucian', 'MissFortune', 'Sivir', 'Tristana', 'Twitch', 'Varus', 'Vayne', 'Xayah'
        ],

        // Slayers
        assassin: [
            'Ahri', 'Akali', 'Diana', 'Ekko', 'Evelynn', 'Fizz', 'Kassadin', 'Kayn',
            'KhaZix', 'Nocturne', 'Pyke', 'Qiyana', 'Rengar', 'Shaco', 'Talon', 'Zed',
        ],
        skirmisher: [
            'Fiora', 'Jax', 'Kayn', 'Master', 'Yi', 'Riven', 'Sylas', 'Tryndamere', 'Yasuo'
        ],

        // Specialists
        specialist: [
            'Azir', 'ChoGath', 'Fiddlesticks', 'Gangplank', 'Gnar', 'Graves', 'Heimerdinger',
            'Kayle', 'Kennen', 'Nidalee', 'Quinn', 'Singed', 'Teemo', 'Zilean',
        ],

        // Tanks
        vanguard: [
            'Alistar', 'Amumu', 'Gnar', 'Gragas', 'Leona', 'Malphite', 'Maokai',
            'Nautilus', 'Nunu', 'Ornn', 'Rammus', 'Sejuani', 'Sion', 'Zac',
        ],
        warden: [
            'Braum', 'ChoGath', 'Galio', 'Poppy', 'Shen', 'TahmKench', 'Taric',
        ]
    }
}

export function getChampionAdvancedTagNames(): Array<string> {
    return Object.keys(getChampionsByAdvancedTags());
}

export function getChampionLanesNames(): Array<string> {
    return Object.keys(getChampionsByLane());
}

export function getBaseTagNames(): Array<string> {
    return [
        'fighter', 'tank', 'support', 'marksman', 'mage', 'assassin'
    ];
}

export function getInfoStats(): Array<string> {
    return [
        'attack', 'defense', 'magic', 'difficulty',
    ];
}