// run this demo in the browser
function outer() {
    console.log( 'outer this = ', this );

    const innerOld = function() {
        console.log( 'innerOld this = ', this );
    };

    innerOld();
    
    // arrow functions do not have their own context
    // they take on the context (this) from the enclosing scope
    const innerNew = () => {
        console.log( 'innerNew this = ', this );
    };

    innerNew();
}

outer();