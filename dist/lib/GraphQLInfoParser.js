"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphQLInfoParser = void 0;
var graphql_parse_resolve_info_1 = require("graphql-parse-resolve-info");
var GraphQLInfoParser = (function () {
    function GraphQLInfoParser() {
    }
    GraphQLInfoParser.prototype.parseResolveInfoModels = function (info, fieldName) {
        var data = graphql_parse_resolve_info_1.parseResolveInfo(info);
        if (data === null || data === void 0 ? void 0 : data.fieldsByTypeName)
            return this.recursiveInfoParser(data, true, fieldName === null || fieldName === void 0 ? void 0 : fieldName.split("."));
        return {};
    };
    GraphQLInfoParser.prototype.recursiveInfoParser = function (data, root, fieldNames) {
        var _this = this;
        var result = {};
        var requestedFieldsByTypeName = data.fieldsByTypeName;
        var requestedFieldCount = Object.keys(requestedFieldsByTypeName).length;
        if (requestedFieldCount === 0)
            return {};
        var path = fieldNames === null || fieldNames === void 0 ? void 0 : fieldNames.shift();
        if (path) {
            if (root && requestedFieldCount > 1) {
                var subpath = fieldNames === null || fieldNames === void 0 ? void 0 : fieldNames.shift();
                if (!subpath)
                    throw new Error("Invalid path. Missing subpath");
                return this.recursiveInfoParser(requestedFieldsByTypeName[path][subpath], false, fieldNames);
            }
        }
        Object.values(requestedFieldsByTypeName).forEach(function (childFields) {
            if (path) {
                result = _this.recursiveInfoParser(childFields[path], false, fieldNames);
            }
            else {
                Object.entries(childFields).forEach(function (_a) {
                    var fieldName = _a[0], field = _a[1];
                    result[fieldName] = {
                        children: Object.keys(field).length
                            ? _this.recursiveInfoParser(field, false, fieldNames)
                            : {},
                        arguments: field.args,
                    };
                });
            }
        });
        return result;
    };
    return GraphQLInfoParser;
}());
exports.GraphQLInfoParser = GraphQLInfoParser;
//# sourceMappingURL=GraphQLInfoParser.js.map