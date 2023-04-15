type Person = {
    name: string,
    readonly age: number, // like const is for object, readonly is for property
    spouse?: Person, // spouse may or may not be present in the object
    celebrateBirthday?: () => void
};

const john : Person = {
    name: 'John',
    age: 32
};

john.name = 'Jonathan';

const jane : Person = {
    name: 'Jane',
    age: 28,
    spouse: john
};

john.spouse = jane;
// john.age = 33; // error

console.log( john );
console.log( jane );

export {}