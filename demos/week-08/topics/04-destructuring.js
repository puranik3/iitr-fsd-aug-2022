const days = [
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri'
];

// const first = days[0], second = days[1], fifth = days[4];
const [ first, second, , , fifth ] = days;
console.log( first, second, fifth );

const john = {
    name: 'John',
    age: 32,
    address: {
        city: 'Bengaluru',
        state: 'Karnataka'
    },
    emails: [
        'john@gmail.com',
        'john@example.com'
    ]
};

// const name = john.name, age = john.age, city = john.address.city, state = john.address.state, secondaryEmail = john.emails[1];
const {
    address: {
        city,
        state
    },
    emails: [
        , secondaryEmail
    ],
    age,
    name,
} = john;

console.clear();
console.log( name, age, city, state, secondaryEmail );