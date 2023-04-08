// ... -> rest / spread. We will see use as the rest operator here.
const days = [
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri'
];
const [ first, second, ...restOfDays ] = days;
console.log( restOfDays );

const john = {
    name: 'John',
    age: 32,
    address: {
        city: 'Bengaluru',
        state: 'Karnataka',
        pinCode: 560100
    },
    emails: [
        'john@gmail.com',
        'john@example.com'
    ]
};

const {
    name,
    address: {
        city,
        ...restOfAddress
    },
    ...restOfJohn
} = john;

console.clear();
console.log( restOfJohn );
console.log( restOfAddress );