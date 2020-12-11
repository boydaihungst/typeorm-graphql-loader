"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookCreateResultType = exports.BookCreateError = exports.BookCreateSuccess = exports.Book = void 0;
var typeorm_1 = require("typeorm");
var Author_1 = require("./Author");
var Publisher_1 = require("./Publisher");
var Review_1 = require("./Review");
var type_graphql_1 = require("type-graphql");
var Book = (function (_super) {
    __extends(Book, _super);
    function Book() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        type_graphql_1.Field(function (type) { return type_graphql_1.Int; }),
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Book.prototype, "id", void 0);
    __decorate([
        type_graphql_1.Field(function (type) { return Boolean; }),
        typeorm_1.Column("boolean"),
        __metadata("design:type", Boolean)
    ], Book.prototype, "isPublished", void 0);
    __decorate([
        type_graphql_1.Field(),
        typeorm_1.Column("varchar"),
        __metadata("design:type", String)
    ], Book.prototype, "title", void 0);
    __decorate([
        type_graphql_1.Field(),
        typeorm_1.Column("text"),
        __metadata("design:type", String)
    ], Book.prototype, "summary", void 0);
    __decorate([
        type_graphql_1.Field(function (type) { return String; }),
        typeorm_1.Column("date"),
        __metadata("design:type", Date)
    ], Book.prototype, "publishedDate", void 0);
    __decorate([
        type_graphql_1.Field(function (type) { return Author_1.Author; }),
        typeorm_1.ManyToOne(function (type) { return Author_1.Author; }, function (author) { return author.books; }),
        __metadata("design:type", Author_1.Author)
    ], Book.prototype, "author", void 0);
    __decorate([
        type_graphql_1.Field(function (type) { return Publisher_1.Publisher; }),
        typeorm_1.ManyToOne(function (type) { return Publisher_1.Publisher; }, function (publisher) { return publisher.books; }),
        __metadata("design:type", Publisher_1.Publisher)
    ], Book.prototype, "publisher", void 0);
    __decorate([
        type_graphql_1.Field(function (type) { return [Review_1.Review]; }),
        typeorm_1.OneToMany(function (t) { return Review_1.Review; }, function (review) { return review.book; }),
        __metadata("design:type", Array)
    ], Book.prototype, "reviews", void 0);
    __decorate([
        type_graphql_1.Field(),
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], Book.prototype, "createdAt", void 0);
    __decorate([
        type_graphql_1.Field(),
        typeorm_1.UpdateDateColumn(),
        __metadata("design:type", Date)
    ], Book.prototype, "updatedAt", void 0);
    Book = __decorate([
        type_graphql_1.ObjectType(),
        typeorm_1.Entity()
    ], Book);
    return Book;
}(typeorm_1.BaseEntity));
exports.Book = Book;
var BookCreateSuccess = (function () {
    function BookCreateSuccess(data) {
        this.data = data;
    }
    __decorate([
        type_graphql_1.Field(function (data) { return Book; }),
        __metadata("design:type", Book)
    ], BookCreateSuccess.prototype, "data", void 0);
    BookCreateSuccess = __decorate([
        type_graphql_1.ObjectType(),
        __metadata("design:paramtypes", [Book])
    ], BookCreateSuccess);
    return BookCreateSuccess;
}());
exports.BookCreateSuccess = BookCreateSuccess;
var BookCreateError = (function () {
    function BookCreateError(message) {
        this.message = message;
    }
    __decorate([
        type_graphql_1.Field(function (message) { return String; }),
        __metadata("design:type", String)
    ], BookCreateError.prototype, "message", void 0);
    BookCreateError = __decorate([
        type_graphql_1.ObjectType(),
        __metadata("design:paramtypes", [String])
    ], BookCreateError);
    return BookCreateError;
}());
exports.BookCreateError = BookCreateError;
exports.BookCreateResultType = type_graphql_1.createUnionType({
    name: "BookCreateResult",
    types: function () { return [BookCreateSuccess, BookCreateError]; },
});
//# sourceMappingURL=Book.js.map