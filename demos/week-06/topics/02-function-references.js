// function are "first-class citizens"
// functions have ALL rights that objects have

// you can assign function references (Assign a function to another variable)
// the function name refers to the function in memory
function sum( x, y ) {
    return x + y;
};

// add and sum, both, refer to the SAME function in memory
// var add = sum(); // NOT THE SAME AS BELOW LINE
var add = sum;

console.log( add( 12, 13 ) );