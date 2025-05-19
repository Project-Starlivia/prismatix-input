
export type Multiable<T> = T | T[];

export function multiableToArray<T>(multi: T | T[]): T[] {
    return Array.isArray(multi) ? multi : [multi];
}

export type EmptyObject = Record<string, never>;