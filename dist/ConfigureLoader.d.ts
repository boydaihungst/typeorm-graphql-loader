import "reflect-metadata";
import { FieldConfigurationPredicate, GraphQLEntityFields, LoaderFieldConfiguration, RequireOrIgnoreSettings } from "./types";
export declare const ConfigureLoader: (options: LoaderFieldConfiguration) => (target: any, propertyKey: string) => void;
export declare const getLoaderRequiredFields: (target: any) => RequireOrIgnoreSettings;
export declare const getLoaderIgnoredFields: (target: any) => RequireOrIgnoreSettings;
export declare const getGraphQLFieldNames: (target: any) => Map<string, string>;
export declare const resolvePredicate: (predicate: boolean | FieldConfigurationPredicate | undefined, context: any, selection: GraphQLEntityFields | undefined) => boolean | undefined;
export declare const getSQLJoinAliases: (target: any) => Map<string, string | undefined>;
