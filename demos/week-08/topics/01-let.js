for( var i = 0; i < 10; i++ ) { // i is global / function
    console.log( i );
}

console.log( i ); // yes, it's fine

console.clear();

for( let j = 0; j < 10; j++ ) { // j has block scope
    console.log( j );
}

console.log( j ); // error