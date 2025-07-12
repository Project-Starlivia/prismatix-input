export type Multiable<T> = T | readonly T[];
export declare function multiableToArray<T>(multi: Multiable<T>): readonly T[];
export type EmptyObject = Record<string, never>;
