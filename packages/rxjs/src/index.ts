﻿import { Subject } from "rxjs";
import type { PRXSubject } from "@starlivia/prismatix-input-core";

export function createSubject<T>(){
    const subject = new Subject<T>();
    return { ...subject, ...convertSubject(subject) };
}
export function convertSubject<T>(subject: Subject<T>): PRXSubject<T>{
    return { subscribe: subject.subscribe.bind(subject), next: subject.next.bind(subject), dispose: () => subject.complete() } as PRXSubject<T>;
}
