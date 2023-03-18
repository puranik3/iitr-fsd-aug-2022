const person = {
    celebrateBirthday: function() {
        this.age++;
    }
}

// Whatever properties are available on the prototype are accessible directly from the object
// person is the prototype for john
const john = {
    name: 'John',
    age: 32,
    __proto__: person
};

// person is the prototype for jane
const jane = {
    name: 'Jane',
    age: 28,
    __proto__: person
};

john.celebrateBirthday();
jane.celebrateBirthday();

console.log( john );
console.log( jane );