function printPerson( person, fetchTitle ) {
    console.log( fetchTitle( person ) + " " + person.name + " is " + person.age + " years old" );
}

var john = {
    name: 'John',
    age: 32,
    gender: 'male'
};

function getTitle( person ) {
    return person.gender === 'male' ? 'Mr' : 'Ms';
}

function getFrenchTitle( person ) {
    return person.gender === 'male' ? 'Monsieur' : 'Madame';
}


// person = john
// fetchTitle = getTitle
printPerson( john, getTitle );
printPerson(
    {
        name: 'Jane',
        age: 32,
        gender: 'female'
    },
    getTitle
);
printPerson( john, getFrenchTitle );