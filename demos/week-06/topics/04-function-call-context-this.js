// window (browser) | global (node)
function foo() {
    console.log( this ); // function's context - it is set to something that will be useful for the function
}

foo();

var john = {
    name: 'John',
    age: 32,
    celebrateBirthday: function() {
        this.age++; // this is the "calling object"
    }
};

john.celebrateBirthday();

console.log( john );

var jane = {
    name: 'Jane',
    age: 28
};

john.celebrateBirthday.call( jane );

console.log( jane );