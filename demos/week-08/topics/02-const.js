// const is used when you have to share some values across your code, but that value will nor change during execution

// MUST be initialized
const PI = 3.14;

// PI = 3.15; // cannot reinitialize

const john = {
    name: 'John',
    age: 32
};

// john = { // error - cannot reinitialize
//     name: 'John',
//     age: 33
// };

// john is STILL THE SAME OBJECT. property age is changed - this is ok
// Object mutations are allowed
john.age++;

console.log( john );