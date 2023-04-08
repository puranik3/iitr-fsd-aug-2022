class Person {
    constructor( name, age ) {
        this.name = name;
        this.age = age;
    }

    celebrateBirthday() {
        this.age++;
    }
}

const john = new Person( 'John', 32 );
const jane = new Person( 'Jane', 28 );

john.celebrateBirthday();

console.log( john, jane );