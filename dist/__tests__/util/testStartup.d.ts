import { Connection } from "typeorm";
import { GraphQLDatabaseLoader } from "../../GraphQLDatabaseLoader";
import { LoaderOptions } from "../../types";
import { GraphQLSchema } from "graphql";
export interface TestHelpers {
    schema: GraphQLSchema;
    loader: GraphQLDatabaseLoader;
    connection: Connection;
}
export interface StartupOptions {
    loaderOptions?: LoaderOptions;
    logging?: boolean;
}
export declare function startup(testName: string, options?: StartupOptions): Promise<TestHelpers>;
