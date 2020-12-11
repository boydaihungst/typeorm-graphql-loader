"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestedRelationFilter = exports.requestedEmbeddedFieldsFilter = exports.requestedFieldsFilter = void 0;
var ConfigureLoader_1 = require("../ConfigureLoader");
exports.requestedFieldsFilter = function (ignoredFields, graphQLFieldNames, selection, context) { return function (column) {
    var _a;
    var fieldName = (_a = graphQLFieldNames.get(column.propertyName)) !== null && _a !== void 0 ? _a : column.propertyName;
    return (!ConfigureLoader_1.resolvePredicate(ignoredFields.get(column.propertyName), context, selection) &&
        (column.isPrimary || selection.hasOwnProperty(fieldName)));
}; };
exports.requestedEmbeddedFieldsFilter = function (ignoredFields, graphQLFieldNames, selection, context) { return function (embed) {
    var _a;
    var fieldName = (_a = graphQLFieldNames.get(embed.propertyName)) !== null && _a !== void 0 ? _a : embed.propertyName;
    return (!ConfigureLoader_1.resolvePredicate(ignoredFields.get(embed.propertyName), context, selection) && selection.hasOwnProperty(fieldName));
}; };
exports.requestedRelationFilter = function (ignoredFields, requiredFields, graphQLFieldNames, selection, context) { return function (relation) {
    var _a;
    var fieldName = (_a = graphQLFieldNames.get(relation.propertyName)) !== null && _a !== void 0 ? _a : relation.propertyName;
    return (!ConfigureLoader_1.resolvePredicate(ignoredFields.get(relation.propertyName), context, selection) &&
        (selection.hasOwnProperty(fieldName) ||
            ConfigureLoader_1.resolvePredicate(requiredFields.get(relation.propertyName), context, selection)));
}; };
//# sourceMappingURL=filters.js.map