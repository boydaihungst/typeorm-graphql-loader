import { LoaderNamingStrategyEnum, LoaderSearchMethod } from "..";
export declare class Formatter {
    private _namingStrategy;
    private readonly _searchMethodMapping;
    constructor(_namingStrategy: LoaderNamingStrategyEnum);
    columnSelection(alias: string, field: string): string;
    aliasField(alias: string, field: string): string;
    getSearchMethodMapping(method: LoaderSearchMethod, searchText: string): Function;
    formatSearchColumns(searchColumns: Array<string | Array<string>>, alias: string, caseSensitive: boolean | undefined): string[];
}
