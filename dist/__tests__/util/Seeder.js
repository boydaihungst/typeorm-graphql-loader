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
exports.Seeder = void 0;
var entity_1 = require("../entity");
var faker = require("faker");
var Seeder = (function () {
    function Seeder(conn) {
        this.conn = conn;
        this.NUM_AUTHORS = 10;
        this.NUM_PUBLISHERS = 3;
        this.NUM_BOOKS = 50;
        this.NUM_REVIEWS = 100;
        this.NUM_DECORATOR_TESTS = 10;
    }
    Seeder.addressFactory = function () {
        return {
            street: faker.address.streetAddress(),
            street2: faker.address.secondaryAddress(),
            city: faker.address.city(),
            state: faker.address.state(),
            zip: faker.address.zipCode(),
        };
    };
    Seeder.prototype.seed = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.conn.transaction(function (entityManager) { return __awaiter(_this, void 0, void 0, function () {
                            var authors, publishers, books;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4, this.seedAuthors(entityManager)];
                                    case 1:
                                        authors = _a.sent();
                                        return [4, this.seedPublishers(entityManager)];
                                    case 2:
                                        publishers = _a.sent();
                                        return [4, this.seedBooks(entityManager, authors, publishers)];
                                    case 3:
                                        books = _a.sent();
                                        return [4, this.seedReviews(entityManager, books)];
                                    case 4:
                                        _a.sent();
                                        return [4, this.seedDecoratorTests(entityManager, authors)];
                                    case 5:
                                        _a.sent();
                                        return [2];
                                }
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    Seeder.prototype.seedAuthors = function (manager) {
        return __awaiter(this, void 0, void 0, function () {
            var authors, i, author;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        authors = [];
                        for (i = 0; i < this.NUM_AUTHORS; i++) {
                            author = {
                                firstName: faker.name.firstName(),
                                lastName: faker.name.lastName(),
                                email: faker.internet.email(),
                                address: Seeder.addressFactory(),
                                phone: faker.phone.phoneNumber(),
                            };
                            authors.push(author);
                        }
                        return [4, manager
                                .createQueryBuilder()
                                .insert()
                                .into(entity_1.Author)
                                .values(authors)
                                .execute()];
                    case 1:
                        _a.sent();
                        return [4, manager.getRepository(entity_1.Author).find()];
                    case 2: return [2, _a.sent()];
                }
            });
        });
    };
    Seeder.prototype.seedPublishers = function (manager) {
        return __awaiter(this, void 0, void 0, function () {
            var publishers, i, publisher;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        publishers = [];
                        for (i = 0; i < this.NUM_PUBLISHERS; i++) {
                            publisher = {
                                name: faker.company.companyName(),
                                address: Seeder.addressFactory(),
                                poBox: Seeder.addressFactory(),
                            };
                            publishers.push(publisher);
                        }
                        return [4, manager
                                .createQueryBuilder()
                                .insert()
                                .into(entity_1.Publisher)
                                .values(publishers)
                                .execute()];
                    case 1:
                        _a.sent();
                        return [4, manager.getRepository(entity_1.Publisher).find()];
                    case 2: return [2, _a.sent()];
                }
            });
        });
    };
    Seeder.prototype.seedBooks = function (manager, authors, publishers) {
        return __awaiter(this, void 0, void 0, function () {
            var books, i, book;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        books = [];
                        for (i = 1; i <= this.NUM_BOOKS; i++) {
                            book = {
                                title: faker.lorem.words(3),
                                summary: faker.lorem.paragraph(2),
                                publishedDate: faker.date.past(),
                                author: authors[i % this.NUM_AUTHORS],
                                isPublished: faker.random.number(10) <= 5,
                                publisher: publishers[i % this.NUM_PUBLISHERS],
                            };
                            books.push(book);
                        }
                        return [4, manager
                                .createQueryBuilder()
                                .insert()
                                .into(entity_1.Book)
                                .values(books)
                                .execute()];
                    case 1:
                        _a.sent();
                        return [4, manager.getRepository(entity_1.Book).find()];
                    case 2: return [2, _a.sent()];
                }
            });
        });
    };
    Seeder.prototype.seedReviews = function (manager, books) {
        return __awaiter(this, void 0, void 0, function () {
            var reviews, i, review;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        reviews = [];
                        for (i = 1; i <= this.NUM_REVIEWS; i++) {
                            review = {
                                title: faker.lorem.words(3),
                                body: faker.lorem.paragraph(5),
                                reviewDate: faker.date.past(),
                                rating: faker.random.number({ min: 0, max: 10 }),
                                reviewerName: faker.name.firstName() + " " + faker.name.lastName(),
                                book: books[i % this.NUM_BOOKS],
                            };
                            reviews.push(review);
                        }
                        return [4, manager
                                .createQueryBuilder()
                                .insert()
                                .into(entity_1.Review)
                                .values(reviews)
                                .execute()];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    Seeder.prototype.seedDecoratorTests = function (manager, authors) {
        return __awaiter(this, void 0, void 0, function () {
            var decoratorTests, i, dt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        decoratorTests = [];
                        for (i = 1; i <= this.NUM_DECORATOR_TESTS; i++) {
                            dt = {
                                testField: faker.lorem.words(1),
                                testRelation: authors[i % this.NUM_AUTHORS],
                                testEmbed: Seeder.addressFactory(),
                                testRemappedField: faker.lorem.words(1),
                                testRemappedEmbed: Seeder.addressFactory(),
                                testRemappedRelation: authors[i % this.NUM_AUTHORS],
                            };
                            decoratorTests.push(dt);
                        }
                        return [4, manager
                                .createQueryBuilder()
                                .insert()
                                .into(entity_1.DecoratorTest)
                                .values(decoratorTests)
                                .execute()];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    return Seeder;
}());
exports.Seeder = Seeder;
//# sourceMappingURL=Seeder.js.map