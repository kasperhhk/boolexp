class Bool<T> {
    constructor(public value: T) {}

    public bind<U>(f: (e: T) => Bool<U>) {
        return new Bool(f(this.value));
    }
}

const b = new Bool(1);
console.log("hello " + b.value);