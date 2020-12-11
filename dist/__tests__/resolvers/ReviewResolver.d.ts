import { PaginatedReviews, ReviewConnection } from "../entity/PaginatedReviews";
import { GraphQLDatabaseLoader } from "../../GraphQLDatabaseLoader";
import { GraphQLResolveInfo } from "graphql";
export declare class ReviewResolver {
    paginatedReviews(offset: number, limit: number, loader: GraphQLDatabaseLoader, info: GraphQLResolveInfo): Promise<PaginatedReviews>;
    reviewConnection(loader: GraphQLDatabaseLoader, info: GraphQLResolveInfo): Promise<ReviewConnection>;
    deprecatedPrimaryKey(offset: number, limit: number, loader: GraphQLDatabaseLoader, info: GraphQLResolveInfo): Promise<PaginatedReviews>;
}
