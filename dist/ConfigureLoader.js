"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSQLJoinAliases = exports.resolvePredicate = exports.getGraphQLFieldNames = exports.getLoaderIgnoredFields = exports.getLoaderRequiredFields = exports.ConfigureLoader = void 0;
require("reflect-metadata");
var keys = {
    IGNORE_FIELD: Symbol("gqlLoader:ignoreField"),
    REQUIRED_FIELD: Symbol("gqlLoader:requiredField"),
    GRAPHQL_NAME: Symbol("gqlLoader:graphQLName"),
    SQL_JOIN_ALIAS: Symbol("gqlLoader:sqlJoinAlias"),
};
var defaultLoaderFieldConfiguration = {
    ignore: false,
    required: false,
};
exports.ConfigureLoader = function (options) {
    var _a = __assign(__assign({}, defaultLoaderFieldConfiguration), options), required = _a.required, ignore = _a.ignore, graphQLName = _a.graphQLName, sqlJoinAlias = _a.sqlJoinAlias;
    return function (target, propertyKey) {
        var _a, _b, _c, _d;
        var ignoreSettings = (_a = Reflect.getMetadata(keys.IGNORE_FIELD, target.constructor)) !== null && _a !== void 0 ? _a : new Map();
        ignoreSettings.set(propertyKey, ignore);
        Reflect.defineMetadata(keys.IGNORE_FIELD, ignoreSettings, target.constructor);
        var requiredSettings = (_b = Reflect.getMetadata(keys.REQUIRED_FIELD, target.constructor)) !== null && _b !== void 0 ? _b : new Map();
        requiredSettings.set(propertyKey, required);
        Reflect.defineMetadata(keys.REQUIRED_FIELD, requiredSettings, target.constructor);
        var graphQLFieldNames = (_c = Reflect.getMetadata(keys.GRAPHQL_NAME, target.constructor)) !== null && _c !== void 0 ? _c : new Map();
        graphQLFieldNames.set(propertyKey, graphQLName !== null && graphQLName !== void 0 ? graphQLName : propertyKey);
        Reflect.defineMetadata(keys.GRAPHQL_NAME, graphQLFieldNames, target.constructor);
        var sqlJoinAliases = (_d = Reflect.getMetadata(keys.SQL_JOIN_ALIAS, target.constructor)) !== null && _d !== void 0 ? _d : new Map();
        sqlJoinAliases.set(propertyKey, sqlJoinAlias);
        Reflect.defineMetadata(keys.SQL_JOIN_ALIAS, sqlJoinAliases, target.constructor);
    };
};
exports.getLoaderRequiredFields = function (target) { var _a; return (_a = Reflect.getMetadata(keys.REQUIRED_FIELD, target)) !== null && _a !== void 0 ? _a : new Map(); };
exports.getLoaderIgnoredFields = function (target) { var _a; return (_a = Reflect.getMetadata(keys.IGNORE_FIELD, target)) !== null && _a !== void 0 ? _a : new Map(); };
exports.getGraphQLFieldNames = function (target) { var _a; return (_a = Reflect.getMetadata(keys.GRAPHQL_NAME, target)) !== null && _a !== void 0 ? _a : new Map(); };
exports.resolvePredicate = function (predicate, context, selection) {
    return typeof predicate === "function"
        ? predicate(context, Object.getOwnPropertyNames(selection !== null && selection !== void 0 ? selection : {}), selection !== null && selection !== void 0 ? selection : {})
        : predicate;
};
exports.getSQLJoinAliases = function (target) { var _a; return (_a = Reflect.getMetadata(keys.SQL_JOIN_ALIAS, target)) !== null && _a !== void 0 ? _a : new Map(); };
//# sourceMappingURL=ConfigureLoader.js.map