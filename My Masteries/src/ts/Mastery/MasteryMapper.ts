import { IChampionMastery } from "../Interfaces";
import Cache = require('../Cache');
import { MasteriesProfile } from "./MasteryProfile";
import { Champion } from "../Champion/Champion";
import { ChampionsDataNotFound } from "../Exceptions/Exceptions";

export async function mapMasteries(masteries: Array<IChampionMastery>) {
    const champions = await Cache.getChampions();
    const masteriesProfile = new MasteriesProfile(masteries);

    masteries.forEach((championMastery) => {
        const champion: Champion = champions[`${championMastery.championId}`];
        try {
            mapSimpleAttributes(champion, championMastery, masteriesProfile);
            mapComplexAttributes(champion, masteriesProfile, champions, championMastery);
        } catch (e) {
            throw new ChampionsDataNotFound(`Champion ${champion.id} attributes not found`);
        }
    });

    return masteriesProfile;
}

function mapComplexAttributes(champion: object, masteriesProfile: MasteriesProfile, champions: {}, championMastery: IChampionMastery) {
    ['info', 'advancedStats'].forEach((attribute) => {
        const championAttributeKeys = Object.keys(champion[attribute]);
        championAttributeKeys.forEach((subAttribute) => {
            if (subAttribute != 'damageRating') {
                mapSubAttribute(attribute, subAttribute);
            }
            else {
                mapDamageRating(attribute, subAttribute);
            }
        });
    });

    function mapDamageRating(attribute: string, subAttribute: string) {
        const championDamageRating = champion[attribute][subAttribute];
        const damageRating = masteriesProfile.advancedStats.get(subAttribute);

        damageRating[championDamageRating] = damageRating[championDamageRating] + 1 || 1;
    }

    function mapSubAttribute(attribute: string, subAttribute: string) {
        const currentStatScore = masteriesProfile[attribute].get(subAttribute) || 0;
        const subAttributeValue = champions[championMastery.championId][attribute][subAttribute] || 0;
        const masteryCoefficient = (championMastery.championPoints / masteriesProfile.totalMasteryPoints) * subAttributeValue;

        masteriesProfile[attribute].set(`${subAttribute}`, currentStatScore + masteryCoefficient);
    }
}

function mapSimpleAttributes(champion: object, championMastery: IChampionMastery, masteriesProfile: MasteriesProfile) {
    ['tags', 'advancedTags', 'lanes'].forEach((attribute) => {
        champion[attribute].forEach((subAttribute) => {
            const subAttributeName = `${subAttribute.toLowerCase()}MasteryPoints`;
            const subAttributeScore = championMastery.championPoints + (masteriesProfile[attribute].get(subAttributeName) || 0);

            masteriesProfile[attribute].set(`${subAttributeName}`, subAttributeScore);
        });
    });
}
