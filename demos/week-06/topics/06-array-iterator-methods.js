const persons = [
    { name: 'John', age: 32, city: 'Bangalore' },
    { name: 'Jane', age: 28, city: 'Bangalore' },
    { name: 'Mark', age: 40, city: 'Hyderabad' },
    { name: 'Mary', age: 44, city: 'Hyderabad' },
    { name: 'David', age: 60, city: 'Delhi' }
];

// Go through each and print the name and age
function printNameAndAge( person ) {
    console.log( person.name, person.age );
}

persons.forEach( printNameAndAge );

persons.forEach(function( person ) {
    console.log( person.name, person.age );
});

// We want an array with the names of the persons - map()
// [ 'John', 'Jane', ... ]
var personNames = persons.map(function( person ) {
    return person.name;
});
console.log( personNames );

// We want people from Hyderabad
const hyderabadis = persons.filter(function( person ) {
    return person.city === 'Hyderabad';
});
console.log( hyderabadis );

const hyderabadiPersonNames = persons.filter(function( p ) {
    return p.city === 'Hyderabad'
}).map(function( p ) {
    return p.name;
});
console.log( hyderabadiPersonNames );
