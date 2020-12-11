import { Brackets, ObjectLiteral, OrderByCondition, SelectQueryBuilder } from 'typeorm';
import { PagniationOtions } from 'typeorm-cursor-pagination';
import { LoaderNamingStrategyEnum } from './enums/LoaderNamingStrategy';
import { LoaderSearchMethod } from './enums/LoaderSearchMethod';
export declare type WhereArgument = string | Brackets;
export declare type WhereExpression = LoaderWhereExpression | Brackets;
export interface LoaderWhereExpression {
    condition: string;
    params?: ObjectLiteral;
}
export interface LoaderOptions {
    namingStrategy?: LoaderNamingStrategyEnum;
    primaryKeyColumn?: string;
    defaultSearchMethod?: LoaderSearchMethod;
    maxQueryDepth?: number;
}
export interface SearchOptions {
    searchColumns: Array<string | Array<string>>;
    searchText: string;
    searchMethod?: LoaderSearchMethod;
    caseSensitive?: boolean;
}
export interface QueryPagination extends Partial<PagniationOtions<any>> {
    limit?: number;
    offset?: number;
}
export declare type FieldConfigurationPredicate = (context: any, queriedFields: Array<string>, selection: GraphQLEntityFields) => boolean;
export interface LoaderFieldConfiguration {
    ignore?: boolean | FieldConfigurationPredicate;
    required?: boolean | FieldConfigurationPredicate;
    graphQLName?: string;
    sqlJoinAlias?: string;
}
export declare type RequireOrIgnoreSettings = Map<string, boolean | FieldConfigurationPredicate | undefined>;
export declare type EjectQueryCallback<T> = <T>(qb: SelectQueryBuilder<T>) => SelectQueryBuilder<T>;
export interface QueryPredicates {
    andWhere: Array<WhereExpression>;
    orWhere: Array<WhereExpression>;
    search: Array<SearchOptions>;
    order: OrderByCondition;
    selectFields: Array<string>;
}
export interface QueueItem {
    many: boolean;
    key: string;
    fields: GraphQLEntityFields | null;
    predicates: QueryPredicates;
    resolve: (value?: any) => any;
    reject: (reason: any) => void;
    entity: Function | string;
    pagination?: QueryPagination;
    alias?: string;
    context?: any;
    ejectQueryCallback: EjectQueryCallback<any>;
}
export interface QueryMeta {
    key: string;
    fields: GraphQLEntityFields | null;
    found: boolean;
    item?: Promise<any>;
}
export interface GraphQLFieldArgs {
    [key: string]: any;
}
export declare type GraphQLEntityFields = {
    [field: string]: {
        children: GraphQLEntityFields;
        arguments?: GraphQLFieldArgs;
    };
};
