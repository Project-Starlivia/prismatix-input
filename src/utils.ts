export type Multiable<T> = T | readonly T[];

export function multiableToArray<T>(multi: Multiable<T>): readonly T[] {
    return Array.isArray(multi) ? multi as readonly T[] : [multi as T];
}

export type EmptyObject = Record<string, never>;

export const EMPTY_OBJECT: EmptyObject = Object.freeze({});

export function createId(prefix: string, counter: number): string {
    return counter === 0 ? prefix : `${prefix}${counter}`;
}

export function isNonNullable<T>(value: T | null | undefined): value is T {
    return value != null;
}