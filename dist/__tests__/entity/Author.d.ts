import { BaseEntity } from "typeorm";
import { Book } from "./Book";
import { Address } from "./Address";
export declare class Author extends BaseEntity {
    id: number;
    address: Address;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    books: Book[];
    createdAt: Date;
    updatedAt: Date;
}
