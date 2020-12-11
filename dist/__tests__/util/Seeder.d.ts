import { Connection } from "typeorm";
export declare class Seeder {
    private conn;
    private readonly NUM_AUTHORS;
    private readonly NUM_PUBLISHERS;
    private readonly NUM_BOOKS;
    private readonly NUM_REVIEWS;
    private readonly NUM_DECORATOR_TESTS;
    constructor(conn: Connection);
    static addressFactory(): {
        street: string;
        street2: string;
        city: string;
        state: string;
        zip: string;
    };
    seed(): Promise<void>;
    private seedAuthors;
    private seedPublishers;
    private seedBooks;
    private seedReviews;
    private seedDecoratorTests;
}
