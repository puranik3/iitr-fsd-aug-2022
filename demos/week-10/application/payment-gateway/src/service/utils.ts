const getRangeArray = ( min : number, max : number ) => {
    const rangeArray = [];

    for( let i = min; i <= max; i++ ) {
        rangeArray.push( i );
    }

    return rangeArray;
};

export {
    getRangeArray
};