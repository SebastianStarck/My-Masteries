const axios = require('axios');
const NodeCache = require("node-cache");
const cache = new NodeCache();

export function getMappedChampions() {
    let champions;

    champions = cache.get('mappedChampions');

    if (!champions) {
        champions = mapChampions();
    }

    return champions;
}

async function mapChampions() {
    let map = [];
    let champions;

    champions = await retrieveChampionsData().catch((e) => console.log(e));
    for (let [_key, value] of Object.entries(champions)) {
        map[value['key']] = value;
    }

    cache.set('mappedChampions', map, 604800);

    return map;
}


async function retrieveChampionsData(): Promise<object> {
    const source = `http://ddragon.leagueoflegends.com/cdn/${process.env.DDRAGON_VERSION}/data/${getLocale()}/champion.json`;
    let response = await axios.get(source).catch((e) => console.log(e));

    return response.data.data || {};
}

function getLocale(): string {
    let locale: string;
    cache.get('locale', function (e, value) {
        if (!e) {
            locale = value != undefined ? value : process.env.DEFAULT_LOCALE;
        }
    });

    return locale;
}