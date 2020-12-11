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
exports.Publisher = void 0;
var typeorm_1 = require("typeorm");
var Book_1 = require("./Book");
var type_graphql_1 = require("type-graphql");
var Address_1 = require("./Address");
var Publisher = (function (_super) {
    __extends(Publisher, _super);
    function Publisher() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        type_graphql_1.Field(function (type) { return type_graphql_1.Int; }),
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Publisher.prototype, "id", void 0);
    __decorate([
        type_graphql_1.Field(),
        typeorm_1.Column("varchar"),
        __metadata("design:type", String)
    ], Publisher.prototype, "name", void 0);
    __decorate([
        type_graphql_1.Field(function (type) { return Address_1.Address; }),
        typeorm_1.Column(function (type) { return Address_1.Address; }),
        __metadata("design:type", Address_1.Address)
    ], Publisher.prototype, "address", void 0);
    __decorate([
        type_graphql_1.Field(function (type) { return Address_1.Address; }),
        typeorm_1.Column(function (type) { return Address_1.Address; }),
        __metadata("design:type", Address_1.Address)
    ], Publisher.prototype, "poBox", void 0);
    __decorate([
        type_graphql_1.Field(function (type) { return [Book_1.Book]; }, { nullable: true }),
        typeorm_1.OneToMany(function (type) { return Book_1.Book; }, function (book) { return book.publisher; }),
        __metadata("design:type", Array)
    ], Publisher.prototype, "books", void 0);
    Publisher = __decorate([
        type_graphql_1.ObjectType(),
        typeorm_1.Entity()
    ], Publisher);
    return Publisher;
}(typeorm_1.BaseEntity));
exports.Publisher = Publisher;
//# sourceMappingURL=Publisher.js.map