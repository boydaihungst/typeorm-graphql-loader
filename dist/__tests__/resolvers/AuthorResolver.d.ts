import { Author } from "../entity";
import { GraphQLDatabaseLoader } from "../../GraphQLDatabaseLoader";
import { GraphQLResolveInfo } from "graphql";
import { LoaderSearchMethod } from "../..";
export declare class AuthorResolver {
    authorById(id: number, loader: GraphQLDatabaseLoader, info: GraphQLResolveInfo): Promise<Author>;
    searchAuthors(loader: GraphQLDatabaseLoader, info: GraphQLResolveInfo, searchText: string, searchMethod?: LoaderSearchMethod, caseSensitive?: boolean, searchCombinedName?: boolean): Promise<Author[]>;
}
