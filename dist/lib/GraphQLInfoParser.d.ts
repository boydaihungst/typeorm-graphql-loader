import { GraphQLResolveInfo } from "graphql";
import { GraphQLEntityFields } from "../types";
export declare class GraphQLInfoParser {
    parseResolveInfoModels(info: GraphQLResolveInfo, fieldName?: string): GraphQLEntityFields;
    private recursiveInfoParser;
}
