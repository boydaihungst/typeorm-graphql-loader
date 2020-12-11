import { ColumnMetadata } from "typeorm/metadata/ColumnMetadata";
import { GraphQLEntityFields, RequireOrIgnoreSettings } from "../types";
import { EmbeddedMetadata } from "typeorm/metadata/EmbeddedMetadata";
import { RelationMetadata } from "typeorm/metadata/RelationMetadata";
export declare const requestedFieldsFilter: (ignoredFields: RequireOrIgnoreSettings, graphQLFieldNames: Map<string, string>, selection: GraphQLEntityFields, context: any) => (column: ColumnMetadata) => boolean;
export declare const requestedEmbeddedFieldsFilter: (ignoredFields: RequireOrIgnoreSettings, graphQLFieldNames: Map<string, string>, selection: GraphQLEntityFields, context: any) => (embed: EmbeddedMetadata) => boolean;
export declare const requestedRelationFilter: (ignoredFields: RequireOrIgnoreSettings, requiredFields: RequireOrIgnoreSettings, graphQLFieldNames: Map<string, string>, selection: GraphQLEntityFields, context: any) => (relation: RelationMetadata) => boolean | undefined;
