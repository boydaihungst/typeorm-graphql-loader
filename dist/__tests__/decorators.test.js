"use strict";
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
var chai = require("chai");
var testStartup_1 = require("./util/testStartup");
require("reflect-metadata");
var entity_1 = require("./entity");
var graphql_1 = require("graphql");
var expect = chai.expect;
describe("ConfigureLoader", function () {
    var helpers;
    var dt;
    before(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, testStartup_1.startup("configure_loader", { logging: false })];
                case 1:
                    helpers = _a.sent();
                    return [4, helpers.connection
                            .getRepository(entity_1.DecoratorTest)
                            .findOne({ relations: ["testRelation", "testRemappedRelation"] })];
                case 2:
                    dt = _a.sent();
                    return [2];
            }
        });
    }); });
    it("Can successfully execute a query against an entity with decorators", function () { return __awaiter(void 0, void 0, void 0, function () {
        var schema, loader, query, vars, result, expected;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    schema = helpers.schema, loader = helpers.loader;
                    query = "\n      query DecoratorTest($dtId: Int!) {\n        decoratorTests(dtId: $dtId) {\n          id\n          testField\n          testRelation {\n            id\n          }\n          testEmbed {\n            street\n          }\n        }\n      }\n    ";
                    vars = { dtId: dt === null || dt === void 0 ? void 0 : dt.id };
                    return [4, graphql_1.graphql(schema, query, {}, { loader: loader }, vars)];
                case 1:
                    result = _b.sent();
                    expected = {
                        id: dt === null || dt === void 0 ? void 0 : dt.id,
                        testField: dt === null || dt === void 0 ? void 0 : dt.testField,
                        testRelation: {
                            id: dt === null || dt === void 0 ? void 0 : dt.testRelation.id,
                        },
                        testEmbed: {
                            street: dt === null || dt === void 0 ? void 0 : dt.testEmbed.street,
                        },
                    };
                    expect(result.errors).to.be.undefined;
                    expect((_a = result.data) === null || _a === void 0 ? void 0 : _a.decoratorTests).to.deep.equal(expected);
                    return [2];
            }
        });
    }); });
    describe("requiring fields", function () {
        it("loads a required field even when not requested", function () { return __awaiter(void 0, void 0, void 0, function () {
            var schema, loader, query, vars, result, expected;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        schema = helpers.schema, loader = helpers.loader;
                        query = "\n      query DecoratorTest($dtId: Int!, $requireField: Boolean) {\n        decoratorTests(dtId: $dtId, requireField: $requireField) {\n          id\n          testRelation {\n            id\n          }\n          testEmbed {\n            street\n          }\n        }\n      }\n    ";
                        vars = { dtId: dt === null || dt === void 0 ? void 0 : dt.id, requireField: true };
                        return [4, graphql_1.graphql(schema, query, {}, { loader: loader }, vars)];
                    case 1:
                        result = _b.sent();
                        expected = {
                            id: dt === null || dt === void 0 ? void 0 : dt.id,
                            testRelation: {
                                id: dt === null || dt === void 0 ? void 0 : dt.testRelation.id,
                            },
                            testEmbed: {
                                street: dt === null || dt === void 0 ? void 0 : dt.testEmbed.street,
                            },
                        };
                        expect(result.errors).to.be.undefined;
                        expect((_a = result.data) === null || _a === void 0 ? void 0 : _a.decoratorTests).to.deep.equal(expected);
                        return [2];
                }
            });
        }); });
        it("loads a required relation even when not requested", function () { return __awaiter(void 0, void 0, void 0, function () {
            var schema, loader, query, vars, result, expected;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        schema = helpers.schema, loader = helpers.loader;
                        query = "\n      query DecoratorTest($dtId: Int!, $requireRelation: Boolean) {\n        decoratorTests(dtId: $dtId, requireRelation: $requireRelation) {\n          id\n          testField\n          testEmbed {\n            street\n          } \n        }\n      }\n    ";
                        vars = { dtId: dt === null || dt === void 0 ? void 0 : dt.id, requireRelation: true };
                        return [4, graphql_1.graphql(schema, query, {}, { loader: loader }, vars)];
                    case 1:
                        result = _b.sent();
                        expected = {
                            id: dt === null || dt === void 0 ? void 0 : dt.id,
                            testField: dt === null || dt === void 0 ? void 0 : dt.testField,
                            testEmbed: {
                                street: dt === null || dt === void 0 ? void 0 : dt.testEmbed.street,
                            },
                        };
                        expect(result.errors).to.be.undefined;
                        expect((_a = result.data) === null || _a === void 0 ? void 0 : _a.decoratorTests).to.deep.equal(expected);
                        return [2];
                }
            });
        }); });
        it("loads a required embedded field even when not requested", function () { return __awaiter(void 0, void 0, void 0, function () {
            var schema, loader, query, vars, result, expected;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        schema = helpers.schema, loader = helpers.loader;
                        query = "\n      query DecoratorTest($dtId: Int!, $requireEmbed: Boolean) {\n        decoratorTests(dtId: $dtId, requireEmbed: $requireEmbed) {\n          id\n          testField\n          testRelation {\n            id\n          }\n        }\n      } \n    ";
                        vars = { dtId: dt === null || dt === void 0 ? void 0 : dt.id, requireEmbed: true };
                        return [4, graphql_1.graphql(schema, query, {}, { loader: loader }, vars)];
                    case 1:
                        result = _b.sent();
                        expected = {
                            id: dt === null || dt === void 0 ? void 0 : dt.id,
                            testField: dt === null || dt === void 0 ? void 0 : dt.testField,
                            testRelation: {
                                id: dt === null || dt === void 0 ? void 0 : dt.testRelation.id,
                            },
                        };
                        expect(result.errors).to.be.undefined;
                        expect((_a = result.data) === null || _a === void 0 ? void 0 : _a.decoratorTests).to.deep.equal(expected);
                        return [2];
                }
            });
        }); });
    });
    describe("ignoring", function () {
        it("ignores fields correctly", function () { return __awaiter(void 0, void 0, void 0, function () {
            var schema, loader, query, vars, result, expected;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        schema = helpers.schema, loader = helpers.loader;
                        query = "\n      query DecoratorTest($dtId: Int!, $ignoreField: Boolean) {\n        decoratorTests(dtId: $dtId, ignoreField: $ignoreField) {\n          id\n          testField\n          testRelation {\n            id\n          }\n          testEmbed {\n            street\n          }\n        }\n      }\n    ";
                        vars = { dtId: dt === null || dt === void 0 ? void 0 : dt.id, ignoreField: true };
                        return [4, graphql_1.graphql(schema, query, {}, { loader: loader }, vars)];
                    case 1:
                        result = _b.sent();
                        expected = {
                            id: dt === null || dt === void 0 ? void 0 : dt.id,
                            testField: null,
                            testRelation: {
                                id: dt === null || dt === void 0 ? void 0 : dt.testRelation.id,
                            },
                            testEmbed: {
                                street: dt === null || dt === void 0 ? void 0 : dt.testEmbed.street,
                            },
                        };
                        expect(result.errors).to.be.undefined;
                        expect((_a = result.data) === null || _a === void 0 ? void 0 : _a.decoratorTests).to.deep.equal(expected);
                        return [2];
                }
            });
        }); });
        it("ignores relations correctly", function () { return __awaiter(void 0, void 0, void 0, function () {
            var schema, loader, query, vars, result, expected;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        schema = helpers.schema, loader = helpers.loader;
                        query = "\n      query DecoratorTest($dtId: Int!, $ignoreRelation: Boolean) {\n        decoratorTests(dtId: $dtId, ignoreRelation: $ignoreRelation) {\n          id\n          testField\n          testRelation {\n            id\n          }\n          testEmbed {\n            street\n          }\n        }\n      }\n    ";
                        vars = { dtId: dt === null || dt === void 0 ? void 0 : dt.id, ignoreRelation: true };
                        return [4, graphql_1.graphql(schema, query, {}, { loader: loader }, vars)];
                    case 1:
                        result = _b.sent();
                        expected = {
                            id: dt === null || dt === void 0 ? void 0 : dt.id,
                            testField: dt === null || dt === void 0 ? void 0 : dt.testField,
                            testRelation: null,
                            testEmbed: {
                                street: dt === null || dt === void 0 ? void 0 : dt.testEmbed.street,
                            },
                        };
                        expect(result.errors).to.be.undefined;
                        expect((_a = result.data) === null || _a === void 0 ? void 0 : _a.decoratorTests).to.deep.equal(expected);
                        return [2];
                }
            });
        }); });
        it("ignores embedded fields correctly", function () { return __awaiter(void 0, void 0, void 0, function () {
            var schema, loader, query, vars, result, expected;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        schema = helpers.schema, loader = helpers.loader;
                        query = "\n      query DecoratorTest($dtId: Int!, $ignoreEmbed: Boolean) {\n        decoratorTests(dtId: $dtId, ignoreEmbed: $ignoreEmbed) {\n          id\n          testField\n          testRelation {\n            id\n          }\n          testEmbed {\n            street\n            city\n          }\n        }\n      }\n    ";
                        vars = { dtId: dt === null || dt === void 0 ? void 0 : dt.id, ignoreEmbed: true };
                        return [4, graphql_1.graphql(schema, query, {}, { loader: loader }, vars)];
                    case 1:
                        result = _b.sent();
                        expected = {
                            id: dt === null || dt === void 0 ? void 0 : dt.id,
                            testField: dt === null || dt === void 0 ? void 0 : dt.testField,
                            testRelation: {
                                id: dt === null || dt === void 0 ? void 0 : dt.testRelation.id,
                            },
                            testEmbed: null,
                        };
                        expect(result.errors).to.be.undefined;
                        expect((_a = result.data) === null || _a === void 0 ? void 0 : _a.decoratorTests).to.deep.equal(expected);
                        return [2];
                }
            });
        }); });
    });
    describe("remap graphql field names", function () {
        it("can remap a field name", function () { return __awaiter(void 0, void 0, void 0, function () {
            var schema, loader, query, vars, result, expected;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        schema = helpers.schema, loader = helpers.loader;
                        query = "\n      query DecoratorTest($dtId: Int!) {\n        decoratorTests(dtId: $dtId) {\n          id\n          remappedField\n        }\n      }\n    ";
                        vars = { dtId: dt === null || dt === void 0 ? void 0 : dt.id };
                        return [4, graphql_1.graphql(schema, query, {}, { loader: loader }, vars)];
                    case 1:
                        result = _b.sent();
                        expected = {
                            id: dt === null || dt === void 0 ? void 0 : dt.id,
                            remappedField: dt === null || dt === void 0 ? void 0 : dt.testRemappedField,
                        };
                        expect(result.errors).to.be.undefined;
                        expect((_a = result.data) === null || _a === void 0 ? void 0 : _a.decoratorTests).to.deep.equal(expected);
                        return [2];
                }
            });
        }); });
        it("can remap a relation name", function () { return __awaiter(void 0, void 0, void 0, function () {
            var schema, loader, query, vars, result, expected;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        schema = helpers.schema, loader = helpers.loader;
                        query = "\n      query DecoratorTest($dtId: Int!) {\n        decoratorTests(dtId: $dtId) {\n          id\n          remappedRelation {\n            id\n            firstName\n          }\n        }\n      }\n    ";
                        vars = { dtId: dt === null || dt === void 0 ? void 0 : dt.id };
                        return [4, graphql_1.graphql(schema, query, {}, { loader: loader }, vars)];
                    case 1:
                        result = _b.sent();
                        expected = {
                            id: dt === null || dt === void 0 ? void 0 : dt.id,
                            remappedRelation: {
                                id: dt === null || dt === void 0 ? void 0 : dt.testRemappedRelation.id,
                                firstName: dt === null || dt === void 0 ? void 0 : dt.testRemappedRelation.firstName,
                            },
                        };
                        expect(result.errors).to.be.undefined;
                        expect((_a = result.data) === null || _a === void 0 ? void 0 : _a.decoratorTests).to.deep.equal(expected);
                        return [2];
                }
            });
        }); });
        it("can remap an embed name", function () { return __awaiter(void 0, void 0, void 0, function () {
            var schema, loader, query, vars, result, expected;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        schema = helpers.schema, loader = helpers.loader;
                        query = "\n      query DecoratorTest($dtId: Int!) {\n        decoratorTests(dtId: $dtId) {\n          id\n          remappedEmbed {\n            street\n            city\n          }\n        }\n      }\n    ";
                        vars = { dtId: dt === null || dt === void 0 ? void 0 : dt.id };
                        return [4, graphql_1.graphql(schema, query, {}, { loader: loader }, vars)];
                    case 1:
                        result = _b.sent();
                        expected = {
                            id: dt === null || dt === void 0 ? void 0 : dt.id,
                            remappedEmbed: {
                                street: dt === null || dt === void 0 ? void 0 : dt.testRemappedEmbed.street,
                                city: dt === null || dt === void 0 ? void 0 : dt.testRemappedEmbed.city,
                            },
                        };
                        expect(result.errors).to.be.undefined;
                        expect((_a = result.data) === null || _a === void 0 ? void 0 : _a.decoratorTests).to.deep.equal(expected);
                        return [2];
                }
            });
        }); });
        it("can remap an embed property name", function () { return __awaiter(void 0, void 0, void 0, function () {
            var schema, loader, query, vars, result, expected;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        schema = helpers.schema, loader = helpers.loader;
                        query = "\n      query DecoratorTest($dtId: Int!) {\n        decoratorTests(dtId: $dtId) {\n          id\n          remappedEmbed {\n            street\n            city\n            unitNumber\n          }\n        }\n      }\n    ";
                        vars = { dtId: dt === null || dt === void 0 ? void 0 : dt.id };
                        return [4, graphql_1.graphql(schema, query, {}, { loader: loader }, vars)];
                    case 1:
                        result = _b.sent();
                        expected = {
                            id: dt === null || dt === void 0 ? void 0 : dt.id,
                            remappedEmbed: {
                                street: dt === null || dt === void 0 ? void 0 : dt.testRemappedEmbed.street,
                                city: dt === null || dt === void 0 ? void 0 : dt.testRemappedEmbed.city,
                                unitNumber: dt === null || dt === void 0 ? void 0 : dt.testRemappedEmbed.street2,
                            },
                        };
                        expect(result.errors).to.be.undefined;
                        expect((_a = result.data) === null || _a === void 0 ? void 0 : _a.decoratorTests).to.deep.equal(expected);
                        return [2];
                }
            });
        }); });
    });
    describe("user defined join alias", function () {
        it("can successfully query on a user defined alias", function () { return __awaiter(void 0, void 0, void 0, function () {
            var schema, loader, connection, relation, entity, query, vars, expected, result;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        schema = helpers.schema, loader = helpers.loader, connection = helpers.connection;
                        return [4, connection.getRepository(entity_1.Author).findOne()];
                    case 1:
                        relation = _b.sent();
                        return [4, connection
                                .getRepository(entity_1.DecoratorTest)
                                .createQueryBuilder("dt")
                                .where("dt.testRelationId = :relationId", { relationId: relation === null || relation === void 0 ? void 0 : relation.id })
                                .getOne()];
                    case 2:
                        entity = _b.sent();
                        query = "\n      query CustomSQLAlias($relationId: Int!) {\n        customSQLAlias(relationId: $relationId) {\n          id\n          createdAt\n          updatedAt\n          testRelation {\n            id\n          }\n        }\n      }\n    ";
                        vars = { relationId: relation === null || relation === void 0 ? void 0 : relation.id };
                        expected = {
                            id: entity === null || entity === void 0 ? void 0 : entity.id,
                            createdAt: entity === null || entity === void 0 ? void 0 : entity.createdAt.toISOString(),
                            updatedAt: entity === null || entity === void 0 ? void 0 : entity.updatedAt.toISOString(),
                            testRelation: {
                                id: relation === null || relation === void 0 ? void 0 : relation.id,
                            },
                        };
                        return [4, graphql_1.graphql(schema, query, {}, { loader: loader }, vars)];
                    case 3:
                        result = _b.sent();
                        expect(result.errors).to.be.undefined;
                        expect((_a = result.data) === null || _a === void 0 ? void 0 : _a.customSQLAlias).to.deep.equal(expected);
                        return [2];
                }
            });
        }); });
    });
});
//# sourceMappingURL=decorators.test.js.map