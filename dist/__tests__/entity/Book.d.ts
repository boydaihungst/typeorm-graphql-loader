import { BaseEntity } from "typeorm";
import { Author } from "./Author";
import { Publisher } from "./Publisher";
import { Review } from "./Review";
export declare class Book extends BaseEntity {
    id: number;
    isPublished: boolean;
    title: string;
    summary: string;
    publishedDate: Date;
    author: Author;
    publisher: Publisher;
    reviews: Review[];
    createdAt: Date;
    updatedAt: Date;
}
export declare class BookCreateSuccess {
    readonly data: Book;
    constructor(data: Book);
}
export declare class BookCreateError {
    readonly message: string;
    constructor(message: string);
}
export declare const BookCreateResultType: BookCreateSuccess | BookCreateError;
