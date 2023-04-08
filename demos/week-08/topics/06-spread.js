// "spread" operator - ... (overloaded with "rest")

// copy / merge objects and arrays
const nums1 = [ 1, 2, 3 ], nums2 = [ 4, 5, 6 ];
// const nums3 = nums1; // 2 variables that refer to the SAME array
// nums3[0]++;
// console.log( nums1 );
const nums3 = [ ...nums1 ]; // [ nums1[0], nums1[1], nums1[2] ]
nums3[0]++;
console.log( nums1 );

const john = {
    name: 'John',
    age: 32
};

const johnEmployment = {
    name: 'Jonathan',
    companyName: 'Example Consulting',
    role: 'Fullstack Developer'
};

const johnMasterDetails = {
    ...john, // name: john.name, age: john.age
    ...johnEmployment
};

console.log( johnMasterDetails );