export abstract class BoolExp<T> {
    public abstract map<U>(f: (e: T) => U): BoolExp<U>;
    public abstract evaluate(f: (e: T) => boolean): boolean;
    public abstract toString(): string;
}

function construct<T>(value: T | BoolExp<T>) {
    if (value instanceof BoolExp) return value;
    return new Value(value);
}

class Value<T> extends BoolExp<T> {
    constructor(private value: T) {
        super();
    }

    public map<U>(f: (e: T) => U): BoolExp<U> {
        return new Value(f(this.value));
    }

    public evaluate(f: (e: T) => boolean): boolean {
        return f(this.value);
    }

    public toString() {
        return JSON.stringify(this.value);
    }
}

class And<T> extends BoolExp<T> {
    constructor(...values: (T | BoolExp<T>)[]) {
        super();
        this.values = values.map(construct);
    }

    private values: BoolExp<T>[];

    public map<U>(f: (e: T) => U): BoolExp<U> {
        return new And<U>(...this.values.map(v => v.map(f)));
    }

    public evaluate(f: (e: T) => boolean): boolean {
        return this.values.reduce<boolean>((p, c) => p && c.evaluate(f), true);
    }

    public toString() {
        return `and(${this.values.map(v => v.toString()).join(", ")})`;
    }
}

class Or<T> extends BoolExp<T> {
    constructor(...values: (T | BoolExp<T>)[]) {
        super();
        this.values = values.map(construct);
    }

    private values: BoolExp<T>[];

    public map<U>(f: (e: T) => U): BoolExp<U> {
        return new Or<U>(...this.values.map(v => v.map(f)));
    }

    public evaluate(f: (e: T) => boolean): boolean {
        return this.values.reduce<boolean>((p, c) => p || c.evaluate(f), false);
    }

    public toString() {
        return `or(${this.values.map(v => v.toString()).join(", ")})`;
    }
}

export function and<T>(...values: (T | BoolExp<T>)[]) {
    return new And<T>(...values);
}

export function or<T>(...values: (T | BoolExp<T>)[]) {
    return new Or<T>(...values);
}