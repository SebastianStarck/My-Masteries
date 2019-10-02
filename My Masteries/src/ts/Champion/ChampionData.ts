import Cache = require('../Cache');
const axios = require('axios');

// TODO: Tidy up error handling
export async function retrieveChampionsData(): Promise<object> {
    const source = `http://ddragon.leagueoflegends.com/cdn/${process.env.DDRAGON_VERSION}/data/${Cache.getLocale()}/champion.json`;
    let response = await axios.get(source).catch((e) => console.log(e));

    return response.data.data || {};
}

export function getChampionName(id: number): string {
    return championMap.get(id);
}

export function getChampionsByLane(): object {
    return {
        top: [
            'Aatrox', 'Akali', 'Camille', 'ChoGath', 'Darius', 'DrMundo', 'Fiora', 'Gangplank', 'Garen',
            'Gnar', 'Illaoi', 'Irelia', 'Jax', 'Jayce', 'Kayle', 'Kennen', 'Kled', 'Malphite', 'Maokai',
            'Mordekaiser', 'Nasus', 'Olaf', 'Ornn', 'Pantheon', 'Poppy', 'Quinn', 'Renekton', 'Riven',
            'Rumble', 'Ryze', 'Shen', 'Singed', 'Sion', 'Swain', 'Sylas', 'Tahm', 'Kench', 'Tahm', 'Kench',
            'Teemo', 'Tryndamere', 'Urgot', 'Vayne', 'Viktor', 'Vladimir', 'Volibear', 'MonkeyKing', 'Yasuo', 'Yorick',
        ],
        jungle: [
            'Aatrox', 'Amumu', 'DrMundo', 'Elise', 'Evelynn', 'Gragas', 'Graves', 'Hecarim', 'Ivern',
            'JarvanIV', 'Jax', 'Karthus', 'Kayn', 'Khazix', 'Kindred', 'LeeSin', 'Malphite', 'MasterYi',
            'Nautilus', 'Nidalee', 'Nocturne', 'Nunu', 'Olaf', 'Pantheon', 'Rammus', 'RekSai', 'Rengar',
            'Sejuani', 'Shaco', 'Shyvana', 'Skarner', 'Sylas', 'Taliyah', 'Trundle', 'Udyr', 'Vi', 'Volibear',
            'Warwick', 'MonkeyKing', 'XinZhao', 'Zac',
        ],
        mid: [
            'Aatrox', 'Ahri', 'Akali', 'Anivia', 'Annie', 'AurelionSol', 'Azir', 'Brand', 'Cassiopeia', 'Corki',
            'Diana', 'Ekko', 'Fizz', 'Heimerdinger', 'Irelia', 'Kassadin', 'Katarina', 'KogMaw', 'Leblanc',
            'Lissandra', 'Lux', 'Malzahar', 'Neeko', 'Orianna', 'Pantheon', 'Qiyana', 'Ryze', 'Swain', 'Sylas',
            'Syndra', 'Taliyah', 'Talon', 'Tristana', 'TwistedFate', 'Veigar', 'Velkoz', 'Viktor', 'Vladimir',
            'Xerath', 'Yasuo', 'Zed', 'Ziggs', 'Zilean', 'Zoe', 'Zyra',
        ],
        bottom: [
            'Ashe', 'Caitlyn', 'Draven', 'Ezreal', 'Jhin', 'Jinx', 'Kaisa', 'Kalista', 'KogMaw', 'Lucian',
            'Lucian', 'MissFortune', 'Mordekaiser', 'Quinn', 'Sivir', 'Swain', 'Tristana', 'Twitch', 'Varus',
            'Vayne', 'Vladimir', 'Xayah', 'Yasuo',
        ],
        support: [
            'Alistar', 'Bard', 'Blitzcrank', 'Brand', 'Braum', 'Fiddlesticks', 'Galio', 'Janna', 'Karma',
            'Leona', 'Lulu', 'Lux', 'Malphite', 'Morgana', 'Nami', 'Nautilus', 'Pyke', 'Rakan', 'Sona',
            'Soraka', 'Swain', 'TahmKench', 'Taric', 'Thresh', 'Veigar', 'Velkoz', 'Volibear', 'Xerath',
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
            'Pantheon', 'RekSai', 'Rengar', 'Skarner', 'Vi', 'Warwick', 'MonkeyKing', 'XinZhao',
        ],
        juggernaut: [
            'Aatrox', 'Darius', 'DrMundo', 'Garen', 'Illaoi', 'Mordekaiser',
            'Nasus', 'Shyvana', 'Trundle', 'Udyr', 'Urgot', 'Volibear', 'Yorick'
        ],

        // Mages
        burst: [
            'Ahri', 'Annie', 'Brand', 'Karma', 'Leblanc', 'Lissandra', 'Lux', 'Neeko',
            'Orianna', 'Sylas', 'Syndra', 'TwistedFate', 'Veigar', 'Zoe', 'Zyra'
        ],
        battlemage: [
            'Anivia', 'AurelionSol', 'Cassiopeia', 'Karthus', 'Malzahar', 'Morgana',
            'Rumble', 'Ryze', 'Swain', 'Taliyah', 'Viktor', 'Vladimir',
        ],
        artillery: [
            'Jayce', 'Lux', 'Varus', 'Velkoz', 'Xerath', 'Ziggs', 'Zoe',
        ],

        // Marksman
        marksman: [
            'Ashe', 'Caitlyn', 'Corki', 'Draven', 'Ezreal', 'Jhin', 'Jinx', 'Kaisa', 'Kalista', 'Kindred',
            'KogMaw', 'Lucian', 'MissFortune', 'Sivir', 'Tristana', 'Twitch', 'Varus', 'Vayne', 'Xayah'
        ],

        // Slayers
        assassin: [
            'Ahri', 'Akali', 'Diana', 'Ekko', 'Evelynn', 'Fizz', 'Kassadin', 'Kayn',
            'Khazix', 'Nocturne', 'Pyke', 'Qiyana', 'Rengar', 'Shaco', 'Talon', 'Zed',
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

export function getChampionBaseTagNames(): Array<string> {
    return [
        'fighter', 'tank', 'support', 'marksman', 'mage', 'assassin'
    ];
}

export function getChampionInfoStats(): Array<string> {
    return [
        'attack', 'defense', 'magic',
    ];
}

export function getChampionAdvancedStats(champion: string): object {
    const champions = {
        Aatrox: { damage: 3, toughness: 3, control: 2, mobility: 2, utility: 2, damageStyle: 20, damageRating: 'physical', difficulty: 2 },
        Ahri: { damage: 3, toughness: 1, control: 2, mobility: 3, utility: 0, damageStyle: 100, damageRating: 'magic', difficulty: 2 },
        Akali: { damage: 3, toughness: 1, control: 1, mobility: 3, utility: 1, damageStyle: 65, damageRating: 'mixed', difficulty: 2 },
        Alistar: { damage: 1, toughness: 3, control: 3, mobility: 1, utility: 2, damageStyle: 65, damageRating: 'magic', difficulty: 1 },
        Amumu: { damage: 2, toughness: 3, control: 3, mobility: 1, utility: 0, damageStyle: 90, damageRating: 'magic', difficulty: 1 },
        Anivia: { damage: 3, toughness: 1, control: 3, mobility: 0, utility: 2, damageStyle: 100, damageRating: 'magic', difficulty: 3 },
        Annie: { damage: 3, toughness: 1, control: 3, mobility: 1, utility: 2, damageStyle: 100, damageRating: 'magic', difficulty: 1 },
        Ashe: { damage: 2, toughness: 0, control: 3, mobility: 0, utility: 2, damageStyle: 20, damageRating: 'physical', difficulty: 1 },
        AurelionSol: { damage: 3, toughness: 0, control: 2, mobility: 2, utility: 0, damageStyle: 100, damageRating: 'magic', difficulty: 3 },
        Azir: { damage: 3, toughness: 1, control: 2, mobility: 2, utility: 1, damageStyle: 45, damageRating: 'magic', difficulty: 3 },
        Bard: { damage: 1, toughness: 1, control: 3, mobility: 2, utility: 3, damageStyle: 65, damageRating: 'magic', difficulty: 3 },
        Blitzcrank: { damage: 1, toughness: 2, control: 3, mobility: 1, utility: 0, damageStyle: 90, damageRating: 'magic', difficulty: 1 },
        Brand: { damage: 3, toughness: 0, control: 2, mobility: 0, utility: 0, damageStyle: 100, damageRating: 'magic', difficulty: 2 },
        Braum: { damage: 1, toughness: 2, control: 3, mobility: 1, utility: 2, damageStyle: 90, damageRating: 'magic', difficulty: 2 },
        Caitlyn: { damage: 3, toughness: 0, control: 2, mobility: 2, utility: 0, damageStyle: 10, damageRating: 'physical', difficulty: 1 },
        Camille: { damage: 3, toughness: 2, control: 2, mobility: 3, utility: 0, damageStyle: 40, damageRating: 'physical', difficulty: 3 },
        Cassiopeia: { damage: 3, toughness: 1, control: 3, mobility: 1, utility: 0, damageStyle: 100, damageRating: 'magic', difficulty: 3 },
        Chogath: { damage: 2, toughness: 3, control: 2, mobility: 0, utility: 1, damageStyle: 65, damageRating: 'magic', difficulty: 1 },
        Corki: { damage: 3, toughness: 0, control: 1, mobility: 2, utility: 0, damageStyle: 45, damageRating: 'mixed', difficulty: 2 },
        Darius: { damage: 3, toughness: 2, control: 2, mobility: 0, utility: 0, damageStyle: 55, damageRating: 'physical', difficulty: 2 },
        Diana: { damage: 3, toughness: 2, control: 2, mobility: 2, utility: 0, damageStyle: 65, damageRating: 'magic', difficulty: 1 },
        DrMundo: { damage: 2, toughness: 3, control: 1, mobility: 0, utility: 0, damageStyle: 55, damageRating: 'mixed', difficulty: 1 },
        Draven: { damage: 3, toughness: 0, control: 1, mobility: 2, utility: 0, damageStyle: 10, damageRating: 'physical', difficulty: 3 },
        Ekko: { damage: 3, toughness: 2, control: 2, mobility: 3, utility: 0, damageStyle: 75, damageRating: 'magic', difficulty: 3 },
        Elise: { damage: 2, toughness: 2, control: 2, mobility: 2, utility: 0, damageStyle: 65, damageRating: 'magic', difficulty: 3 },
        Evelynn: { damage: 2, toughness: 2, control: 1, mobility: 2, utility: 2, damageStyle: 75, damageRating: 'magic', difficulty: 2 },
        Ezreal: { damage: 3, toughness: 0, control: 0, mobility: 3, utility: 0, damageStyle: 45, damageRating: 'mixed', difficulty: 1 },
        Fiddlesticks: { damage: 3, toughness: 1, control: 3, mobility: 1, utility: 0, damageStyle: 100, damageRating: 'magic', difficulty: 2 },
        Fiora: { damage: 3, toughness: 2, control: 2, mobility: 2, utility: 2, damageStyle: 20, damageRating: 'physical', difficulty: 3 },
        Fizz: { damage: 3, toughness: 1, control: 2, mobility: 3, utility: 0, damageStyle: 90, damageRating: 'magic', difficulty: 3 },
        Galio: { damage: 2, toughness: 3, control: 3, mobility: 2, utility: 1, damageStyle: 100, damageRating: 'magic', difficulty: 2 },
        Gangplank: { damage: 3, toughness: 1, control: 1, mobility: 1, utility: 2, damageStyle: 75, damageRating: 'physical', difficulty: 3 },
        Garen: { damage: 2, toughness: 3, control: 1, mobility: 1, utility: 0, damageStyle: 75, damageRating: 'physical', difficulty: 1 },
        Gnar: { damage: 2, toughness: 1, control: 1, mobility: 2, utility: 0, damageStyle: 45, damageRating: 'physical', difficulty: 3 },
        Gragas: { damage: 2, toughness: 3, control: 3, mobility: 2, utility: 0, damageStyle: 90, damageRating: 'magic', difficulty: 2 },
        Graves: { damage: 3, toughness: 2, control: 1, mobility: 2, utility: 2, damageStyle: 20, damageRating: 'physical', difficulty: 2 },
        Hecarim: { damage: 2, toughness: 2, control: 2, mobility: 2, utility: 0, damageStyle: 65, damageRating: 'physical', difficulty: 2 },
        Heimerdinger: { damage: 3, toughness: 0, control: 2, mobility: 0, utility: 2, damageStyle: 100, damageRating: 'magic', difficulty: 2 },
        Illaoi: { damage: 3, toughness: 2, control: 1, mobility: 0, utility: 0, damageStyle: 65, damageRating: 'physical', difficulty: 2 },
        Irelia: { damage: 2, toughness: 2, control: 2, mobility: 3, utility: 2, damageStyle: 30, damageRating: 'physical', difficulty: 3 },
        Ivern: { damage: 1, toughness: 1, control: 3, mobility: 2, utility: 3, damageStyle: 10, damageRating: 'magic', difficulty: 3 },
        Janna: { damage: 1, toughness: 1, control: 3, mobility: 1, utility: 3, damageStyle: 100, damageRating: 'magic', difficulty: 1 },
        JarvanIV: { damage: 2, toughness: 2, control: 2, mobility: 2, utility: 2, damageStyle: 55, damageRating: 'physical', difficulty: 1 },
        Jax: { damage: 3, toughness: 2, control: 2, mobility: 2, utility: 0, damageStyle: 10, damageRating: 'mixed', difficulty: 2 },
        Jayce: { damage: 3, toughness: 0, control: 1, mobility: 2, utility: 2, damageStyle: 45, damageRating: 'physical', difficulty: 2 },
        Jhin: { damage: 3, toughness: 0, control: 2, mobility: 1, utility: 0, damageStyle: 20, damageRating: 'physical', difficulty: 2 },
        Jinx: { damage: 3, toughness: 0, control: 2, mobility: 1, utility: 0, damageStyle: 10, damageRating: 'physical', difficulty: 2 },
        Kaisa: { damage: 3, toughness: 1, control: 0, mobility: 3, utility: 1, damageStyle: 10, damageRating: 'magic', difficulty: 2 },
        Kalista: { damage: 3, toughness: 0, control: 1, mobility: 3, utility: 2, damageStyle: 10, damageRating: 'physical', difficulty: 3 },
        Karma: { damage: 2, toughness: 1, control: 2, mobility: 1, utility: 2, damageStyle: 100, damageRating: 'magic', difficulty: 1 },
        Karthus: { damage: 3, toughness: 0, control: 1, mobility: 0, utility: 2, damageStyle: 100, damageRating: 'magic', difficulty: 2 },
        Kassadin: { damage: 3, toughness: 2, control: 1, mobility: 3, utility: 0, damageStyle: 90, damageRating: 'magic', difficulty: 2 },
        Katarina: { damage: 3, toughness: 0, control: 0, mobility: 3, utility: 0, damageStyle: 100, damageRating: 'magic', difficulty: 3 },
        Kayle: { damage: 3, toughness: 1, control: 1, mobility: 1, utility: 3, damageStyle: 20, damageRating: 'physical', difficulty: 2 },
        Kayn: { damage: 3, toughness: 1, control: 1, mobility: 3, utility: 1, damageStyle: 0, damageRating: 'physical', difficulty: 2 },
        Kennen: { damage: 3, toughness: 1, control: 3, mobility: 1, utility: 0, damageStyle: 65, damageRating: 'magic', difficulty: 2 },
        Khazix: { damage: 3, toughness: 1, control: 1, mobility: 2, utility: 0, damageStyle: 55, damageRating: 'physical', difficulty: 2 },
        Kindred: { damage: 3, toughness: 1, control: 2, mobility: 3, utility: 2, damageStyle: 20, damageRating: 'physical', difficulty: 3 },
        Kled: { damage: 3, toughness: 2, control: 1, mobility: 3, utility: 1, damageStyle: 30, damageRating: 'physical', difficulty: 2 },
        KogMaw: { damage: 3, toughness: 0, control: 1, mobility: 0, utility: 1, damageStyle: 10, damageRating: 'mixed', difficulty: 2 },
        Leblanc: { damage: 3, toughness: 0, control: 2, mobility: 3, utility: 0, damageStyle: 100, damageRating: 'magic', difficulty: 3 },
        LeeSin: { damage: 3, toughness: 2, control: 2, mobility: 3, utility: 1, damageStyle: 55, damageRating: 'physical', difficulty: 3 },
        Leona: { damage: 1, toughness: 3, control: 3, mobility: 1, utility: 1, damageStyle: 90, damageRating: 'physical', difficulty: 1 },
        Lissandra: { damage: 3, toughness: 1, control: 3, mobility: 2, utility: 0, damageStyle: 100, damageRating: 'magic', difficulty: 2 },
        Lucian: { damage: 3, toughness: 0, control: 0, mobility: 3, utility: 0, damageStyle: 30, damageRating: 'physical', difficulty: 2 },
        Lulu: { damage: 2, toughness: 1, control: 2, mobility: 1, utility: 3, damageStyle: 80, damageRating: 'magic', difficulty: 2 },
        Lux: { damage: 3, toughness: 1, control: 2, mobility: 0, utility: 2, damageStyle: 90, damageRating: 'magic', difficulty: 1 },
        Malphite: { damage: 1, toughness: 3, control: 3, mobility: 1, utility: 0, damageStyle: 75, damageRating: 'magic', difficulty: 1 },
        Malzahar: { damage: 3, toughness: 1, control: 3, mobility: 0, utility: 2, damageStyle: 100, damageRating: 'magic', difficulty: 1 },
        Maokai: { damage: 1, toughness: 3, control: 3, mobility: 1, utility: 2, damageStyle: 75, damageRating: 'magic', difficulty: 1 },
        MasterYi: { damage: 3, toughness: 1, control: 0, mobility: 2, utility: 0, damageStyle: 10, damageRating: 'physical', difficulty: 1 },
        MissFortune: { damage: 3, toughness: 0, control: 1, mobility: 1, utility: 0, damageStyle: 30, damageRating: 'physical', difficulty: 1 },
        Mordekaiser: { damage: 3, toughness: 2, control: 1, mobility: 0, utility: 2, damageStyle: 80, damageRating: 'magic', difficulty: 2 },
        Morgana: { damage: 2, toughness: 1, control: 3, mobility: 1, utility: 2, damageStyle: 100, damageRating: 'magic', difficulty: 1 },
        Nami: { damage: 1, toughness: 1, control: 3, mobility: 1, utility: 2, damageStyle: 90, damageRating: 'magic', difficulty: 2 },
        Nasus: { damage: 2, toughness: 3, control: 2, mobility: 0, utility: 1, damageStyle: 20, damageRating: 'physical', difficulty: 1 },
        Nautilus: { damage: 1, toughness: 3, control: 3, mobility: 1, utility: 0, damageStyle: 80, damageRating: 'magic', difficulty: 2 },
        Neeko: { damage: 3, toughness: 1, control: 3, mobility: 1, utility: 1, damageStyle: 80, damageRating: 'magic', difficulty: 1 },
        Nidalee: { damage: 3, toughness: 1, control: 0, mobility: 3, utility: 2, damageStyle: 75, damageRating: 'magic', difficulty: 3 },
        Nocturne: { damage: 3, toughness: 1, control: 2, mobility: 2, utility: 2, damageStyle: 30, damageRating: 'physical', difficulty: 1 },
        Nunu: { damage: 1, toughness: 3, control: 2, mobility: 1, utility: 2, damageStyle: 80, damageRating: 'magic', difficulty: 1 },
        Olaf: { damage: 2, toughness: 2, control: 2, mobility: 1, utility: 0, damageStyle: 30, damageRating: 'physical', difficulty: 2 },
        Orianna: { damage: 2, toughness: 1, control: 2, mobility: 1, utility: 2, damageStyle: 90, damageRating: 'magic', difficulty: 2 },
        Ornn: { damage: 1, toughness: 3, control: 3, mobility: 1, utility: 2, damageStyle: 60, damageRating: 'physical', difficulty: 2 },
        Pantheon: { damage: 3, toughness: 2, control: 2, mobility: 2, utility: 0, damageStyle: 75, damageRating: 'physical', difficulty: 1 },
        Poppy: { damage: 2, toughness: 3, control: 3, mobility: 2, utility: 0, damageStyle: 75, damageRating: 'physical', difficulty: 2 },
        Pyke: { damage: 2, toughness: 0, control: 3, mobility: 3, utility: 1, damageStyle: 50, damageRating: 'physical', difficulty: 2 },
        Qiyana: { damage: 3, toughness: 1, control: 2, mobility: 2, utility: 1, damageStyle: 70, damageRating: 'physical', difficulty: 2 },
        Quinn: { damage: 3, toughness: 0, control: 2, mobility: 3, utility: 1, damageStyle: 20, damageRating: 'physical', difficulty: 2 },
        Rakan: { damage: 1, toughness: 2, control: 3, mobility: 3, utility: 3, damageStyle: 90, damageRating: 'magic', difficulty: 2 },
        Rammus: { damage: 2, toughness: 3, control: 3, mobility: 2, utility: 1, damageStyle: 65, damageRating: 'mixed', difficulty: 1 },
        RekSai: { damage: 2, toughness: 2, control: 2, mobility: 2, utility: 2, damageStyle: 30, damageRating: 'physical', difficulty: 2 },
        Renekton: { damage: 2, toughness: 2, control: 2, mobility: 2, utility: 1, damageStyle: 45, damageRating: 'physical', difficulty: 1 },
        Rengar: { damage: 3, toughness: 1, control: 2, mobility: 2, utility: 1, damageStyle: 30, damageRating: 'physical', difficulty: 2 },
        Riven: { damage: 3, toughness: 2, control: 2, mobility: 3, utility: 0, damageStyle: 75, damageRating: 'physical', difficulty: 2 },
        Rumble: { damage: 3, toughness: 2, control: 2, mobility: 1, utility: 0, damageStyle: 90, damageRating: 'magic', difficulty: 3 },
        Ryze: { damage: 3, toughness: 0, control: 2, mobility: 2, utility: 2, damageStyle: 100, damageRating: 'magic', difficulty: 2 },
        Sejuani: { damage: 2, toughness: 2, control: 3, mobility: 2, utility: 0, damageStyle: 75, damageRating: 'magic', difficulty: 2 },
        Shaco: { damage: 3, toughness: 1, control: 2, mobility: 2, utility: 2, damageStyle: 45, damageRating: 'physical', difficulty: 2 },
        Shen: { damage: 2, toughness: 3, control: 2, mobility: 2, utility: 3, damageStyle: 45, damageRating: 'mixed', difficulty: 2 },
        Shyvana: { damage: 2, toughness: 2, control: 0, mobility: 2, utility: 0, damageStyle: 55, damageRating: 'physical', difficulty: 1 },
        Singed: { damage: 2, toughness: 3, control: 2, mobility: 2, utility: 0, damageStyle: 100, damageRating: 'magic', difficulty: 2 },
        Sion: { damage: 2, toughness: 3, control: 3, mobility: 1, utility: 0, damageStyle: 65, damageRating: 'physical', difficulty: 1 },
        Sivir: { damage: 3, toughness: 1, control: 0, mobility: 1, utility: 2, damageStyle: 10, damageRating: 'physical', difficulty: 2 },
        Skarner: { damage: 1, toughness: 3, control: 3, mobility: 1, utility: 1, damageStyle: 45, damageRating: 'mixed', difficulty: 1 },
        Sona: { damage: 2, toughness: 1, control: 2, mobility: 1, utility: 2, damageStyle: 90, damageRating: 'magic', difficulty: 1 },
        Soraka: { damage: 1, toughness: 1, control: 2, mobility: 1, utility: 3, damageStyle: 100, damageRating: 'magic', difficulty: 1 },
        Swain: { damage: 2, toughness: 2, control: 2, mobility: 0, utility: 1, damageStyle: 100, damageRating: 'magic', difficulty: 2 },
        Sylas: { damage: 2, toughness: 2, control: 1, mobility: 3, utility: 1, damageStyle: 70, damageRating: 'magic', difficulty: 3 },
        Syndra: { damage: 3, toughness: 0, control: 2, mobility: 0, utility: 0, damageStyle: 100, damageRating: 'magic', difficulty: 2 },
        TahmKench: { damage: 2, toughness: 3, control: 2, mobility: 1, utility: 3, damageStyle: 65, damageRating: 'magic', difficulty: 1 },
        Taliyah: { damage: 3, toughness: 0, control: 2, mobility: 1, utility: 3, damageStyle: 100, damageRating: 'magic', difficulty: 2 },
        Talon: { damage: 3, toughness: 1, control: 1, mobility: 2, utility: 1, damageStyle: 65, damageRating: 'physical', difficulty: 2 },
        Taric: { damage: 1, toughness: 2, control: 2, mobility: 0, utility: 3, damageStyle: 75, damageRating: 'physical', difficulty: 2 },
        Teemo: { damage: 3, toughness: 0, control: 2, mobility: 1, utility: 2, damageStyle: 30, damageRating: 'magic', difficulty: 1 },
        Thresh: { damage: 1, toughness: 2, control: 3, mobility: 1, utility: 3, damageStyle: 75, damageRating: 'magic', difficulty: 3 },
        Tristana: { damage: 3, toughness: 0, control: 2, mobility: 2, utility: 0, damageStyle: 20, damageRating: 'physical', difficulty: 1 },
        Trundle: { damage: 2, toughness: 3, control: 1, mobility: 1, utility: 2, damageStyle: 20, damageRating: 'physical', difficulty: 1 },
        Tryndamere: { damage: 3, toughness: 2, control: 1, mobility: 2, utility: 0, damageStyle: 10, damageRating: 'physical', difficulty: 1 },
        TwistedFate: { damage: 3, toughness: 0, control: 2, mobility: 2, utility: 2, damageStyle: 65, damageRating: 'magic', difficulty: 2 },
        Twitch: { damage: 3, toughness: 0, control: 1, mobility: 2, utility: 0, damageStyle: 0, damageRating: 'physical', difficulty: 2 },
        Udyr: { damage: 2, toughness: 3, control: 2, mobility: 2, utility: 0, damageStyle: 35, damageRating: 'mixed', difficulty: 2 },
        Urgot: { damage: 2, toughness: 2, control: 2, mobility: 1, utility: 1, damageStyle: 55, damageRating: 'physical', difficulty: 2 },
        Varus: { damage: 3, toughness: 0, control: 2, mobility: 0, utility: 0, damageStyle: 20, damageRating: 'physical', difficulty: 2 },
        Vayne: { damage: 3, toughness: 0, control: 2, mobility: 2, utility: 0, damageStyle: 0, damageRating: 'physical', difficulty: 2 },
        Veigar: { damage: 3, toughness: 1, control: 3, mobility: 1, utility: 1, damageStyle: 100, damageRating: 'magic', difficulty: 2 },
        Velkoz: { damage: 3, toughness: 0, control: 2, mobility: 0, utility: 1, damageStyle: 100, damageRating: 'magic', difficulty: 2 },
        Vi: { damage: 2, toughness: 2, control: 3, mobility: 2, utility: 1, damageStyle: 55, damageRating: 'physical', difficulty: 1 },
        Viktor: { damage: 3, toughness: 1, control: 2, mobility: 1, utility: 1, damageStyle: 90, damageRating: 'magic', difficulty: 3 },
        Vladimir: { damage: 3, toughness: 2, control: 1, mobility: 1, utility: 1, damageStyle: 100, damageRating: 'magic', difficulty: 2 },
        Volibear: { damage: 2, toughness: 3, control: 2, mobility: 2, utility: 0, damageStyle: 30, damageRating: 'physical', difficulty: 1 },
        Warwick: { damage: 2, toughness: 2, control: 2, mobility: 1, utility: 1, damageStyle: 30, damageRating: 'mixed', difficulty: 1 },
        MonkeyKing: { damage: 2, toughness: 2, control: 2, mobility: 2, utility: 1, damageStyle: 55, damageRating: 'physical', difficulty: 1 },
        Xayah: { damage: 3, toughness: 2, control: 3, mobility: 1, utility: 0, damageStyle: 30, damageRating: 'physical', difficulty: 2 },
        Xerath: { damage: 3, toughness: 0, control: 2, mobility: 0, utility: 1, damageStyle: 90, damageRating: 'magic', difficulty: 2 },
        XinZhao: { damage: 2, toughness: 2, control: 2, mobility: 2, utility: 1, damageStyle: 35, damageRating: 'physical', difficulty: 1 },
        Yasuo: { damage: 3, toughness: 1, control: 2, mobility: 3, utility: 2, damageStyle: 20, damageRating: 'physical', difficulty: 3 },
        Yorick: { damage: 2, toughness: 2, control: 2, mobility: 0, utility: 2, damageStyle: 55, damageRating: 'mixed', difficulty: 2 },
        Yuumi: { damage: 1, toughness: 1, control: 1, mobility: 3, utility: 3, damageStyle: 100, damageRating: 'magic', difficulty: 1 },
        Zac: { damage: 2, toughness: 3, control: 3, mobility: 2, utility: 0, damageStyle: 100, damageRating: 'magic', difficulty: 1 },
        Zed: { damage: 3, toughness: 0, control: 1, mobility: 3, utility: 0, damageStyle: 55, damageRating: 'physical', difficulty: 3 },
        Ziggs: { damage: 3, toughness: 0, control: 2, mobility: 2, utility: 0, damageStyle: 90, damageRating: 'magic', difficulty: 2 },
        Zilean: { damage: 2, toughness: 1, control: 2, mobility: 2, utility: 3, damageStyle: 100, damageRating: 'magic', difficulty: 2 },
        Zoe: { damage: 3, toughness: 1, control: 2, mobility: 2, utility: 1, damageStyle: 100, damageRating: 'magic', difficulty: 3 },
        Zyra: { damage: 3, toughness: 0, control: 3, mobility: 0, utility: 1, damageStyle: 100, damageRating: 'magic', difficulty: 2 },
    }

    return champions[champion];
}

export function getChampionAdvancedTags(champion: string): Array<string> {
    const championsByAdvancedTags = getChampionsByAdvancedTags();
    const advancedTagNames = getChampionAdvancedTagNames();

    console.log(champion, 'foo');
    return advancedTagNames.filter(function (tag: string) {
        return championsByAdvancedTags[tag].indexOf(champion) != -1;
    });
}

export function getChampionLanes(champion: string): Array<string> {
    const championsByLane = getChampionsByLane();
    const laneNames = getChampionLanesNames();

    return laneNames.filter(function (lane: string) {
        return championsByLane[lane].indexOf(champion) != -1;
    });
}

export function getChampionsAdvancedStatNames(): Array<string> {
    return [
        'damage', 'toughness', 'control', 'mobility', 'utility', 'damageStyle', 'damageRating', 'difficulty'
    ];
}

const championMap: Map<number, string> = new Map([
    [266, 'Aatrox'],
    [103, 'Ahri'],
    [84, 'Akali'],
    [12, 'Alistar'],
    [32, 'Amumu'],
    [34, 'Anivia'],
    [1, 'Annie'],
    [22, 'Ashe'],
    [136, 'AurelionSol'],
    [268, 'Azir'],
    [432, 'Bard'],
    [53, 'Blitzcrank'],
    [63, 'Brand'],
    [201, 'Braum'],
    [51, 'Caitlyn'],
    [164, 'Camille'],
    [69, 'Cassiopeia'],
    [31, 'Chogath'],
    [42, 'Corki'],
    [122, 'Darius'],
    [131, 'Diana'],
    [119, 'Draven'],
    [36, 'DrMundo'],
    [245, 'Ekko'],
    [60, 'Elise'],
    [28, 'Evelynn'],
    [81, 'Ezreal'],
    [9, 'Fiddlesticks'],
    [114, 'Fiora'],
    [105, 'Fizz'],
    [3, 'Galio'],
    [41, 'Gangplank'],
    [86, 'Garen'],
    [150, 'Gnar'],
    [79, 'Gragas'],
    [104, 'Graves'],
    [120, 'Hecarim'],
    [74, 'Heimerdinger'],
    [420, 'Illaoi'],
    [39, 'Irelia'],
    [427, 'Ivern'],
    [40, 'Janna'],
    [59, 'JarvanIV'],
    [24, 'Jax'],
    [126, 'Jayce'],
    [202, 'Jhin'],
    [222, 'Jinx'],
    [145, 'Kaisa'],
    [429, 'Kalista'],
    [43, 'Karma'],
    [30, 'Karthus'],
    [38, 'Kassadin'],
    [55, 'Katarina'],
    [10, 'Kayle'],
    [141, 'Kayn'],
    [85, 'Kennen'],
    [121, 'Khazix'],
    [203, 'Kindred'],
    [240, 'Kled'],
    [96, 'KogMaw'],
    [7, 'Leblanc'],
    [64, 'LeeSin'],
    [89, 'Leona'],
    [127, 'Lissandra'],
    [236, 'Lucian'],
    [117, 'Lulu'],
    [99, 'Lux'],
    [54, 'Malphite'],
    [90, 'Malzahar'],
    [57, 'Maokai'],
    [11, 'MasterYi'],
    [21, 'MissFortune'],
    [62, 'MonkeyKing'],
    [82, 'Mordekaiser'],
    [25, 'Morgana'],
    [267, 'Nami'],
    [75, 'Nasus'],
    [111, 'Nautilus'],
    [518, 'Neeko'],
    [76, 'Nidalee'],
    [56, 'Nocturne'],
    [20, 'Nunu'],
    [2, 'Olaf'],
    [61, 'Orianna'],
    [516, 'Ornn'],
    [80, 'Pantheon'],
    [78, 'Poppy'],
    [555, 'Pyke'],
    [133, 'Quinn'],
    [497, 'Rakan'],
    [33, 'Rammus'],
    [421, 'RekSai'],
    [58, 'Renekton'],
    [107, 'Rengar'],
    [92, 'Riven'],
    [68, 'Rumble'],
    [13, 'Ryze'],
    [113, 'Sejuani'],
    [35, 'Shaco'],
    [98, 'Shen'],
    [102, 'Shyvana'],
    [27, 'Singed'],
    [14, 'Sion'],
    [15, 'Sivir'],
    [72, 'Skarner'],
    [37, 'Sona'],
    [16, 'Soraka'],
    [50, 'Swain'],
    [517, 'Sylas'],
    [134, 'Syndra'],
    [223, 'TahmKench'],
    [163, 'Taliyah'],
    [91, 'Talon'],
    [44, 'Taric'],
    [17, 'Teemo'],
    [412, 'Thresh'],
    [18, 'Tristana'],
    [48, 'Trundle'],
    [23, 'Tryndamere'],
    [4, 'TwistedFate'],
    [29, 'Twitch'],
    [77, 'Udyr'],
    [6, 'Urgot'],
    [110, 'Varus'],
    [67, 'Vayne'],
    [45, 'Veigar'],
    [161, 'Velkoz'],
    [254, 'Vi'],
    [112, 'Viktor'],
    [8, 'Vladimir'],
    [106, 'Volibear'],
    [19, 'Warwick'],
    [498, 'Xayah'],
    [101, 'Xerath'],
    [5, 'XinZhao'],
    [157, 'Yasuo'],
    [83, 'Yorick'],
    [154, 'Zac'],
    [238, 'Zed'],
    [115, 'Ziggs'],
    [26, 'Zilean'],
    [142, 'Zoe'],
    [143, 'Zyra']
]);