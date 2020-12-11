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
var graphql_1 = require("graphql");
var testStartup_1 = require("./util/testStartup");
var entity_1 = require("./entity");
var Seeder_1 = require("./util/Seeder");
chai.should();
chai.use(require("chai-things"));
var expect = chai.expect;
var TEST_AUTHOR_EMAIL = "testingsearchemail@testingsearch.com";
var TEST_AUTHOR_FIRST_NAME = "testingSearchFirstName";
var TEST_AUTHOR_LAST_NAME = "testingSearchLastName";
var TEST_AUTHOR_PHONE = "123-456-7890";
describe("Search queries", function () {
    var helpers;
    var author;
    before(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, testStartup_1.startup("searching", { logging: false })];
                case 1:
                    helpers = _a.sent();
                    author = helpers.connection.getRepository(entity_1.Author).create({
                        email: TEST_AUTHOR_EMAIL,
                        firstName: TEST_AUTHOR_FIRST_NAME,
                        lastName: TEST_AUTHOR_LAST_NAME,
                        address: Seeder_1.Seeder.addressFactory(),
                        phone: TEST_AUTHOR_PHONE,
                    });
                    return [4, helpers.connection.createEntityManager().save(author)];
                case 2:
                    author = _a.sent();
                    return [2];
            }
        });
    }); });
    it("can perform a search with the default settings", function () { return __awaiter(void 0, void 0, void 0, function () {
        var schema, loader, query, vars, result, expected;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    schema = helpers.schema, loader = helpers.loader;
                    query = "\n      query searchAuthorsByEmail($email: String!) {\n        searchAuthors(searchText: $email) {\n          id\n          firstName\n          lastName\n        }\n      }\n    ";
                    vars = { email: author.email.slice(0, 5) };
                    return [4, graphql_1.graphql(schema, query, {}, { loader: loader }, vars)];
                case 1:
                    result = _b.sent();
                    expected = {
                        id: author.id,
                        firstName: author.firstName,
                        lastName: author.lastName,
                    };
                    expect(result).to.not.have.key("errors");
                    (_a = result.data) === null || _a === void 0 ? void 0 : _a.searchAuthors.should.include.something.that.deep.equals(expected);
                    return [2];
            }
        });
    }); });
    it("can perform a STARTS_WITH search", function () { return __awaiter(void 0, void 0, void 0, function () {
        var schema, loader, query, vars, expected, result;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    schema = helpers.schema, loader = helpers.loader;
                    query = "\n      query searchAuthorsByFirstName($firstName: String!) {\n        searchAuthors(searchText: $firstName, searchMethod: STARTS_WITH) {\n          id\n          firstName\n          lastName\n        }\n      }      \n    ";
                    vars = { firstName: author.firstName.slice(0, 3) };
                    expected = {
                        id: author.id,
                        firstName: author.firstName,
                        lastName: author.lastName,
                    };
                    return [4, graphql_1.graphql(schema, query, {}, { loader: loader }, vars)];
                case 1:
                    result = _b.sent();
                    expect(result).to.not.have.key("errors");
                    (_a = result.data) === null || _a === void 0 ? void 0 : _a.searchAuthors.should.include.something.that.deep.equals(expected);
                    return [2];
            }
        });
    }); });
    it("can perform an ENDS_WITH search", function () { return __awaiter(void 0, void 0, void 0, function () {
        var schema, loader, query, vars, expected, result;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    schema = helpers.schema, loader = helpers.loader;
                    query = "\n      query searchAuthorsByFirstName($firstName: String!) {\n        searchAuthors(searchText: $firstName, searchMethod: ENDS_WITH) {\n          id\n          firstName\n          lastName\n        }\n      }      \n    ";
                    vars = {
                        firstName: author.firstName.slice(3, author.firstName.length),
                    };
                    expected = {
                        id: author.id,
                        firstName: author.firstName,
                        lastName: author.lastName,
                    };
                    return [4, graphql_1.graphql(schema, query, {}, { loader: loader }, vars)];
                case 1:
                    result = _b.sent();
                    expect(result).to.not.have.key("errors");
                    (_a = result.data) === null || _a === void 0 ? void 0 : _a.searchAuthors.should.include.something.that.deep.equals(expected);
                    return [2];
            }
        });
    }); });
    it("can perform a search on combined columns", function () { return __awaiter(void 0, void 0, void 0, function () {
        var schema, loader, query, vars, expected, result;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    schema = helpers.schema, loader = helpers.loader;
                    query = "\n      query searchAuthorsByFirstName($firstName: String!) {\n        searchAuthors(searchText: $firstName, searchMethod: STARTS_WITH, searchCombinedName: true) {\n          id\n          firstName\n          lastName\n        }\n      }      \n    ";
                    vars = {
                        firstName: author.firstName + " " + author.lastName.slice(0, 3),
                    };
                    expected = {
                        id: author.id,
                        firstName: author.firstName,
                        lastName: author.lastName,
                    };
                    return [4, graphql_1.graphql(schema, query, {}, { loader: loader }, vars)];
                case 1:
                    result = _b.sent();
                    expect(result).to.not.have.key("errors");
                    (_a = result.data) === null || _a === void 0 ? void 0 : _a.searchAuthors.should.include.something.that.deep.equals(expected);
                    return [2];
            }
        });
    }); });
});
//# sourceMappingURL=searching.test.js.map