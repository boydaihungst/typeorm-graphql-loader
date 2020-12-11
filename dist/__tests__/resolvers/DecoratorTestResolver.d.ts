import { Author, DecoratorTest } from "../entity";
import { GraphQLDatabaseLoader } from "../../GraphQLDatabaseLoader";
import { GraphQLResolveInfo } from "graphql";
import { Address } from "../entity/Address";
export declare class DecoratorTestResolver {
    decoratorTests(dtId: number, ignoreField: boolean, requireField: boolean, ignoreRelation: boolean, requireRelation: boolean, requireEmbed: boolean, ignoreEmbed: boolean, loader: GraphQLDatabaseLoader, info: GraphQLResolveInfo): Promise<DecoratorTest | undefined>;
    customSQLAlias(relationId: number, loader: GraphQLDatabaseLoader, info: GraphQLResolveInfo): Promise<DecoratorTest | undefined>;
    remappedField(parent: DecoratorTest): string;
    remappedEmbed(parent: DecoratorTest): Address;
    remappedRelation(parent: DecoratorTest): Author;
}
