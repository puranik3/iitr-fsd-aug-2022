import Cell from './Cell.js';

class Grid {
    constructor( game ) {
        this.game = game;
        this.apples = [];
        this.addApples();
    }

    addApples() {
        const { level, nbCellsX, nbCellsY } = this.game.configuration;

        for( let i = 0; i < ( level + 1 ) * 5; i++ ) {
            const x = Math.floor( Math.random() * nbCellsX );
            const y = Math.floor( Math.random() * nbCellsY );

            this.apples.push( new Cell( x, y ) );
        }
    }

    draw( ctx ) {
        const {
            width, // 1000
            height, // 400
            cellSideLength // 20
        } = this.game.configuration;

        // draw the vertical lines
        for( let x = 0; x <= width; x += cellSideLength ) {
            ctx.beginPath();
            ctx.moveTo( x, 0 );
            ctx.lineTo( x, height );
            ctx.stroke();
        }
        
        // draw the horizontal lines
        for( let y = 0; y <= height; y += cellSideLength ) {
            ctx.beginPath();
            ctx.moveTo( 0, y );
            ctx.lineTo( width, y );
            ctx.stroke();
        }

        // apples
        ctx.fillStyle = 'red';
        this.apples.forEach(cell => {
            console.log( this.game ); // try changing to old function syntax and check
        
            ctx.fillRect( cellSideLength * cell.x, cellSideLength * cell.y, cellSideLength, cellSideLength );
        });
    }

    isOutside( cell ) {
        const { nbCellsX, nbCellsY } = this.game.configuration;
        return cell.x < 0 || cell.x >= nbCellsX || cell.y < 0 || cell.y >= nbCellsY;
    }

    isApple( cell ) {
        return this.apples.some(a => {
            return a.x === cell.x && a.y === cell.y
        });
    }

    eat( cell ) {
        this.apples = this.apples.filter( a => a.x !== cell.x || a.y !== cell.y );
    }

    noMoreApples() {
        return this.apples.length === 0;
    }
}

export default Grid;