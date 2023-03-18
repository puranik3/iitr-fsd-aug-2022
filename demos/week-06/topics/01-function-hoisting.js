console.log( sum1( 12, 13 ) );

// function declaration syntax
function sum1( x, y ) {
    return x + y;
}

// function expression (creates a function just-in-time)
// the RHS is called a "function expression"
console.log( sum2( 12, 13 ) );

const sum2 = function( x, y ) {
    return x + y;
};