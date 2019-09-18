"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var InvalidArgumentError = /** @class */ (function (_super) {
    __extends(InvalidArgumentError, _super);
    function InvalidArgumentError(message) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, message) || this;
        Object.setPrototypeOf(_this, _newTarget.prototype);
        _this.name = InvalidArgumentError.name;
        return _this;
    }
    return InvalidArgumentError;
}(Error));
exports.InvalidArgumentError = InvalidArgumentError;
var SummonerNotFound = /** @class */ (function (_super) {
    __extends(SummonerNotFound, _super);
    function SummonerNotFound(message) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, message) || this;
        Object.setPrototypeOf(_this, _newTarget.prototype);
        _this.name = SummonerNotFound.name;
        return _this;
    }
    return SummonerNotFound;
}(Error));
exports.SummonerNotFound = SummonerNotFound;
var MasteriesNotFound = /** @class */ (function (_super) {
    __extends(MasteriesNotFound, _super);
    function MasteriesNotFound(message) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, message) || this;
        Object.setPrototypeOf(_this, _newTarget.prototype);
        _this.name = MasteriesNotFound.name;
        return _this;
    }
    return MasteriesNotFound;
}(Error));
exports.MasteriesNotFound = MasteriesNotFound;
