// Use 1 (just like in Java): Used to define the public facing API for an object or a class
// Use 2 (specific to TS): Define type of an object

interface Person {
    readonly name: string,
    age: number,
    spouse?: Person,
    celebrateBirthday: () => void
};

const john : Person = {
    name: 'John',
    age: 32,
    celebrateBirthday() {
        this.age++;
    }
};

// john.name = 'Jonathan'; // error