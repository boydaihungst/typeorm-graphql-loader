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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewEdge = exports.ReviewConnection = exports.PaginatedReviews = void 0;
var Review_1 = require("./Review");
var type_graphql_1 = require("type-graphql");
var PaginatedReviews = (function () {
    function PaginatedReviews(reviews, offset, hasMore) {
        this.reviews = reviews;
        this.offset = offset;
        this.hasMore = hasMore;
    }
    PaginatedReviews.prototype.maxRating = function () {
        return Math.max.apply(Math, this.reviews.map(function (review) { return review.rating; }));
    };
    PaginatedReviews.prototype.minRating = function () {
        return Math.min.apply(Math, this.reviews.map(function (review) { return review.rating; }));
    };
    __decorate([
        type_graphql_1.Field(function (type) { return [Review_1.Review]; }),
        __metadata("design:type", Array)
    ], PaginatedReviews.prototype, "reviews", void 0);
    __decorate([
        type_graphql_1.Field(function (type) { return type_graphql_1.Int; }),
        __metadata("design:type", Number)
    ], PaginatedReviews.prototype, "offset", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Boolean)
    ], PaginatedReviews.prototype, "hasMore", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Number)
    ], PaginatedReviews.prototype, "maxRating", null);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Number)
    ], PaginatedReviews.prototype, "minRating", null);
    PaginatedReviews = __decorate([
        type_graphql_1.ObjectType(),
        __metadata("design:paramtypes", [Array, Number, Boolean])
    ], PaginatedReviews);
    return PaginatedReviews;
}());
exports.PaginatedReviews = PaginatedReviews;
var ReviewConnection = (function () {
    function ReviewConnection(totalCount, records) {
        this.totalCount = totalCount;
        this.edges = records.map(function (review) { return new ReviewEdge(review, review.id.toString()); });
    }
    __decorate([
        type_graphql_1.Field(function (type) { return type_graphql_1.Int; }),
        __metadata("design:type", Number)
    ], ReviewConnection.prototype, "totalCount", void 0);
    __decorate([
        type_graphql_1.Field(function (type) { return [ReviewEdge]; }),
        __metadata("design:type", Array)
    ], ReviewConnection.prototype, "edges", void 0);
    ReviewConnection = __decorate([
        type_graphql_1.ObjectType(),
        __metadata("design:paramtypes", [Number, Array])
    ], ReviewConnection);
    return ReviewConnection;
}());
exports.ReviewConnection = ReviewConnection;
var ReviewEdge = (function () {
    function ReviewEdge(node, cursor) {
        this.node = node;
        this.cursor = cursor;
    }
    __decorate([
        type_graphql_1.Field(function (type) { return Review_1.Review; }),
        __metadata("design:type", Review_1.Review)
    ], ReviewEdge.prototype, "node", void 0);
    __decorate([
        type_graphql_1.Field(),
        __metadata("design:type", String)
    ], ReviewEdge.prototype, "cursor", void 0);
    ReviewEdge = __decorate([
        type_graphql_1.ObjectType(),
        __metadata("design:paramtypes", [Review_1.Review, String])
    ], ReviewEdge);
    return ReviewEdge;
}());
exports.ReviewEdge = ReviewEdge;
//# sourceMappingURL=PaginatedReviews.js.map