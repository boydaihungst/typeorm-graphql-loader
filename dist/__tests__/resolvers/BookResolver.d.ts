import { Book } from "../entity";
import { GraphQLDatabaseLoader } from "../../GraphQLDatabaseLoader";
import { GraphQLResolveInfo } from "graphql";
import { BookCreateResultType } from "../entity/Book";
import { Connection } from "typeorm";
declare enum Transform {
    LOWERCASE = "LOWERCASE"
}
export declare class BookResolver {
    transformedTitle(transform: Transform, book: Book): Promise<string>;
    booksByAuthorId(authorId: number, loader: GraphQLDatabaseLoader, info: GraphQLResolveInfo): Promise<Book[]>;
    booksByAuthorOrPublisher(publisherId: number, authorId: number, useBrackets: boolean | undefined, loader: GraphQLDatabaseLoader, info: GraphQLResolveInfo): Promise<Book[]>;
    createBook(title: string, summary: string, authorId: number, publisherId: number, loader: GraphQLDatabaseLoader, connection: Connection, info: GraphQLResolveInfo): Promise<typeof BookCreateResultType>;
}
export {};
