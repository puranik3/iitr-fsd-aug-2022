export interface Scores {
    player1: number,
    player2: number,
}

export enum State {
    STARTED,
    STOPPED
}

export interface Velocity {
    x: number, // +/- 3 - 8
    y: number // +/- 3 - 8
};

export const getVelocity = () => {
    let xMultiplier = 1;
    let yMultiplier = 1;

    if( Math.random() < 0.5 ) {
        xMultiplier = -1;
    }

    if( Math.random() < 0.5 ) {
        yMultiplier = -1;
    }

    return {
        x: xMultiplier * ( 3 + Math.floor( Math.random() * ( 8 - 3 + 1 ) ) ),
        y: yMultiplier * ( 3 + Math.floor( Math.random() * ( 8 - 3 + 1 ) ) )
    };
}