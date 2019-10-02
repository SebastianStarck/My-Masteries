export class InvalidArgumentError extends Error {
    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = InvalidArgumentError.name;
    }
}

export class SummonerNotFound extends Error {
    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = SummonerNotFound.name;
    }
}

export class MasteriesNotFound extends Error {
    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = MasteriesNotFound.name;
    }
}

export class ChampionsDataNotFound extends Error {
    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = ChampionsDataNotFound.name;
    }
}

export class InvalidMasteryProfileAttributeMap extends Error {
    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = InvalidMasteryProfileAttributeMap.name;
    }
}
