// syntax 1 for typing function
// return type is inferred
const add = ( x : number , y : number ) /*: number*/ => x + y;

// syntax 2 for typing function
type BinaryFn = ( x : number, y : number ) => number;
const product : BinaryFn  = ( x, y ) => x * y;
// const diff : ( x : number, y : number ) => number = ( x, y ) => x - y;
const diff : BinaryFn = ( x, y ) => x - y;

// product( 12, 'hello' ); // error
product( 12, 13 );

export {}