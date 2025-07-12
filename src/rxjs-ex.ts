import { Subject } from "rxjs";
import type { PRXSubject } from "./types";

export function createSubject<T>(): PRXSubject<T>{
    const subject = new Subject<T>();
    return { subscribe: subject.subscribe, next: subject.next, dispose: subject.complete } as PRXSubject<T>;
}
export function convertSubject<T>(subject: Subject<T>): PRXSubject<T>{
    return { subscribe: subject.subscribe, next: subject.next, dispose: subject.complete } as PRXSubject<T>;
}