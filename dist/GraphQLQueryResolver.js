"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphQLQueryResolver = void 0;
var LoaderNamingStrategy_1 = require("./enums/LoaderNamingStrategy");
var Formatter_1 = require("./lib/Formatter");
var ConfigureLoader_1 = require("./ConfigureLoader");
var crypto = require("crypto");
var filters_1 = require("./lib/filters");
var GraphQLQueryResolver = (function () {
    function GraphQLQueryResolver(_a) {
        var primaryKeyColumn = _a.primaryKeyColumn, namingStrategy = _a.namingStrategy, maxQueryDepth = _a.maxQueryDepth;
        this._namingStrategy = namingStrategy !== null && namingStrategy !== void 0 ? namingStrategy : LoaderNamingStrategy_1.LoaderNamingStrategyEnum.CAMELCASE;
        this._primaryKeyColumn = primaryKeyColumn;
        this._formatter = new Formatter_1.Formatter(this._namingStrategy);
        this._maxDepth = maxQueryDepth !== null && maxQueryDepth !== void 0 ? maxQueryDepth : Infinity;
    }
    GraphQLQueryResolver._generateChildHash = function (alias, propertyName, length) {
        if (length === void 0) { length = 0; }
        var hash = crypto.createHash("md5");
        hash.update(alias + "__" + propertyName);
        var output = hash.digest("hex");
        if (length != 0) {
            return output.slice(0, length);
        }
        return output;
    };
    GraphQLQueryResolver.prototype.createQuery = function (model, selection, connection, queryBuilder, alias, context, depth) {
        if (depth === void 0) { depth = 0; }
        var meta = connection.getMetadata(model);
        if (selection) {
            queryBuilder = this._selectFields(queryBuilder, selection, meta, alias, context);
            queryBuilder = this._selectEmbeddedFields(queryBuilder, selection, meta, alias, context);
            queryBuilder = this._selectRequiredFields(queryBuilder, selection, alias, meta, context);
            if (depth < this._maxDepth) {
                queryBuilder = this._selectRelations(queryBuilder, selection, meta, alias, context, connection, depth);
            }
        }
        return queryBuilder;
    };
    GraphQLQueryResolver.prototype._selectEmbeddedFields = function (queryBuilder, selection, meta, alias, context) {
        var _this = this;
        var graphQLFieldNames = ConfigureLoader_1.getGraphQLFieldNames(meta.target);
        var ignoredFields = ConfigureLoader_1.getLoaderIgnoredFields(meta.target);
        var embeddedFieldsToSelect = [];
        meta.embeddeds
            .filter(filters_1.requestedEmbeddedFieldsFilter(ignoredFields, graphQLFieldNames, selection, context))
            .forEach(function (field) {
            var _a;
            var embeddedFieldName = (_a = graphQLFieldNames.get(field.propertyName)) !== null && _a !== void 0 ? _a : field.propertyName;
            if (selection.hasOwnProperty(embeddedFieldName)) {
                var embeddedSelection_1 = selection[embeddedFieldName];
                var embeddedFieldColumnNames = field.columns.map(function (column) { return column.propertyName; });
                embeddedFieldsToSelect.push(embeddedFieldColumnNames
                    .filter(function (columnName) {
                    var _a;
                    var embeddedGraphQLFieldNames = ConfigureLoader_1.getGraphQLFieldNames(field.type);
                    var graphQLName = (_a = embeddedGraphQLFieldNames.get(columnName)) !== null && _a !== void 0 ? _a : columnName;
                    return embeddedSelection_1.children.hasOwnProperty(graphQLName);
                })
                    .map(function (columnName) { return field.propertyName + "." + columnName; }));
            }
        });
        embeddedFieldsToSelect.flat().forEach(function (field) {
            queryBuilder = queryBuilder.addSelect(_this._formatter.columnSelection(alias, field));
        });
        return queryBuilder;
    };
    GraphQLQueryResolver.prototype._selectFields = function (queryBuilder, selection, meta, alias, context) {
        var _this = this;
        var ignoredFields = ConfigureLoader_1.getLoaderIgnoredFields(meta.target);
        var graphQLFieldNames = ConfigureLoader_1.getGraphQLFieldNames(meta.target);
        var requestedFields = meta.columns.filter(filters_1.requestedFieldsFilter(ignoredFields, graphQLFieldNames, selection, context));
        queryBuilder = this._selectPrimaryKey(queryBuilder, requestedFields, alias);
        requestedFields.forEach(function (field) {
            var propertyName = field.propertyName;
            var databaseName = field.databaseName;
            queryBuilder = queryBuilder.addSelect(_this._formatter.columnSelection(alias, propertyName), _this._formatter.aliasField(alias, databaseName));
        });
        return queryBuilder;
    };
    GraphQLQueryResolver.prototype._selectPrimaryKey = function (qb, fields, alias) {
        var _this = this;
        if (!this._primaryKeyColumn) {
            return qb;
        }
        var queriedPrimaryKey = fields.find(function (field) { return field.propertyName === _this._primaryKeyColumn; });
        if (queriedPrimaryKey === null || queriedPrimaryKey === void 0 ? void 0 : queriedPrimaryKey.isPrimary) {
            return qb;
        }
        if (!queriedPrimaryKey) {
            return qb.addSelect(this._formatter.columnSelection(alias, this._primaryKeyColumn), this._formatter.aliasField(alias, this._primaryKeyColumn));
        }
        else {
            return qb;
        }
    };
    GraphQLQueryResolver.prototype._selectRelations = function (queryBuilder, selection, meta, alias, context, connection, depth) {
        var _this = this;
        var relations = meta.relations;
        var ignoredFields = ConfigureLoader_1.getLoaderIgnoredFields(meta.target);
        var requiredFields = ConfigureLoader_1.getLoaderRequiredFields(meta.target);
        var graphQLFieldNames = ConfigureLoader_1.getGraphQLFieldNames(meta.target);
        var sqlJoinAliases = ConfigureLoader_1.getSQLJoinAliases(meta.target);
        relations
            .filter(filters_1.requestedRelationFilter(ignoredFields, requiredFields, graphQLFieldNames, selection, context))
            .forEach(function (relation) {
            var _a, _b, _c;
            var relationGraphQLName = (_a = graphQLFieldNames.get(relation.propertyName)) !== null && _a !== void 0 ? _a : relation.propertyName;
            var childAlias = (_b = sqlJoinAliases.get(relation.propertyName)) !== null && _b !== void 0 ? _b : GraphQLQueryResolver._generateChildHash(alias, relation.propertyName, 10);
            if (ConfigureLoader_1.resolvePredicate(requiredFields.get(relation.propertyName), context, selection)) {
                queryBuilder = queryBuilder.leftJoinAndSelect(_this._formatter.columnSelection(alias, relation.propertyName), childAlias);
            }
            else {
                queryBuilder = queryBuilder.leftJoin(_this._formatter.columnSelection(alias, relation.propertyName), childAlias);
            }
            queryBuilder = _this.createQuery(relation.inverseEntityMetadata.target, (_c = selection[relationGraphQLName]) === null || _c === void 0 ? void 0 : _c.children, connection, queryBuilder, childAlias, context, depth + 1);
        });
        return queryBuilder;
    };
    GraphQLQueryResolver.prototype._selectRequiredFields = function (queryBuilder, children, alias, meta, context) {
        var requiredFields = ConfigureLoader_1.getLoaderRequiredFields(meta.target);
        var columns = meta.columns.filter(function (col) {
            var predicate = requiredFields.get(col.propertyName);
            return (!col.relationMetadata && ConfigureLoader_1.resolvePredicate(predicate, context, children));
        });
        var embeds = meta.embeddeds.filter(function (embed) {
            var predicate = requiredFields.get(embed.propertyName);
            return ConfigureLoader_1.resolvePredicate(predicate, context, children);
        });
        queryBuilder = this._selectRequiredColumns(queryBuilder, columns, alias);
        queryBuilder = this._selectRequiredEmbeds(queryBuilder, embeds, alias);
        return queryBuilder;
    };
    GraphQLQueryResolver.prototype._selectRequiredColumns = function (queryBuilder, columns, alias) {
        var _this = this;
        columns.forEach(function (col) {
            var propertyName = col.propertyName, databaseName = col.databaseName;
            if (!col.relationMetadata) {
                queryBuilder = queryBuilder.addSelect(_this._formatter.columnSelection(alias, propertyName), _this._formatter.aliasField(alias, databaseName));
            }
        });
        return queryBuilder;
    };
    GraphQLQueryResolver.prototype._selectRequiredEmbeds = function (queryBuilder, embeds, alias) {
        var _this = this;
        embeds.forEach(function (embed) {
            var embedName = embed.propertyName, embedColumns = embed.columns;
            embedColumns.forEach(function (_a) {
                var propertyName = _a.propertyName;
                queryBuilder.addSelect(_this._formatter.columnSelection(alias, embedName + "." + propertyName));
            });
        });
        return queryBuilder;
    };
    return GraphQLQueryResolver;
}());
exports.GraphQLQueryResolver = GraphQLQueryResolver;
//# sourceMappingURL=GraphQLQueryResolver.js.map