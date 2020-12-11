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
chai.use(require("deep-equal-in-any-order"));
var expect = chai.expect;
describe("Query Builder options", function () {
    var helpers;
    before(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, testStartup_1.startup("options", { logging: false })];
                case 1:
                    helpers = _a.sent();
                    return [2];
            }
        });
    }); });
    it("caches the same query to prevent duplicate calls", function () { return __awaiter(void 0, void 0, void 0, function () {
        var loader, connection, schema, author, query, vars, result, expectedAuthor, expected;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    loader = helpers.loader, connection = helpers.connection, schema = helpers.schema;
                    return [4, connection.getRepository(entity_1.Author).findOne()];
                case 1:
                    author = _a.sent();
                    query = "\n      query authorById($id: Int!) {\n        first: authorById(id: $id) {\n          id\n          firstName\n          lastName\n        }\n        second: authorById(id: $id) {\n          id\n          firstName\n          lastName\n        }\n      }\n    ";
                    vars = { id: author === null || author === void 0 ? void 0 : author.id };
                    console.warn("START GQL QUERY");
                    return [4, graphql_1.graphql(schema, query, {}, { loader: loader }, vars)];
                case 2:
                    result = _a.sent();
                    console.warn("END GQL QUERY");
                    expectedAuthor = {
                        id: author === null || author === void 0 ? void 0 : author.id,
                        firstName: author === null || author === void 0 ? void 0 : author.firstName,
                        lastName: author === null || author === void 0 ? void 0 : author.lastName,
                    };
                    expected = {
                        first: expectedAuthor,
                        second: expectedAuthor,
                    };
                    expect(result).to.not.have.key("errors");
                    expect(result.data).to.deep.equal(expected);
                    return [2];
            }
        });
    }); });
    it("respects the selectFields option", function () { return __awaiter(void 0, void 0, void 0, function () {
        var schema, loader, connection, query, vars, result, reviews, expected;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    schema = helpers.schema, loader = helpers.loader, connection = helpers.connection;
                    query = "\n      query getPaginatedReviews($offset: Int!, $limit: Int!) {\n        paginatedReviews(offset: $offset, limit: $limit) {\n          reviews {\n            id\n            title\n            body\n            reviewDate\n            reviewerName\n          }\n          offset\n          hasMore\n          maxRating\n          minRating\n        }\n      }\n    ";
                    vars = { offset: 0, limit: 10 };
                    return [4, graphql_1.graphql(schema, query, {}, { loader: loader }, vars)];
                case 1:
                    result = _b.sent();
                    return [4, connection
                            .getRepository(entity_1.Review)
                            .createQueryBuilder("review")
                            .orderBy({ rating: "DESC" })
                            .limit(10)
                            .getMany()];
                case 2:
                    reviews = _b.sent();
                    expected = {
                        hasMore: true,
                        offset: 10,
                        minRating: Math.min.apply(Math, reviews.map(function (review) { return review.rating; })),
                        maxRating: Math.max.apply(Math, reviews.map(function (review) { return review.rating; })),
                        reviews: reviews.map(function (_a) {
                            var id = _a.id, title = _a.title, body = _a.body, reviewDate = _a.reviewDate, reviewerName = _a.reviewerName;
                            return ({
                                id: id,
                                title: title,
                                body: body,
                                reviewDate: reviewDate,
                                reviewerName: reviewerName,
                            });
                        }),
                    };
                    expect(result).to.not.have.key("errors");
                    expect((_a = result.data) === null || _a === void 0 ? void 0 : _a.paginatedReviews).to.deep.equal(expected);
                    return [2];
            }
        });
    }); });
    it("can apply OR WHERE conditions with strings", function () { return __awaiter(void 0, void 0, void 0, function () {
        var connection, schema, loader, query, author, publisher, books, vars, result, expected;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    connection = helpers.connection, schema = helpers.schema, loader = helpers.loader;
                    query = "\n     query orWhere($authorId: Int!, $publisherId: Int!) {\n       booksByAuthorOrPublisher(authorId: $authorId, publisherId: $publisherId) {\n         id\n         title\n       }\n     }\n    ";
                    return [4, connection.getRepository(entity_1.Author).findOne()];
                case 1:
                    author = _b.sent();
                    return [4, connection.getRepository(entity_1.Publisher).findOne()];
                case 2:
                    publisher = _b.sent();
                    return [4, connection
                            .getRepository(entity_1.Book)
                            .createQueryBuilder("book")
                            .where("book.authorId = :authorId", { authorId: author === null || author === void 0 ? void 0 : author.id })
                            .orWhere("book.publisherId = :publisherId", {
                            publisherId: publisher === null || publisher === void 0 ? void 0 : publisher.id,
                        })
                            .getMany()];
                case 3:
                    books = _b.sent();
                    vars = { authorId: author === null || author === void 0 ? void 0 : author.id, publisherId: publisher === null || publisher === void 0 ? void 0 : publisher.id };
                    return [4, graphql_1.graphql(schema, query, {}, { loader: loader }, vars)];
                case 4:
                    result = _b.sent();
                    expected = books.map(function (_a) {
                        var id = _a.id, title = _a.title;
                        return ({ id: id, title: title });
                    });
                    expect(result).to.not.have.key("errors");
                    expect((_a = result.data) === null || _a === void 0 ? void 0 : _a.booksByAuthorOrPublisher).to.deep.equal(expected);
                    return [2];
            }
        });
    }); });
    it("can apply OR WHERE conditions with brackets", function () { return __awaiter(void 0, void 0, void 0, function () {
        var connection, schema, loader, query, author, publisher, books, vars, result, expected;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    connection = helpers.connection, schema = helpers.schema, loader = helpers.loader;
                    query = "\n     query orWhere($authorId: Int!, $publisherId: Int!) {\n       booksByAuthorOrPublisher(authorId: $authorId, publisherId: $publisherId, useBrackets: true) {\n         id\n         title\n       }\n     }\n    ";
                    return [4, connection.getRepository(entity_1.Author).findOne()];
                case 1:
                    author = _b.sent();
                    return [4, connection.getRepository(entity_1.Publisher).findOne()];
                case 2:
                    publisher = _b.sent();
                    return [4, connection
                            .getRepository(entity_1.Book)
                            .createQueryBuilder("book")
                            .where("book.authorId = :authorId", { authorId: author === null || author === void 0 ? void 0 : author.id })
                            .orWhere("book.publisherId = :publisherId", {
                            publisherId: publisher === null || publisher === void 0 ? void 0 : publisher.id,
                        })
                            .getMany()];
                case 3:
                    books = _b.sent();
                    vars = { authorId: author === null || author === void 0 ? void 0 : author.id, publisherId: publisher === null || publisher === void 0 ? void 0 : publisher.id };
                    return [4, graphql_1.graphql(schema, query, {}, { loader: loader }, vars)];
                case 4:
                    result = _b.sent();
                    expected = books.map(function (_a) {
                        var id = _a.id, title = _a.title;
                        return ({ id: id, title: title });
                    });
                    expect(result).to.not.have.key("errors");
                    expect((_a = result.data) === null || _a === void 0 ? void 0 : _a.booksByAuthorOrPublisher).to.deep.equal(expected);
                    return [2];
            }
        });
    }); });
});
describe("Depth limiting", function () {
    var helpers;
    before(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, testStartup_1.startup("max_depth", {
                        logging: false,
                        loaderOptions: { maxQueryDepth: 2 },
                    })];
                case 1:
                    helpers = _a.sent();
                    return [2];
            }
        });
    }); });
    it("does not load relations more than max depth", function () { return __awaiter(void 0, void 0, void 0, function () {
        var loader, connection, schema, author, query, vars, result;
        var _a, _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    loader = helpers.loader, connection = helpers.connection, schema = helpers.schema;
                    return [4, connection.getRepository(entity_1.Author).findOne()];
                case 1:
                    author = _e.sent();
                    query = "\n      query authorById($id: Int!) {\n        authorById(id: $id) {\n          id\n          firstName\n          lastName\n          books {\n            id\n            publisher {\n              id\n              books {\n               id\n              }\n            }\n          }\n        }\n      }\n    ";
                    vars = { id: author === null || author === void 0 ? void 0 : author.id };
                    return [4, graphql_1.graphql(schema, query, {}, { loader: loader }, vars)];
                case 2:
                    result = _e.sent();
                    expect(result).to.not.have.key("errors");
                    expect((_d = (_c = (_b = (_a = result.data) === null || _a === void 0 ? void 0 : _a.authorById) === null || _b === void 0 ? void 0 : _b.books) === null || _c === void 0 ? void 0 : _c.publisher) === null || _d === void 0 ? void 0 : _d.books).to.not.be.ok;
                    return [2];
            }
        });
    }); });
});
describe("Primary Key Backwards compatibility", function () {
    var helpers;
    before(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, testStartup_1.startup("deprecated_primary_key", {
                        logging: false,
                        loaderOptions: { primaryKeyColumn: "rating" },
                    })];
                case 1:
                    helpers = _a.sent();
                    return [2];
            }
        });
    }); });
    it("is backwards compatible with primary key option", function () { return __awaiter(void 0, void 0, void 0, function () {
        var schema, loader, connection, query, vars, result, reviews, expected;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    schema = helpers.schema, loader = helpers.loader, connection = helpers.connection;
                    query = "\n      query getPaginatedReviews($offset: Int!, $limit: Int!) {\n        deprecatedPrimaryKey(offset: $offset, limit: $limit) {\n          reviews {\n            id\n            title\n            body\n            reviewDate\n            reviewerName\n          }\n          offset\n          hasMore\n          maxRating\n          minRating\n        }\n      }\n    ";
                    vars = { offset: 0, limit: 10 };
                    return [4, graphql_1.graphql(schema, query, {}, { loader: loader, connection: connection }, vars)];
                case 1:
                    result = _b.sent();
                    return [4, helpers.connection
                            .getRepository(entity_1.Review)
                            .createQueryBuilder("review")
                            .orderBy({ rating: "DESC" })
                            .limit(10)
                            .getMany()];
                case 2:
                    reviews = _b.sent();
                    expected = {
                        hasMore: true,
                        offset: 10,
                        minRating: Math.min.apply(Math, reviews.map(function (review) { return review.rating; })),
                        maxRating: Math.max.apply(Math, reviews.map(function (review) { return review.rating; })),
                        reviews: reviews.map(function (_a) {
                            var id = _a.id, title = _a.title, body = _a.body, reviewDate = _a.reviewDate, reviewerName = _a.reviewerName;
                            return ({
                                id: id,
                                title: title,
                                body: body,
                                reviewDate: reviewDate,
                                reviewerName: reviewerName,
                            });
                        }),
                    };
                    expect(result).to.not.have.key("errors");
                    expect((_a = result.data) === null || _a === void 0 ? void 0 : _a.deprecatedPrimaryKey).to.deep.equal(expected);
                    return [2];
            }
        });
    }); });
});
describe("ejectQueryBuilder", function () {
    var helpers;
    before(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, testStartup_1.startup("eject_builder", {
                        logging: false,
                    })];
                case 1:
                    helpers = _a.sent();
                    return [2];
            }
        });
    }); });
    it("can successfully execute a query that had a custom eject callback", function () { return __awaiter(void 0, void 0, void 0, function () {
        var connection, schema, loader, publisher, query, vars, result, expected;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    connection = helpers.connection, schema = helpers.schema, loader = helpers.loader;
                    return [4, connection
                            .getRepository(entity_1.Publisher)
                            .findOne({ relations: ["books"] })];
                case 1:
                    publisher = _b.sent();
                    query = "\n    query publisherByBookTitle($bookTitle: String!) {\n      publisherByBookTitle(bookTitle: $bookTitle) {\n        id\n        name\n        books {\n          id\n          title\n        }\n      }\n    }\n    ";
                    vars = { bookTitle: (_a = publisher === null || publisher === void 0 ? void 0 : publisher.books) === null || _a === void 0 ? void 0 : _a[0].title };
                    return [4, graphql_1.graphql(schema, query, {}, { loader: loader }, vars)];
                case 2:
                    result = _b.sent();
                    expected = {
                        id: publisher === null || publisher === void 0 ? void 0 : publisher.id,
                        name: publisher === null || publisher === void 0 ? void 0 : publisher.name,
                        books: publisher === null || publisher === void 0 ? void 0 : publisher.books.map(function (_a) {
                            var id = _a.id, title = _a.title;
                            return ({ id: id, title: title });
                        }),
                    };
                    expect(result).to.not.have.key("errors");
                    expect(result.data.publisherByBookTitle).to.deep.equalInAnyOrder(expected);
                    return [2];
            }
        });
    }); });
});
//# sourceMappingURL=builderOptions.test.js.map