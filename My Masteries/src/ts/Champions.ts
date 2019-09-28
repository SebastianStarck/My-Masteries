import { cache, getChampionsDataFromCache, cacheChampionsData } from "./Cache";
import { Champion } from "./Interfaces";
const axios = require('axios');
require('dotenv').config();

export function getMappedChampions(): Map<string, Champion> {
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
async function mapChampions(): Promise<Map<string, Champion>> {
    const mappedChampions: Map<string, Champion> = new Map();
    let championsData;

    championsData = await retrieveChampionsData().catch((e) => console.log(e));

    for (let [_key, value] of Object.entries(championsData)) {
        const championId = value['key'];

        const championData: Champion = <Champion>value;
        championData.advancedTags = getChampionAdvancedTags(_key);
        championData.lanes = getChampionLanes(_key);

        mappedChampions.set(championId, championData);
    }

    cacheChampionsData(mappedChampions);

    return mappedChampions;
}

async function retrieveChampionsData(): Promise<object> {
    const source = `http://ddragon.leagueoflegends.com/cdn/${process.env.DDRAGON_VERSION}/data/${getLocale()}/champion.json`;
    let response = await axios.get(source).catch((e) => console.log(e));

    return response.data.data || {};
}

function getChampionAdvancedTags(champion: string): Array<string> {
    const advancedTags = {
        // Controllers
        catchers: [
            'Bard', 'Blitzcrank', 'Ivern', 'Jhin', 'Lux', 'Morgana', 'Neeko', 'Rakan', 'Thresh', 'Zyra'
        ],
        enchanters: [
            'Janna', 'Lulu', 'Nami', 'Sona', 'Soraka', 'Taric', 'Yuumi'
        ],

        // Fighers 
        divers: [
            'Camille', 'Diana', 'Elise', 'Hecarim', 'Irelia', 'JarvanIV', 'LeeSin', 'Olaf',
            'Pantheon', 'RekSai', 'Rengar', 'Skarner', 'Vi', 'Warwick', 'Wukong', 'XinZhao',
        ],
        juggernauts: [
            'Aatrox', 'Darius', 'DrMundo', 'Garen', 'Illaoi', 'Mordekaiser',
            'Nasus', 'Shyvana', 'Trundle', 'Udyr', 'Urgot', 'Volibear', 'Yorick'
        ],

        // Mages
        bursters: [
            'Ahri', 'Annie', 'Brand', 'Karma', 'LeBlanc', 'Lissandra', 'Lux', 'Neeko',
            'Orianna', 'Sylas', 'Syndra', 'TwistedFate', 'Veigar', 'Zoe', 'Zyra'
        ],
        battlemages: [
            'Anivia', 'AurelionSol', 'Cassiopeia', 'Karthus', 'Malzahar', 'Morgana',
            'Rumble', 'Ryze', 'Swain', 'Taliyah', 'Viktor', 'Vladimir',
        ],
        artilleries: [
            'Jayce', 'Lux', 'Varus', 'VelKoz', 'Xerath', 'Ziggs', 'Zoe',
        ],

        // Marksman
        marksmen: [
            'Ashe', 'Caitlyn', 'Corki', 'Draven', 'Ezreal', 'Jhin', 'Jinx', 'KaiSa', 'Kalista', 'Kindred',
            'KogMaw', 'Lucian', 'MissFortune', 'Sivir', 'Tristana', 'Twitch', 'Varus', 'Vayne', 'Xayah'
        ],

        // Slayers
        assassins: [
            'Ahri', 'Akali', 'Diana', 'Ekko', 'Evelynn', 'Fizz', 'Kassadin', 'Kayn',
            'KhaZix', 'Nocturne', 'Pyke', 'Qiyana', 'Rengar', 'Shaco', 'Talon', 'Zed',
        ],
        skirmishers: [
            'Fiora', 'Jax', 'Kayn', 'Master', 'Yi', 'Riven', 'Sylas', 'Tryndamere', 'Yasuo'
        ],

        // Specialists
        specialists: [
            'Azir', 'ChoGath', 'Fiddlesticks', 'Gangplank', 'Gnar', 'Graves', 'Heimerdinger',
            'Kayle', 'Kennen', 'Nidalee', 'Quinn', 'Singed', 'Teemo', 'Zilean',
        ],

        // Tanks
        vanguards: [
            'Alistar', 'Amumu', 'Gnar', 'Gragas', 'Leona', 'Malphite', 'Maokai',
            'Nautilus', 'Nunu', 'Ornn', 'Rammus', 'Sejuani', 'Sion', 'Zac',
        ],
        wardens: [
            'Braum', 'ChoGath', 'Galio', 'Poppy', 'Shen', 'TahmKench', 'Taric',
        ]
    }
    const advancedTagNames = getChampionAdvancedTagNames();

    return advancedTagNames.filter(function (tag: string) {
        return advancedTags[tag].indexOf(champion) != -1;
    });
}

function getChampionLanes(champion: string): Array<string> {
    const lanes = {
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
    const laneNames = getChampionLanesNames();

    return laneNames.filter(function (lane: string) {
        return lanes[lane].indexOf(champion) != -1;
    });
}

export function getChampionAdvancedTagNames(): Array<string> {
    return [
        'catchers', 'enchanters', 'juggernauts', 'divers', 'artilleries', 'battlemages', 'bursters',
        'marksmen', 'assassins', 'skirmishers', 'specialists', 'vanguards', 'wardens'
    ];
}

export function getChampionLanesNames(): Array<string> {
    return [
        'top', 'jungle', 'mid', 'bottom', 'support',
    ];
}

export function getBaseTagNames(): Array<string> {
    return [
        'fighter', 'tank', 'support', 'marksman', 'mage', 'assassin'
    ]
}

function getLocale(): string {
    let locale;
    cache.get('locale', function (e, value) {
        if (!e) {
            locale = value != undefined ? value : process.env.DEFAULT_LOCALE;
        }
    });

    return locale;
}