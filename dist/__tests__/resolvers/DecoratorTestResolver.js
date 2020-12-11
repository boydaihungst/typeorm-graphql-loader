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
exports.DecoratorTestResolver = void 0;
var type_graphql_1 = require("type-graphql");
var entity_1 = require("../entity");
var GraphQLDatabaseLoader_1 = require("../../GraphQLDatabaseLoader");
var Address_1 = require("../entity/Address");
var DecoratorTestResolver = (function () {
    function DecoratorTestResolver() {
    }
    DecoratorTestResolver.prototype.decoratorTests = function (dtId, ignoreField, requireField, ignoreRelation, requireRelation, requireEmbed, ignoreEmbed, loader, info) {
        return __awaiter(this, void 0, void 0, function () {
            var record;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, loader
                            .loadEntity(entity_1.DecoratorTest, "dt")
                            .info(info)
                            .context({
                            ignoreRelation: ignoreRelation,
                            ignoreEmbed: ignoreEmbed,
                            ignoreField: ignoreField,
                            requireRelation: requireRelation,
                            requireField: requireField,
                            requireEmbed: requireEmbed,
                        })
                            .where("dt.id = :id", { id: dtId })
                            .loadOne()];
                    case 1:
                        record = _a.sent();
                        if (ignoreField && (record === null || record === void 0 ? void 0 : record.testField)) {
                            throw new Error("Validation Failed: Ignored Field is present in response");
                        }
                        if (ignoreRelation && (record === null || record === void 0 ? void 0 : record.testRelation)) {
                            throw new Error("Validation Failed: Ignored Relation is present in response");
                        }
                        if (requireField && !(record === null || record === void 0 ? void 0 : record.testField)) {
                            throw new Error("Validation Failed: Required Field is missing in response");
                        }
                        if (requireRelation && !(record === null || record === void 0 ? void 0 : record.testRelation)) {
                            throw new Error("Validation Failed: Required Relation is missing in response");
                        }
                        if (requireEmbed && !(record === null || record === void 0 ? void 0 : record.testEmbed)) {
                            throw new Error("Validation Failed: Required Embed is missing in response");
                        }
                        if (ignoreEmbed && (record === null || record === void 0 ? void 0 : record.testEmbed)) {
                            throw new Error("Validation Failed: Ignored embed is present in response");
                        }
                        return [2, record];
                }
            });
        });
    };
    DecoratorTestResolver.prototype.customSQLAlias = function (relationId, loader, info) {
        return loader
            .loadEntity(entity_1.DecoratorTest, "dt")
            .info(info)
            .context({ requireRelation: true })
            .ejectQueryBuilder(function (qb) {
            return qb.where("user_named_alias.id = :relationId", { relationId: relationId });
        })
            .loadOne();
    };
    DecoratorTestResolver.prototype.remappedField = function (parent) {
        return parent.testRemappedField;
    };
    DecoratorTestResolver.prototype.remappedEmbed = function (parent) {
        return parent.testRemappedEmbed;
    };
    DecoratorTestResolver.prototype.remappedRelation = function (parent) {
        return parent.testRemappedRelation;
    };
    __decorate([
        type_graphql_1.Query(function (returns) { return entity_1.DecoratorTest; }),
        __param(0, type_graphql_1.Arg("dtId", function (type) { return type_graphql_1.Int; })),
        __param(1, type_graphql_1.Arg("ignoreField", { nullable: true, defaultValue: false })),
        __param(2, type_graphql_1.Arg("requireField", { nullable: true, defaultValue: false })),
        __param(3, type_graphql_1.Arg("ignoreRelation", { nullable: true, defaultValue: false })),
        __param(4, type_graphql_1.Arg("requireRelation", { nullable: true, defaultValue: false })),
        __param(5, type_graphql_1.Arg("requireEmbed", { nullable: true, defaultValue: false })),
        __param(6, type_graphql_1.Arg("ignoreEmbed", { nullable: true, defaultValue: false })),
        __param(7, type_graphql_1.Ctx("loader")),
        __param(8, type_graphql_1.Info()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, Boolean, Boolean, Boolean, Boolean, Boolean, Boolean, GraphQLDatabaseLoader_1.GraphQLDatabaseLoader, Object]),
        __metadata("design:returntype", Promise)
    ], DecoratorTestResolver.prototype, "decoratorTests", null);
    __decorate([
        type_graphql_1.Query(function (type) { return entity_1.DecoratorTest; }),
        __param(0, type_graphql_1.Arg("relationId", function (type) { return type_graphql_1.Int; })),
        __param(1, type_graphql_1.Ctx("loader")),
        __param(2, type_graphql_1.Info()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, GraphQLDatabaseLoader_1.GraphQLDatabaseLoader, Object]),
        __metadata("design:returntype", void 0)
    ], DecoratorTestResolver.prototype, "customSQLAlias", null);
    __decorate([
        type_graphql_1.FieldResolver(),
        __param(0, type_graphql_1.Root()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [entity_1.DecoratorTest]),
        __metadata("design:returntype", String)
    ], DecoratorTestResolver.prototype, "remappedField", null);
    __decorate([
        type_graphql_1.FieldResolver(),
        __param(0, type_graphql_1.Root()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [entity_1.DecoratorTest]),
        __metadata("design:returntype", Address_1.Address)
    ], DecoratorTestResolver.prototype, "remappedEmbed", null);
    __decorate([
        type_graphql_1.FieldResolver(),
        __param(0, type_graphql_1.Root()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [entity_1.DecoratorTest]),
        __metadata("design:returntype", entity_1.Author)
    ], DecoratorTestResolver.prototype, "remappedRelation", null);
    DecoratorTestResolver = __decorate([
        type_graphql_1.Resolver(entity_1.DecoratorTest)
    ], DecoratorTestResolver);
    return DecoratorTestResolver;
}());
exports.DecoratorTestResolver = DecoratorTestResolver;
//# sourceMappingURL=DecoratorTestResolver.js.map