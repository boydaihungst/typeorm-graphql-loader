import { Review } from "./Review";
export declare class PaginatedReviews {
    readonly reviews: Review[];
    readonly offset: number;
    readonly hasMore: boolean;
    constructor(reviews: Review[], offset: number, hasMore: boolean);
    maxRating(): number;
    minRating(): number;
}
export declare class ReviewConnection {
    readonly totalCount: number;
    readonly edges: ReviewEdge[];
    constructor(totalCount: number, records: Review[]);
}
export declare class ReviewEdge {
    readonly node: Review;
    readonly cursor: string;
    constructor(node: Review, cursor: string);
}
