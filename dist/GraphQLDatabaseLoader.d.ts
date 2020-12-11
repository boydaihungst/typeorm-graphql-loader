import { LoaderOptions } from "./types";
import { BaseEntity, Connection } from "typeorm";
import { GraphQLQueryBuilder } from "./GraphQLQueryBuilder";
export declare class GraphQLDatabaseLoader {
    private readonly _queryManager;
    constructor(connection: Connection, options?: LoaderOptions);
    loadEntity<T extends typeof BaseEntity>(entity: T, alias?: string): GraphQLQueryBuilder<T>;
}
