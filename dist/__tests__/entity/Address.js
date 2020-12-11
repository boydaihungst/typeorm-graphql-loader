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
exports.Address = void 0;
var typeorm_1 = require("typeorm");
var type_graphql_1 = require("type-graphql");
var ConfigureLoader_1 = require("../../ConfigureLoader");
var Address = (function () {
    function Address() {
    }
    __decorate([
        type_graphql_1.Field(),
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Address.prototype, "street", void 0);
    __decorate([
        typeorm_1.Column(),
        ConfigureLoader_1.ConfigureLoader({ graphQLName: "unitNumber" }),
        __metadata("design:type", String)
    ], Address.prototype, "street2", void 0);
    __decorate([
        type_graphql_1.Field(),
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Address.prototype, "city", void 0);
    __decorate([
        type_graphql_1.Field(),
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Address.prototype, "state", void 0);
    __decorate([
        type_graphql_1.Field(),
        typeorm_1.Column({ name: "postCode" }),
        __metadata("design:type", String)
    ], Address.prototype, "zip", void 0);
    Address = __decorate([
        type_graphql_1.ObjectType()
    ], Address);
    return Address;
}());
exports.Address = Address;
//# sourceMappingURL=Address.js.map