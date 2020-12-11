import { Publisher } from "../entity";
import { GraphQLDatabaseLoader } from "../../GraphQLDatabaseLoader";
import { GraphQLResolveInfo } from "graphql";
export declare class PublisherResolver {
    publisherByBookTitle(bookTitle: string, loader: GraphQLDatabaseLoader, info: GraphQLResolveInfo): Promise<Publisher | undefined>;
}
