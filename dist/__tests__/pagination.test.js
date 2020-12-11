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
var chai = require("chai");
var graphql_1 = require("graphql");
var testStartup_1 = require("./util/testStartup");
var entity_1 = require("./entity");
var PaginatedReviews_1 = require("./entity/PaginatedReviews");
chai.use(require("deep-equal-in-any-order"));
var expect = chai.expect;
describe("Pagination", function () {
    var helpers;
    var reviews;
    before(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, testStartup_1.startup("pagination", { logging: false })];
                case 1:
                    helpers = _a.sent();
                    return [4, helpers.connection
                            .getRepository(entity_1.Review)
                            .createQueryBuilder("review")
                            .leftJoinAndSelect("review.book", "book")
                            .orderBy({ rating: "DESC" })
                            .getMany()];
                case 2:
                    reviews = _a.sent();
                    return [2];
            }
        });
    }); });
    it("can perform a simple paginated query", function () { return __awaiter(void 0, void 0, void 0, function () {
        var schema, loader, query, vars, result, firstTenReviews, expected;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    schema = helpers.schema, loader = helpers.loader;
                    query = "\n      query getPaginatedReviews($offset: Int!, $limit: Int!) {\n        paginatedReviews(offset: $offset, limit: $limit) {\n          reviews {\n            id\n            title\n            body\n            reviewDate\n            rating\n            reviewerName\n          }\n          offset\n          hasMore\n        }\n      }\n    ";
                    vars = { offset: 0, limit: 10 };
                    return [4, graphql_1.graphql(schema, query, {}, { loader: loader }, vars)];
                case 1:
                    result = _b.sent();
                    firstTenReviews = reviews.slice(0, 10);
                    expected = {
                        hasMore: true,
                        offset: 10,
                        reviews: firstTenReviews.map(function (_a) {
                            var id = _a.id, title = _a.title, body = _a.body, reviewDate = _a.reviewDate, rating = _a.rating, reviewerName = _a.reviewerName;
                            return ({
                                id: id,
                                title: title,
                                body: body,
                                reviewDate: reviewDate,
                                rating: rating,
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
    it("can perform a simple paginated query while selecting relations", function () { return __awaiter(void 0, void 0, void 0, function () {
        var schema, loader, query, vars, result, firstTenReviews, expected;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    schema = helpers.schema, loader = helpers.loader;
                    query = "\n      query getPaginatedReviews($offset: Int!, $limit: Int!) {\n        paginatedReviews(offset: $offset, limit: $limit) {\n          reviews {\n            id\n            title\n            body\n            reviewDate\n            rating\n            reviewerName\n            book {\n              id\n              title\n            }\n          }\n          offset\n          hasMore\n        }\n      }\n    ";
                    vars = { offset: 0, limit: 10 };
                    return [4, graphql_1.graphql(schema, query, {}, { loader: loader }, vars)];
                case 1:
                    result = _b.sent();
                    firstTenReviews = reviews.slice(0, 10);
                    expected = {
                        hasMore: true,
                        offset: 10,
                        reviews: firstTenReviews.map(function (_a) {
                            var id = _a.id, title = _a.title, body = _a.body, reviewDate = _a.reviewDate, rating = _a.rating, reviewerName = _a.reviewerName, book = _a.book;
                            return ({
                                id: id,
                                title: title,
                                body: body,
                                reviewDate: reviewDate,
                                rating: rating,
                                reviewerName: reviewerName,
                                book: {
                                    id: book.id,
                                    title: book.title,
                                },
                            });
                        }),
                    };
                    expect(result).to.not.have.key("errors");
                    expect((_a = result.data) === null || _a === void 0 ? void 0 : _a.paginatedReviews).to.deep.equal(expected);
                    return [2];
            }
        });
    }); });
    it("can paginate through an entire record base", function () { return __awaiter(void 0, void 0, void 0, function () {
        var schema, loader, query, hasMore, vars, queriedReviews, result, expected;
        var _a, _b, _c, _d, _e, _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    schema = helpers.schema, loader = helpers.loader;
                    query = "\n      query getPaginatedReviews($offset: Int!, $limit: Int!) {\n        paginatedReviews(offset: $offset, limit: $limit) {\n          reviews {\n            id\n            title\n            body\n            reviewDate\n            rating\n            reviewerName\n            book {\n              id\n              title\n            }\n          }\n          offset\n          hasMore\n        }\n      }\n    ";
                    hasMore = true;
                    vars = { offset: 0, limit: 10 };
                    queriedReviews = [];
                    _g.label = 1;
                case 1:
                    if (!hasMore) return [3, 3];
                    return [4, graphql_1.graphql(schema, query, {}, { loader: loader }, vars)];
                case 2:
                    result = _g.sent();
                    expect(result).to.not.have.key("errors");
                    expect(result.data).to.have.key("paginatedReviews");
                    hasMore = (_b = (_a = result.data) === null || _a === void 0 ? void 0 : _a.paginatedReviews) === null || _b === void 0 ? void 0 : _b.hasMore;
                    vars = __assign(__assign({}, vars), { offset: (_d = (_c = result.data) === null || _c === void 0 ? void 0 : _c.paginatedReviews) === null || _d === void 0 ? void 0 : _d.offset });
                    queriedReviews = queriedReviews.concat((_f = (_e = result.data) === null || _e === void 0 ? void 0 : _e.paginatedReviews) === null || _f === void 0 ? void 0 : _f.reviews);
                    return [3, 1];
                case 3:
                    expected = reviews.map(function (_a) {
                        var id = _a.id, title = _a.title, body = _a.body, reviewDate = _a.reviewDate, rating = _a.rating, reviewerName = _a.reviewerName, book = _a.book;
                        return ({
                            id: id,
                            title: title,
                            body: body,
                            reviewDate: reviewDate,
                            rating: rating,
                            reviewerName: reviewerName,
                            book: {
                                id: book.id,
                                title: book.title,
                            },
                        });
                    });
                    expect(queriedReviews).to.deep.equal(expected);
                    return [2];
            }
        });
    }); });
    it("can query nested items from the info object", function () { return __awaiter(void 0, void 0, void 0, function () {
        var connection, schema, loader, query, result, _a, reviews, count, expected;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    connection = helpers.connection, schema = helpers.schema, loader = helpers.loader;
                    query = "\n      query nestedInfoFields {\n        reviewConnection {\n          totalCount\n          edges {\n            cursor\n            node {\n              id\n              title\n              body\n              reviewerName\n              rating\n              reviewDate\n            }\n          }        \n        }\n      }   \n    ";
                    return [4, graphql_1.graphql(schema, query, {}, { loader: loader })];
                case 1:
                    result = _b.sent();
                    return [4, connection
                            .getRepository(entity_1.Review)
                            .createQueryBuilder("review")
                            .limit(15)
                            .getManyAndCount()];
                case 2:
                    _a = _b.sent(), reviews = _a[0], count = _a[1];
                    expected = new PaginatedReviews_1.ReviewConnection(count, reviews);
                    expect(result).to.not.have.key("errors");
                    expect(result.data).to.have.key("reviewConnection");
                    expect(result.data.reviewConnection).to.deep.equalInAnyOrder(expected);
                    return [2];
            }
        });
    }); });
});
//# sourceMappingURL=pagination.test.js.map