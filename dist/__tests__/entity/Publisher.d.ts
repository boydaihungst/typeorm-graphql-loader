import { BaseEntity } from "typeorm";
import { Book } from "./Book";
import { Address } from "./Address";
export declare class Publisher extends BaseEntity {
    id: number;
    name: string;
    address: Address;
    poBox: Address;
    books: Book[];
}
