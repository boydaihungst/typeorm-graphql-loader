import { GraphQLEntityFields, LoaderOptions, QueryMeta, QueueItem, WhereExpression } from './types';
import { Connection } from 'typeorm';
export declare class GraphQLQueryManager {
    private _connection;
    private _queue;
    private _cache;
    private _immediate?;
    private readonly _defaultLoaderSearchMethod;
    private _resolver;
    private _formatter;
    constructor(_connection: Connection, options?: LoaderOptions);
    private static createTypeORMQueryBuilder;
    private static _breakDownWhereExpression;
    processQueryMeta(fields: GraphQLEntityFields | null, where: Array<WhereExpression>, alias: string): QueryMeta;
    addQueueItem(item: QueueItem): void;
    addCacheItem<T>(key: string, value: Promise<T | undefined>): void;
    private _setImmediate;
    private _processQueue;
    private _resolveQueueItem;
    private _addAndWhereConditions;
    private _addOrWhereConditions;
    private _addSearchConditions;
    private _formatSearchConditions;
    private _addPagination;
    private _addOrderByCondition;
    private _addSelectFields;
}
