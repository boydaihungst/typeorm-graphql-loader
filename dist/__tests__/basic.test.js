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
var deepEqualInAnyOrder = require("deep-equal-in-any-order");
chai.use(deepEqualInAnyOrder);
var expect = chai.expect;
describe("Basic GraphQL queries", function () {
    var helpers;
    before(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, testStartup_1.startup("basic", { logging: false })];
                case 1:
                    helpers = _a.sent();
                    return [2];
            }
        });
    }); });
    describe("querying a single entity", function () {
        it("can query a single entity one layer deep", function () { return __awaiter(void 0, void 0, void 0, function () {
            var connection, schema, loader, author, query, vars, result, expected;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        connection = helpers.connection, schema = helpers.schema, loader = helpers.loader;
                        return [4, connection.getRepository(entity_1.Author).findOne()];
                    case 1:
                        author = _a.sent();
                        query = "\n        query authorById($id: Int!) {\n          authorById(id: $id) {\n            id\n            firstName\n            lastName\n            email\n          }\n        }\n      ";
                        vars = { id: author === null || author === void 0 ? void 0 : author.id };
                        return [4, graphql_1.graphql(schema, query, {}, {
                                loader: loader,
                            }, vars)];
                    case 2:
                        result = _a.sent();
                        expected = {
                            id: author === null || author === void 0 ? void 0 : author.id,
                            firstName: author === null || author === void 0 ? void 0 : author.firstName,
                            lastName: author === null || author === void 0 ? void 0 : author.lastName,
                            email: author === null || author === void 0 ? void 0 : author.email,
                        };
                        expect(result).to.not.have.key("errors");
                        expect(result.data.authorById).to.deep.equal(expected);
                        return [2];
                }
            });
        }); });
        it("can query fields that have custom column names", function () { return __awaiter(void 0, void 0, void 0, function () {
            var connection, schema, loader, author, query, vars, result, expected;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        connection = helpers.connection, schema = helpers.schema, loader = helpers.loader;
                        return [4, connection.getRepository(entity_1.Author).findOne()];
                    case 1:
                        author = _a.sent();
                        query = "\n        query authorById($id: Int!) {\n          authorById(id: $id) {\n            id\n            firstName\n            lastName\n            email\n            phone\n          }\n        }\n      ";
                        vars = { id: author === null || author === void 0 ? void 0 : author.id };
                        return [4, graphql_1.graphql(schema, query, {}, {
                                loader: loader,
                            }, vars)];
                    case 2:
                        result = _a.sent();
                        expected = {
                            id: author === null || author === void 0 ? void 0 : author.id,
                            firstName: author === null || author === void 0 ? void 0 : author.firstName,
                            lastName: author === null || author === void 0 ? void 0 : author.lastName,
                            email: author === null || author === void 0 ? void 0 : author.email,
                            phone: author === null || author === void 0 ? void 0 : author.phone,
                        };
                        expect(result).to.not.have.key("errors");
                        expect(result.data.authorById).to.deep.equal(expected);
                        return [2];
                }
            });
        }); });
        it("can query a single entity multiple layers deep", function () { return __awaiter(void 0, void 0, void 0, function () {
            var connection, schema, loader, author, query, vars, result, expected;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        connection = helpers.connection, schema = helpers.schema, loader = helpers.loader;
                        return [4, connection
                                .getRepository(entity_1.Author)
                                .findOne({ relations: ["books", "books.publisher"] })];
                    case 1:
                        author = _a.sent();
                        query = "\n        query authorById($id: Int!) {\n          authorById(id: $id) {\n            id\n            firstName\n            lastName\n            email\n            books {\n              id\n              title\n              summary\n              publisher {\n                id\n              }\n            }\n          }\n        }\n      ";
                        vars = { id: author === null || author === void 0 ? void 0 : author.id };
                        return [4, graphql_1.graphql(schema, query, {}, {
                                loader: loader,
                            }, vars)];
                    case 2:
                        result = _a.sent();
                        expected = {
                            id: author === null || author === void 0 ? void 0 : author.id,
                            firstName: author === null || author === void 0 ? void 0 : author.firstName,
                            lastName: author === null || author === void 0 ? void 0 : author.lastName,
                            email: author === null || author === void 0 ? void 0 : author.email,
                            books: author === null || author === void 0 ? void 0 : author.books.map(function (book) { return ({
                                id: book.id,
                                title: book.title,
                                summary: book.summary,
                                publisher: {
                                    id: book.publisher.id,
                                },
                            }); }),
                        };
                        expect(result).to.not.have.key("errors");
                        expect(result.data.authorById).to.deep.equal(expected);
                        return [2];
                }
            });
        }); });
        it("can resolve a query that contains fragments", function () { return __awaiter(void 0, void 0, void 0, function () {
            var connection, schema, loader, author, query, vars, result, expected;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        connection = helpers.connection, schema = helpers.schema, loader = helpers.loader;
                        return [4, connection
                                .getRepository(entity_1.Author)
                                .findOne({ relations: ["books", "books.publisher"] })];
                    case 1:
                        author = _a.sent();
                        query = "\n        fragment bookFragment on Book {\n          title\n          summary\n          publisher {\n            id\n          }\n        }\n        fragment authorFragment on Author {\n          firstName\n          lastName\n          email\n          books {\n            ...bookFragment\n          }\n        }\n        query authorById($id: Int!) {\n          authorById(id: $id) {\n           ...authorFragment\n          }\n        }\n      ";
                        vars = { id: author === null || author === void 0 ? void 0 : author.id };
                        return [4, graphql_1.graphql(schema, query, {}, {
                                loader: loader,
                            }, vars)];
                    case 2:
                        result = _a.sent();
                        expected = {
                            firstName: author === null || author === void 0 ? void 0 : author.firstName,
                            lastName: author === null || author === void 0 ? void 0 : author.lastName,
                            email: author === null || author === void 0 ? void 0 : author.email,
                            books: author === null || author === void 0 ? void 0 : author.books.map(function (book) { return ({
                                title: book.title,
                                summary: book.summary,
                                publisher: {
                                    id: book.publisher.id,
                                },
                            }); }),
                        };
                        expect(result).to.not.have.key("errors");
                        expect(result.data.authorById).to.deep.equal(expected);
                        return [2];
                }
            });
        }); });
        it("can resolve a query that contains fields with arguments", function () { return __awaiter(void 0, void 0, void 0, function () {
            var connection, schema, loader, author, query, vars, result, expected;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        connection = helpers.connection, schema = helpers.schema, loader = helpers.loader;
                        return [4, connection
                                .getRepository(entity_1.Author)
                                .findOne({ relations: ["books", "books.publisher"] })];
                    case 1:
                        author = _a.sent();
                        query = "\n        query booksByAuthorId($id: Int!) {\n          booksByAuthorId(authorId: $id) {\n            id\n            title\n            transformedTitle(transform: \"UPPERCASE\")\n          }\n        }\n      ";
                        vars = { id: author === null || author === void 0 ? void 0 : author.id };
                        return [4, graphql_1.graphql(schema, query, {}, {
                                loader: loader,
                            }, vars)];
                    case 2:
                        result = _a.sent();
                        expected = author.books
                            .filter(function (book) { return book.isPublished; })
                            .map(function (book) { return ({
                            id: book.id,
                            title: book.title,
                            transformedTitle: book.title.toUpperCase(),
                        }); });
                        expect(result).to.not.have.key("errors");
                        expect(result.data.booksByAuthorId).to.deep.equal(expected);
                        return [2];
                }
            });
        }); });
        it("can resolve a mutation that contains multiple return types (union)", function () { return __awaiter(void 0, void 0, void 0, function () {
            var connection, schema, loader, bookCount, author, publisher, query, vars, result, expected, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        connection = helpers.connection, schema = helpers.schema, loader = helpers.loader;
                        return [4, connection.getRepository(entity_1.Book).count()];
                    case 1:
                        bookCount = _c.sent();
                        return [4, connection.getRepository(entity_1.Author).findOne()];
                    case 2:
                        author = _c.sent();
                        return [4, connection.getRepository(entity_1.Publisher).findOne()];
                    case 3:
                        publisher = _c.sent();
                        query = "\n        fragment bookFragment on Book {\n          title\n          summary\n          publisher {\n            id\n          }\n          author {\n            id\n          }\n        }\n        mutation createBook($authorId: Int!, $publisherId: Int!, $summary: String!, $title: String!) {\n          createBook(authorId: $authorId, publisherId: $publisherId, summary: $summary, title: $title) {\n           ... on BookCreateSuccess {\n             data {\n               ...bookFragment\n             }\n           }\n           ... on BookCreateError {\n             message\n           }\n          }\n        }\n      ";
                        vars = {
                            authorId: author === null || author === void 0 ? void 0 : author.id,
                            publisherId: publisher === null || publisher === void 0 ? void 0 : publisher.id,
                            title: "Typescript Rules",
                            summary: 'A book of 300 pages only containing the phrase "Typescript Rules"',
                        };
                        return [4, graphql_1.graphql(schema, query, {}, {
                                loader: loader,
                                connection: helpers.connection,
                            }, vars)];
                    case 4:
                        result = _c.sent();
                        expected = {
                            data: {
                                title: vars.title,
                                summary: vars.summary,
                                author: {
                                    id: vars.authorId,
                                },
                                publisher: {
                                    id: vars.publisherId,
                                },
                            },
                        };
                        expect(result).to.not.have.key("errors");
                        _b = (_a = expect(bookCount + 1).to.be).equal;
                        return [4, connection.getRepository(entity_1.Book).count()];
                    case 5:
                        _b.apply(_a, [_c.sent()]);
                        expect(result.data.createBook).to.deep.equal(expected);
                        return [2];
                }
            });
        }); });
        it("can resolve a mutation that contains multiple return types (union) and nested fragments", function () { return __awaiter(void 0, void 0, void 0, function () {
            var connection, schema, loader, bookCount, author, publisher, query, vars, result, expected, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        connection = helpers.connection, schema = helpers.schema, loader = helpers.loader;
                        return [4, connection.getRepository(entity_1.Book).count()];
                    case 1:
                        bookCount = _c.sent();
                        return [4, connection.getRepository(entity_1.Author).findOne()];
                    case 2:
                        author = _c.sent();
                        return [4, connection.getRepository(entity_1.Publisher).findOne()];
                    case 3:
                        publisher = _c.sent();
                        query = "\n        fragment bookFragment on Book {\n          title\n          summary\n          publisher {\n            id\n          }\n          author {\n            id\n          }\n        }\n        fragment bookCreateSuccess on BookCreateSuccess {\n          data {\n            ...bookFragment\n          }\n        }\n        mutation createBook($authorId: Int!, $publisherId: Int!, $summary: String!, $title: String!) {\n          createBook(authorId: $authorId, publisherId: $publisherId, summary: $summary, title: $title) {\n           ... on BookCreateSuccess {\n             ...bookCreateSuccess\n           }\n           ... on BookCreateError {\n             message\n           }\n          }\n        }\n      ";
                        vars = {
                            authorId: author === null || author === void 0 ? void 0 : author.id,
                            publisherId: publisher === null || publisher === void 0 ? void 0 : publisher.id,
                            title: "Typescript Rules",
                            summary: 'A book of 300 pages only containing the phrase "Typescript Rules"',
                        };
                        return [4, graphql_1.graphql(schema, query, {}, {
                                loader: loader,
                                connection: helpers.connection,
                            }, vars)];
                    case 4:
                        result = _c.sent();
                        expected = {
                            data: {
                                title: vars.title,
                                summary: vars.summary,
                                author: {
                                    id: vars.authorId,
                                },
                                publisher: {
                                    id: vars.publisherId,
                                },
                            },
                        };
                        expect(result).to.not.have.key("errors");
                        _b = (_a = expect(bookCount + 1).to.be).equal;
                        return [4, connection.getRepository(entity_1.Book).count()];
                    case 5:
                        _b.apply(_a, [_c.sent()]);
                        expect(result.data.createBook).to.deep.equal(expected);
                        return [2];
                }
            });
        }); });
    });
    describe("querying multiple entities", function () {
        it("can query a single level on multiple entities", function () { return __awaiter(void 0, void 0, void 0, function () {
            var connection, schema, loader, books, query, vars, result, expected;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        connection = helpers.connection, schema = helpers.schema, loader = helpers.loader;
                        return [4, connection
                                .getRepository(entity_1.Book)
                                .find({ where: { author: { id: 1 }, isPublished: true } })];
                    case 1:
                        books = _a.sent();
                        query = "\n        query booksByAuthorId($authorId: Int!) {\n          booksByAuthorId(authorId: $authorId) {\n            id\n            title\n            summary\n          }\n        }\n      ";
                        vars = { authorId: 1 };
                        return [4, graphql_1.graphql(schema, query, {}, { loader: loader }, vars)];
                    case 2:
                        result = _a.sent();
                        expected = books.map(function (_a) {
                            var id = _a.id, title = _a.title, summary = _a.summary;
                            return ({ id: id, title: title, summary: summary });
                        });
                        expect(result).to.not.have.key("errors");
                        expect(result.data.booksByAuthorId).to.deep.equal(expected);
                        return [2];
                }
            });
        }); });
        it("can query multiple levels on multiple entities", function () { return __awaiter(void 0, void 0, void 0, function () {
            var connection, schema, loader, books, query, vars, result, expected;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        connection = helpers.connection, schema = helpers.schema, loader = helpers.loader;
                        return [4, connection.getRepository(entity_1.Book).find({
                                where: { author: { id: 1 }, isPublished: true },
                                relations: ["author", "publisher", "reviews"],
                            })];
                    case 1:
                        books = _a.sent();
                        query = "\n        query booksByAuthorId($authorId: Int!) {\n          booksByAuthorId(authorId: $authorId) {\n            id\n            title\n            summary \n            author {\n              id\n              firstName\n              lastName\n            }\n            publisher {\n              name\n            }\n            reviews {\n              rating\n            }\n          }\n        }\n      ";
                        vars = { authorId: 1 };
                        return [4, graphql_1.graphql(schema, query, {}, { loader: loader }, vars)];
                    case 2:
                        result = _a.sent();
                        expected = books.map(function (_a) {
                            var id = _a.id, title = _a.title, summary = _a.summary, author = _a.author, publisher = _a.publisher, reviews = _a.reviews;
                            return ({
                                id: id,
                                title: title,
                                summary: summary,
                                author: {
                                    id: 1,
                                    firstName: author.firstName,
                                    lastName: author.lastName,
                                },
                                publisher: {
                                    name: publisher.name,
                                },
                                reviews: reviews.map(function (review) { return ({ rating: review.rating }); }),
                            });
                        });
                        expect(result).to.not.have.key("errors");
                        expect(result.data.booksByAuthorId).to.deep.equalInAnyOrder(expected);
                        return [2];
                }
            });
        }); });
    });
});
//# sourceMappingURL=basic.test.js.map