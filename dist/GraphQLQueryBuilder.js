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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphQLQueryBuilder = void 0;
var GraphQLInfoParser_1 = require("./lib/GraphQLInfoParser");
var GraphQLQueryBuilder = (function () {
    function GraphQLQueryBuilder(_manager, _entity, _alias) {
        this._manager = _manager;
        this._entity = _entity;
        this._alias = _alias;
        this._info = null;
        this._andWhereExpressions = [];
        this._orWhereExpressions = [];
        this._searchExpressions = [];
        this._order = {};
        this._withDelete = false;
        this._selectFields = [];
        this._parser = new GraphQLInfoParser_1.GraphQLInfoParser();
        this._ejectQueryCallback = null;
    }
    GraphQLQueryBuilder.prototype.info = function (info, fieldName) {
        this._info = this._parser.parseResolveInfoModels(info, fieldName);
        return this;
    };
    GraphQLQueryBuilder.prototype.where = function (where, params) {
        if (typeof where === 'string') {
            this._andWhereExpressions.push({
                condition: where,
                params: params,
            });
        }
        else {
            this._andWhereExpressions.push(where);
        }
        return this;
    };
    GraphQLQueryBuilder.prototype.withDelete = function (withDeleted) {
        this._withDelete = withDeleted;
        return this;
    };
    GraphQLQueryBuilder.prototype.orWhere = function (where, params) {
        if (typeof where === 'string') {
            this._orWhereExpressions.push({ condition: where, params: params });
        }
        else {
            this._orWhereExpressions.push(where);
        }
        return this;
    };
    GraphQLQueryBuilder.prototype.search = function (searchOptions) {
        this._searchExpressions.push(searchOptions);
        return this;
    };
    GraphQLQueryBuilder.prototype.order = function (order) {
        this._order = __assign(__assign({}, this._order), order);
        return this;
    };
    GraphQLQueryBuilder.prototype.selectFields = function (fields) {
        this._selectFields.push(fields);
        return this;
    };
    GraphQLQueryBuilder.prototype.paginate = function (pagination) {
        this._pagination = pagination;
        return this;
    };
    GraphQLQueryBuilder.prototype.context = function (context) {
        this._context = context;
        return this;
    };
    GraphQLQueryBuilder.prototype.ejectQueryBuilder = function (cb) {
        this._ejectQueryCallback = cb;
        return this;
    };
    GraphQLQueryBuilder.prototype.loadOne = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this._genericLoad(false, false)];
            });
        });
    };
    GraphQLQueryBuilder.prototype.loadMany = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this._genericLoad(true, false)];
            });
        });
    };
    GraphQLQueryBuilder.prototype.loadPaginated = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this._pagination) {
                    throw new Error('Must provide pagination object before calling load paginated');
                }
                return [2, this._genericLoad(true, true)];
            });
        });
    };
    GraphQLQueryBuilder.prototype.loadCursorPaginated = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this._pagination) {
                    throw new Error('Must provide pagination object before calling load paginated');
                }
                return [2, this._genericLoad(true, true)];
            });
        });
    };
    GraphQLQueryBuilder.prototype._genericLoad = function (many, paginate) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var cacheAlias, _b, fields, found, key, item, executor, promise;
            var _this = this;
            return __generator(this, function (_c) {
                this._validateInfo(this._info);
                cacheAlias = (_a = this._alias) !== null && _a !== void 0 ? _a : (typeof this._entity === 'function' ? this._entity.name : this._entity);
                _b = this._manager.processQueryMeta(this._info, this._andWhereExpressions, cacheAlias), fields = _b.fields, found = _b.found, key = _b.key, item = _b.item;
                if (found && item) {
                    return [2, item];
                }
                executor = function (resolve, reject) {
                    var _a;
                    _this._manager.addQueueItem({
                        many: many,
                        key: key,
                        fields: fields,
                        predicates: _this._getQueryPredicates(),
                        resolve: resolve,
                        reject: reject,
                        entity: _this._entity,
                        pagination: paginate ? _this._pagination : undefined,
                        alias: _this._alias,
                        context: _this._context,
                        ejectQueryCallback: (_a = _this._ejectQueryCallback) !== null && _a !== void 0 ? _a : (function (qb) { return qb; }),
                    });
                };
                promise = new Promise(executor);
                this._manager.addCacheItem(key, promise);
                return [2, promise];
            });
        });
    };
    GraphQLQueryBuilder.prototype._validateInfo = function (info) {
        if (!this._info) {
            throw new Error('Missing GraphQL Resolve info. Please invoke `.info()` before calling this method');
        }
    };
    GraphQLQueryBuilder.prototype._getQueryPredicates = function () {
        return {
            search: this._searchExpressions,
            andWhere: this._andWhereExpressions,
            orWhere: this._orWhereExpressions,
            order: this._order,
            withDeleted: this._withDelete,
            selectFields: this._selectFields.flat(),
        };
    };
    return GraphQLQueryBuilder;
}());
exports.GraphQLQueryBuilder = GraphQLQueryBuilder;
//# sourceMappingURL=GraphQLQueryBuilder.js.map