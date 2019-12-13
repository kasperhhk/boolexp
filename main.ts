import { and, or, BoolExp } from './bool';

(function() {
    const map = (s: string) => s.length;
    const check = (n: number) => n > 1;

    const cases: [BoolExp<string>, boolean][] = [
        [and("a", "b1", or("c", "d1")), false],
        [and("a1", "b1", or("c", "d1")), true],
        [and("a1", "b1", or("c", "d")), false],
        [and("a12", "b12", or("c", "d12")), true]
    ];

    cases.forEach((c, i) => {
        const exp = c[0];
        const mexp = exp.map(map);
        const cexp = mexp.evaluate(check);
        const expect = c[1];

        console.group("case " + i);
        console.log("exp", exp.toString());
        console.log("mexp", mexp.toString());
        console.log("evaluated", cexp);
        console.log("expected", expect);
        console.log("success?", cexp === expect);
        console.groupEnd();
    });
})();