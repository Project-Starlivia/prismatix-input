export type Multiable<T> = T | readonly T[];

export function multiableToArray<T>(multi: Multiable<T>): readonly T[] {
    return Array.isArray(multi) ? multi as readonly T[] : [multi as T];
}

export type EmptyObject = Record<string, never>;