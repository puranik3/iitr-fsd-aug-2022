type NS = number | string;

let chequeAmount : NS = 10000;
chequeAmount = 'Twenty thousand';
// chequeAmount = false; // error

// let chequeAmounts : (number | string)[] = [];
let chequeAmounts : NS[] = [];
chequeAmounts = [ 20000, 'Thirty thousand', 40000 ];

export {}