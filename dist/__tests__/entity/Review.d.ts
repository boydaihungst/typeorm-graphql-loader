import { BaseEntity } from "typeorm";
import { Book } from "./Book";
export declare class Review extends BaseEntity {
    id: number;
    title: string;
    body: string;
    reviewDate: Date;
    rating: number;
    reviewerName: string;
    book: Book;
}
