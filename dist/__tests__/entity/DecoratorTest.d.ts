import { BaseEntity } from "typeorm";
import { Author } from "./Author";
import { Address } from "./Address";
export declare class DecoratorTest extends BaseEntity {
    id: number;
    testField?: string;
    testRemappedField: string;
    testEmbed: Address;
    testRemappedEmbed: Address;
    testRelation: Author;
    testRemappedRelation: Author;
    createdAt: Date;
    updatedAt: Date;
}
