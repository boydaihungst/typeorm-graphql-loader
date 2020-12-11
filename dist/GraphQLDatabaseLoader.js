"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphQLDatabaseLoader = void 0;
var GraphQLQueryBuilder_1 = require("./GraphQLQueryBuilder");
var GraphQLQueryManager_1 = require("./GraphQLQueryManager");
var GraphQLDatabaseLoader = (function () {
    function GraphQLDatabaseLoader(connection, options) {
        if (options === void 0) { options = {}; }
        this._queryManager = new GraphQLQueryManager_1.GraphQLQueryManager(connection, options);
    }
    GraphQLDatabaseLoader.prototype.loadEntity = function (entity, alias) {
        return new GraphQLQueryBuilder_1.GraphQLQueryBuilder(this._queryManager, entity, alias);
    };
    return GraphQLDatabaseLoader;
}());
exports.GraphQLDatabaseLoader = GraphQLDatabaseLoader;
//# sourceMappingURL=GraphQLDatabaseLoader.js.map