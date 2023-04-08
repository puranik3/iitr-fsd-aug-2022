import Cell from './Cell.js';

export const Directions = {
    UP: 'Up',
    DOWN: 'Down',
    RIGHT: 'Right',
    LEFT: 'Left'
};

class Snake {
    constructor( game ) {
        this.game = game;
        
        this.head = new Cell( 1, 1 );
        this.tail = [];
        // this.head = new Cell( 4, 1 );
        // this.tail = [ new Cell( 1, 1 ), new Cell( 2, 1 ), new Cell( 3, 1 ) ];
        this.direction = Directions.RIGHT;
        this.size = 3;
    }

    setDirection( newDirection ) {
        if( this.direction === newDirection ) {
            return;
        }

        if( this.direction === Directions.RIGHT && newDirection === Directions.LEFT ) {
            return;
        }

        if( this.direction === Directions.LEFT && newDirection === Directions.RIGHT ) {
            return;
        }

        if( this.direction === Directions.UP && newDirection === Directions.DOWN ) {
            return;
        }

        if( this.direction === Directions.DOWN && newDirection === Directions.UP ) {
            return;
        }

        this.direction = newDirection;
    }

    draw( ctx ) {
        const { cellSideLength } = this.game.configuration;

        const x = this.head.x * cellSideLength;
        const y = this.head.y * cellSideLength;

        // draw head
        ctx.fillStyle = '#111111';
        ctx.fillRect( x, y, cellSideLength, cellSideLength );

        // tail
        ctx.fillStyle = '#333333';
        this.tail.forEach(cell => {
            ctx.fillRect( cellSideLength * cell.x, cellSideLength * cell.y, cellSideLength, cellSideLength );
        });

        const size = cellSideLength / 10;
        const offset = cellSideLength / 3;

        // eyes
        switch (this.direction) {
            case Directions.UP:
                ctx.beginPath();
                ctx.arc( x + offset, y + offset, size, 0, 2 * Math.PI );
                ctx.arc( x + 2 * offset, y + offset, size, 0, 2 * Math.PI );
                ctx.fillStyle = "white";
                ctx.fill();
                break;
            case Directions.DOWN:
                ctx.beginPath();
                ctx.arc( x + offset, y + 2 * offset, size, 0, 2 * Math.PI );
                ctx.arc( x + 2 * offset, y + 2 * offset, size, 0, 2 * Math.PI );
                ctx.fillStyle = "white";
                ctx.fill();
                break;
            case Directions.RIGHT:
                ctx.beginPath();
                ctx.arc( x + 2 * offset, y + offset, size, 0, 2 * Math.PI );
                ctx.arc( x + 2 * offset, y + 2 * offset, size, 0, 2 * Math.PI );
                ctx.fillStyle = "white";
                ctx.fill();
                break;
            case Directions.LEFT:
                ctx.beginPath();
                ctx.arc( x + offset, y + offset, size, 0, 2 * Math.PI );
                ctx.arc( x + offset, y + 2 * offset, size, 0, 2 * Math.PI );
                ctx.fillStyle = "white";
                ctx.fill();
                break;
        }
    }

    getNext() {
        switch( this.direction ) {
            case Directions.UP:
                return new Cell( this.head.x, this.head.y - 1 );
            case Directions.DOWN:
                return new Cell( this.head.x, this.head.y + 1 );
            case Directions.RIGHT:
                return new Cell( this.head.x + 1, this.head.y );
            case Directions.LEFT:
                return new Cell( this.head.x - 1, this.head.y );
        }
    }

    move() {
        // 0 -> 1 -> 2 -> head 
        this.tail.push( this.head );

        this.head = this.getNext();

        if( this.tail.length > this.size ) {
            this.tail.shift(); // remove the first tail cell (the tail cell at the back)
        }
    }

    isEatenItself() {
        return this.tail.some(cell => {
            return cell.x === this.head.x && cell.y === this.head.y
        });
    }

    grow() {
        this.size += 3;
    }
}

export default Snake;