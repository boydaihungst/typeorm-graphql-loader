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
exports.GraphQLQueryManager = void 0;
var typeorm_cursor_pagination_1 = require("typeorm-cursor-pagination");
var LoaderSearchMethod_1 = require("./enums/LoaderSearchMethod");
var crypto = require("crypto");
var typeorm_1 = require("typeorm");
var GraphQLQueryResolver_1 = require("./GraphQLQueryResolver");
var Formatter_1 = require("./lib/Formatter");
var LoaderNamingStrategy_1 = require("./enums/LoaderNamingStrategy");
var GraphQLQueryManager = (function () {
    function GraphQLQueryManager(_connection, options) {
        if (options === void 0) { options = {}; }
        var _a;
        this._connection = _connection;
        this._queue = [];
        this._cache = new Map();
        var defaultSearchMethod = options.defaultSearchMethod;
        this._defaultLoaderSearchMethod = defaultSearchMethod !== null && defaultSearchMethod !== void 0 ? defaultSearchMethod : LoaderSearchMethod_1.LoaderSearchMethod.ANY_POSITION;
        this._resolver = new GraphQLQueryResolver_1.GraphQLQueryResolver(options);
        this._formatter = new Formatter_1.Formatter((_a = options.namingStrategy) !== null && _a !== void 0 ? _a : LoaderNamingStrategy_1.LoaderNamingStrategyEnum.CAMELCASE);
    }
    GraphQLQueryManager.createTypeORMQueryBuilder = function (entityManager, name, alias) {
        return entityManager
            .getRepository(name)
            .createQueryBuilder(alias)
            .select([]);
    };
    GraphQLQueryManager._breakDownWhereExpression = function (where) {
        if (where instanceof typeorm_1.Brackets) {
            return { where: where, params: undefined };
        }
        else {
            var asExpression = where;
            return { where: asExpression.condition, params: asExpression.params };
        }
    };
    GraphQLQueryManager.prototype.processQueryMeta = function (fields, where, alias) {
        var hash = crypto.createHash('md5');
        var key = hash
            .update(JSON.stringify([where, fields, alias]))
            .digest()
            .toString('hex');
        if (this._cache.has(key)) {
            return {
                fields: fields,
                key: '',
                item: this._cache.get(key),
                found: true,
            };
        }
        if (this._immediate) {
            clearImmediate(this._immediate);
        }
        return {
            fields: fields,
            key: key,
            found: false,
        };
    };
    GraphQLQueryManager.prototype.addQueueItem = function (item) {
        this._queue.push(item);
        this._setImmediate();
    };
    GraphQLQueryManager.prototype.addCacheItem = function (key, value) {
        this._cache.set(key, value);
    };
    GraphQLQueryManager.prototype._setImmediate = function () {
        var _this = this;
        this._immediate = setImmediate(function () { return _this._processQueue(); });
    };
    GraphQLQueryManager.prototype._processQueue = function () {
        return __awaiter(this, void 0, void 0, function () {
            var queue, queryRunner, e_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        queue = this._queue.splice(0, this._queue.length);
                        queryRunner = this._connection.createQueryRunner('slave');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4, queryRunner.connect()];
                    case 2:
                        _a.sent();
                        return [4, Promise.all(queue.map(this._resolveQueueItem(queryRunner.manager)))];
                    case 3:
                        _a.sent();
                        return [3, 5];
                    case 4:
                        e_1 = _a.sent();
                        queue.forEach(function (q) {
                            q.reject(e_1);
                            _this._cache.delete(q.key);
                        });
                        return [3, 5];
                    case 5: return [4, queryRunner.release()];
                    case 6:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    GraphQLQueryManager.prototype._resolveQueueItem = function (entityManager) {
        var _this = this;
        return function (item) { return __awaiter(_this, void 0, void 0, function () {
            var name, alias, queryBuilder, promise, paginator;
            var _this = this;
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                name = typeof item.entity == 'string' ? item.entity : item.entity.name;
                alias = (_a = item.alias) !== null && _a !== void 0 ? _a : name;
                queryBuilder = GraphQLQueryManager.createTypeORMQueryBuilder(entityManager, name, alias);
                queryBuilder = this._resolver.createQuery(name, item.fields, entityManager.connection, queryBuilder, alias, item.context);
                queryBuilder = this._addSelectFields(queryBuilder, alias, item.predicates.selectFields);
                queryBuilder = this._addAndWhereConditions(queryBuilder, item.predicates.andWhere);
                queryBuilder = this._addOrWhereConditions(queryBuilder, item.predicates.orWhere);
                queryBuilder = this._addSearchConditions(queryBuilder, alias, item.predicates.search);
                queryBuilder = this._addOrderByCondition(queryBuilder, item.predicates.order);
                if ((_b = item.pagination) === null || _b === void 0 ? void 0 : _b.offset) {
                    queryBuilder = this._addPagination(queryBuilder, item.pagination);
                }
                queryBuilder = item.ejectQueryCallback(queryBuilder);
                if ((_c = item.pagination) === null || _c === void 0 ? void 0 : _c.offset) {
                    promise = queryBuilder.getManyAndCount();
                }
                if ((_d = item.pagination) === null || _d === void 0 ? void 0 : _d.query) {
                    paginator = typeorm_cursor_pagination_1.buildPaginator(__assign({ query: {
                            limit: 10,
                            order: 'ASC',
                        }, paginationKeys: ['id'], alias: alias, entity: item.entity }, item.pagination));
                    promise = paginator.paginate(queryBuilder);
                }
                else if (item.many) {
                    promise = queryBuilder.getMany();
                }
                else {
                    promise = queryBuilder.getOne();
                }
                return [2, promise
                        .then(item.resolve, item.reject)
                        .finally(function () { return _this._cache.delete(item.key); })];
            });
        }); };
    };
    GraphQLQueryManager.prototype._addAndWhereConditions = function (qb, conditions) {
        var initialWhere = conditions.shift();
        if (!initialWhere)
            return qb;
        var _a = GraphQLQueryManager._breakDownWhereExpression(initialWhere), where = _a.where, params = _a.params;
        qb = qb.where(where, params);
        conditions.forEach(function (condition) {
            var _a = GraphQLQueryManager._breakDownWhereExpression(condition), where = _a.where, params = _a.params;
            qb = qb.andWhere(where, params);
        });
        return qb;
    };
    GraphQLQueryManager.prototype._addOrWhereConditions = function (qb, conditions) {
        conditions.forEach(function (condition) {
            var _a = GraphQLQueryManager._breakDownWhereExpression(condition), where = _a.where, params = _a.params;
            qb = qb.orWhere(where, params);
        });
        return qb;
    };
    GraphQLQueryManager.prototype._addSearchConditions = function (qb, alias, searchConditions) {
        this._formatSearchConditions(searchConditions, alias).forEach(function (_a) {
            var query = _a.query, params = _a.params;
            qb = qb.andWhere(query, params);
        });
        return qb;
    };
    GraphQLQueryManager.prototype._formatSearchConditions = function (conditions, alias) {
        var _this = this;
        return conditions.map(function (_a) {
            var searchColumns = _a.searchColumns, searchMethod = _a.searchMethod, searchText = _a.searchText, caseSensitive = _a.caseSensitive;
            var method = searchMethod || _this._defaultLoaderSearchMethod;
            var likeQueryStrings = _this._formatter.formatSearchColumns(searchColumns, alias, caseSensitive);
            var searchTextParam = _this._formatter.getSearchMethodMapping(method, searchText);
            return {
                query: "(" + likeQueryStrings.join(' OR ') + ")",
                params: { searchText: searchTextParam },
            };
        });
    };
    GraphQLQueryManager.prototype._addPagination = function (queryBuilder, pagination) {
        if (pagination) {
            queryBuilder = queryBuilder.offset(pagination.offset);
            queryBuilder = queryBuilder.limit(pagination.limit);
        }
        return queryBuilder;
    };
    GraphQLQueryManager.prototype._addOrderByCondition = function (queryBuilder, order) {
        return queryBuilder.orderBy(order);
    };
    GraphQLQueryManager.prototype._addSelectFields = function (queryBuilder, alias, selectFields) {
        var _this = this;
        selectFields.forEach(function (field) {
            queryBuilder = queryBuilder.addSelect(_this._formatter.columnSelection(alias, field), _this._formatter.aliasField(alias, field));
        });
        return queryBuilder;
    };
    return GraphQLQueryManager;
}());
exports.GraphQLQueryManager = GraphQLQueryManager;
//# sourceMappingURL=GraphQLQueryManager.js.map