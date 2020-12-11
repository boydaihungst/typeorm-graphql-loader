"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Formatter = void 0;
var __1 = require("..");
var StringUtils_1 = require("typeorm/util/StringUtils");
var Formatter = (function () {
    function Formatter(_namingStrategy) {
        this._namingStrategy = _namingStrategy;
        this._searchMethodMapping = new Map([
            [__1.LoaderSearchMethod.ANY_POSITION, function (text) { return "%" + text + "%"; }],
            [__1.LoaderSearchMethod.STARTS_WITH, function (text) { return text + "%"; }],
            [__1.LoaderSearchMethod.ENDS_WITH, function (text) { return "%" + text; }],
        ]);
    }
    Formatter.prototype.columnSelection = function (alias, field) {
        return alias + "." + field;
    };
    Formatter.prototype.aliasField = function (alias, field) {
        switch (this._namingStrategy) {
            case __1.LoaderNamingStrategyEnum.SNAKECASE:
                return alias + "_" + StringUtils_1.snakeCase(field);
            case __1.LoaderNamingStrategyEnum.CAMELCASE:
                return alias + "_" + field;
            default:
                return alias + "_" + field;
        }
    };
    Formatter.prototype.getSearchMethodMapping = function (method, searchText) {
        return this._searchMethodMapping.get(method)(searchText);
    };
    Formatter.prototype.formatSearchColumns = function (searchColumns, alias, caseSensitive) {
        var _this = this;
        return searchColumns.map(function (field) {
            if (typeof field === "string") {
                var formattedColumnName = _this.columnSelection(alias, field);
                return caseSensitive
                    ? formattedColumnName + " LIKE :searchText"
                    : "LOWER(" + formattedColumnName + ") LIKE LOWER(:searchText)";
            }
            else {
                var joinedFields = field
                    .map(function (item) { return _this.columnSelection(alias, item); })
                    .join(" || ' ' || ");
                return caseSensitive
                    ? joinedFields + " LIKE :searchText"
                    : "LOWER(" + joinedFields + ") LIKE LOWER(:searchText)";
            }
        });
    };
    return Formatter;
}());
exports.Formatter = Formatter;
//# sourceMappingURL=Formatter.js.map