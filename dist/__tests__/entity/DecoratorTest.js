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
exports.DecoratorTest = void 0;
var typeorm_1 = require("typeorm");
var type_graphql_1 = require("type-graphql");
var __1 = require("../../");
var Author_1 = require("./Author");
var Address_1 = require("./Address");
var DecoratorTest = (function (_super) {
    __extends(DecoratorTest, _super);
    function DecoratorTest() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        type_graphql_1.Field(function (type) { return type_graphql_1.Int; }),
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], DecoratorTest.prototype, "id", void 0);
    __decorate([
        type_graphql_1.Field({ nullable: true }),
        typeorm_1.Column("varchar", { nullable: false }),
        __1.ConfigureLoader({
            ignore: function (context) { return context.ignoreField; },
            required: function (context) { return context.requireField; },
        }),
        __metadata("design:type", String)
    ], DecoratorTest.prototype, "testField", void 0);
    __decorate([
        typeorm_1.Column("varchar", { nullable: false }),
        __1.ConfigureLoader({
            graphQLName: "remappedField",
        }),
        __metadata("design:type", String)
    ], DecoratorTest.prototype, "testRemappedField", void 0);
    __decorate([
        type_graphql_1.Field(function (type) { return Address_1.Address; }, { nullable: true }),
        typeorm_1.Column(function (type) { return Address_1.Address; }),
        __1.ConfigureLoader({
            ignore: function (context) { return context.ignoreEmbed; },
            required: function (context) { return context.requireEmbed; },
        }),
        __metadata("design:type", Address_1.Address)
    ], DecoratorTest.prototype, "testEmbed", void 0);
    __decorate([
        typeorm_1.Column(function (type) { return Address_1.Address; }),
        __1.ConfigureLoader({
            graphQLName: "remappedEmbed",
        }),
        __metadata("design:type", Address_1.Address)
    ], DecoratorTest.prototype, "testRemappedEmbed", void 0);
    __decorate([
        typeorm_1.OneToOne(function (type) { return Author_1.Author; }),
        typeorm_1.JoinColumn(),
        type_graphql_1.Field(function (type) { return Author_1.Author; }, { nullable: true }),
        __1.ConfigureLoader({
            ignore: function (context) { return context.ignoreRelation; },
            required: function (context) { return context.requireRelation; },
            sqlJoinAlias: "user_named_alias",
        }),
        __metadata("design:type", Author_1.Author)
    ], DecoratorTest.prototype, "testRelation", void 0);
    __decorate([
        typeorm_1.OneToOne(function (type) { return Author_1.Author; }),
        typeorm_1.JoinColumn(),
        __1.ConfigureLoader({
            graphQLName: "remappedRelation",
        }),
        __metadata("design:type", Author_1.Author)
    ], DecoratorTest.prototype, "testRemappedRelation", void 0);
    __decorate([
        type_graphql_1.Field(),
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], DecoratorTest.prototype, "createdAt", void 0);
    __decorate([
        type_graphql_1.Field(),
        typeorm_1.UpdateDateColumn(),
        __metadata("design:type", Date)
    ], DecoratorTest.prototype, "updatedAt", void 0);
    DecoratorTest = __decorate([
        type_graphql_1.ObjectType(),
        typeorm_1.Entity()
    ], DecoratorTest);
    return DecoratorTest;
}(typeorm_1.BaseEntity));
exports.DecoratorTest = DecoratorTest;
//# sourceMappingURL=DecoratorTest.js.map