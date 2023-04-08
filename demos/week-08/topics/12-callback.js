// synchronous
function sum( x, y, callback ) {
    // whi executes f? - the browser
    // whoever calls the function f gets the return value - browser
    setTimeout(() => { // f
        // return x + y; // f is returning, not sum! returning is useless
        callback( x + y );
    }, 2000);

    // return undefined;
}

// const result = sum( 12, 13 );
sum( 12, 13, ( result ) => {
    console.log( result );
} )