"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.BookResolver = void 0;
var type_graphql_1 = require("type-graphql");
var entity_1 = require("../entity");
var GraphQLDatabaseLoader_1 = require("../../GraphQLDatabaseLoader");
var Book_1 = require("../entity/Book");
var typeorm_1 = require("typeorm");
var Transform;
(function (Transform) {
    Transform["LOWERCASE"] = "LOWERCASE";
})(Transform || (Transform = {}));
var BookResolver = (function () {
    function BookResolver() {
    }
    BookResolver.prototype.transformedTitle = function (transform, book) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, transform === Transform.LOWERCASE
                        ? book.title.toLowerCase()
                        : book.title.toUpperCase()];
            });
        });
    };
    BookResolver.prototype.booksByAuthorId = function (authorId, loader, info) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, loader
                        .loadEntity(entity_1.Book, "book")
                        .where("book.authorId = :authorId", { authorId: authorId })
                        .where("book.isPublished IS TRUE")
                        .info(info)
                        .loadMany()];
            });
        });
    };
    BookResolver.prototype.booksByAuthorOrPublisher = function (publisherId, authorId, useBrackets, loader, info) {
        if (useBrackets === void 0) { useBrackets = false; }
        return __awaiter(this, void 0, void 0, function () {
            var orWhere;
            return __generator(this, function (_a) {
                orWhere = useBrackets
                    ? new typeorm_1.Brackets(function (qb) {
                        return qb.orWhere("books.authorId = :authorId", { authorId: authorId });
                    })
                    : "books.authorId = :authorId";
                return [2, loader
                        .loadEntity(entity_1.Book, "books")
                        .where("books.publisherId = :publisherId", { publisherId: publisherId })
                        .orWhere(orWhere, { authorId: authorId })
                        .info(info)
                        .loadMany()];
            });
        });
    };
    BookResolver.prototype.createBook = function (title, summary, authorId, publisherId, loader, connection, info) {
        return __awaiter(this, void 0, void 0, function () {
            var book, e_1, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        book = new entity_1.Book();
                        book.author = new entity_1.Author();
                        book.author.id = authorId;
                        book.publisher = new entity_1.Publisher();
                        book.publisher.id = publisherId;
                        book.title = title;
                        book.createdAt = new Date();
                        book.updatedAt = new Date();
                        book.publishedDate = new Date();
                        book.isPublished = true;
                        book.summary = summary;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4, connection.getRepository(entity_1.Book).save(book)];
                    case 2:
                        book = _b.sent();
                        return [3, 4];
                    case 3:
                        e_1 = _b.sent();
                        return [2, new Book_1.BookCreateError("Error creating book: " + e_1)];
                    case 4:
                        _a = Book_1.BookCreateSuccess.bind;
                        return [4, loader
                                .loadEntity(entity_1.Book, "book")
                                .where("book.id = :id", {
                                id: book.id,
                            })
                                .info(info, "BookCreateSuccess.data")
                                .loadOne()];
                    case 5: return [2, new (_a.apply(Book_1.BookCreateSuccess, [void 0, (_b.sent())]))()];
                }
            });
        });
    };
    __decorate([
        type_graphql_1.FieldResolver(function (returns) { return String; }),
        __param(0, type_graphql_1.Arg("transform", function (type) { return String; })),
        __param(1, type_graphql_1.Root()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, entity_1.Book]),
        __metadata("design:returntype", Promise)
    ], BookResolver.prototype, "transformedTitle", null);
    __decorate([
        type_graphql_1.Query(function (returns) { return [entity_1.Book]; }),
        __param(0, type_graphql_1.Arg("authorId", function (type) { return type_graphql_1.Int; })),
        __param(1, type_graphql_1.Ctx("loader")),
        __param(2, type_graphql_1.Info()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, GraphQLDatabaseLoader_1.GraphQLDatabaseLoader, Object]),
        __metadata("design:returntype", Promise)
    ], BookResolver.prototype, "booksByAuthorId", null);
    __decorate([
        type_graphql_1.Query(function (returns) { return [entity_1.Book]; }),
        __param(0, type_graphql_1.Arg("publisherId", function (type) { return type_graphql_1.Int; })),
        __param(1, type_graphql_1.Arg("authorId", function (type) { return type_graphql_1.Int; })),
        __param(2, type_graphql_1.Arg("useBrackets", { nullable: true, defaultValue: false })),
        __param(3, type_graphql_1.Ctx("loader")),
        __param(4, type_graphql_1.Info()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, Number, Boolean, GraphQLDatabaseLoader_1.GraphQLDatabaseLoader, Object]),
        __metadata("design:returntype", Promise)
    ], BookResolver.prototype, "booksByAuthorOrPublisher", null);
    __decorate([
        type_graphql_1.Mutation(function (returns) { return Book_1.BookCreateResultType; }),
        __param(0, type_graphql_1.Arg("title", function (type) { return String; })),
        __param(1, type_graphql_1.Arg("summary", function (type) { return String; })),
        __param(2, type_graphql_1.Arg("authorId", function (type) { return type_graphql_1.Int; })),
        __param(3, type_graphql_1.Arg("publisherId", function (type) { return type_graphql_1.Int; })),
        __param(4, type_graphql_1.Ctx("loader")),
        __param(5, type_graphql_1.Ctx("connection")),
        __param(6, type_graphql_1.Info()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, String, Number, Number, GraphQLDatabaseLoader_1.GraphQLDatabaseLoader,
            typeorm_1.Connection, Object]),
        __metadata("design:returntype", Promise)
    ], BookResolver.prototype, "createBook", null);
    BookResolver = __decorate([
        type_graphql_1.Resolver(entity_1.Book)
    ], BookResolver);
    return BookResolver;
}());
exports.BookResolver = BookResolver;
//# sourceMappingURL=BookResolver.js.map