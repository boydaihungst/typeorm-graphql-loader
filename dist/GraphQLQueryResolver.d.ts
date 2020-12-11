import { GraphQLEntityFields, LoaderOptions } from "./types";
import { Connection, SelectQueryBuilder } from "typeorm";
export declare class GraphQLQueryResolver {
    private readonly _primaryKeyColumn?;
    private readonly _namingStrategy;
    private _formatter;
    private readonly _maxDepth;
    constructor({ primaryKeyColumn, namingStrategy, maxQueryDepth, }: LoaderOptions);
    private static _generateChildHash;
    createQuery(model: Function | string, selection: GraphQLEntityFields | null, connection: Connection, queryBuilder: SelectQueryBuilder<{}>, alias: string, context: any, depth?: number): SelectQueryBuilder<{}>;
    private _selectEmbeddedFields;
    private _selectFields;
    private _selectPrimaryKey;
    private _selectRelations;
    private _selectRequiredFields;
    private _selectRequiredColumns;
    private _selectRequiredEmbeds;
}
