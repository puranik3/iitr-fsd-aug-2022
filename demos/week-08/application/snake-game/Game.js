import {
    WIDTH,
    HEIGHT,
    CELLSIZE,
    SPEED,
    MAX_LEVEL,
    COLORS
} from './constants.js';
import Snake, { Directions } from './Snake.js';
import Grid from './Grid.js';

class Game {
    constructor() {
        this.running = false;

        const width = WIDTH * CELLSIZE; // 1000
        const height = HEIGHT * CELLSIZE; // 400

        this.canvas = document.createElement( 'canvas' );
        document.body.appendChild( this.canvas );
        
        this.canvas.width = width;
        this.canvas.height = height;

        // main game configuration
        this.configuration = {
            level: 0,
            speed: SPEED,
            width, // width: width
            height,
            nbCellsX: WIDTH,
            nbCellsY: HEIGHT,
            cellSideLength: CELLSIZE,
            color: COLORS[0]
        };

        // this is the game object
        this.snake = new Snake( this );
        this.grid = new Grid( this );

        this.nextMove = 0;
        this.score = 0;

        document.body.addEventListener( 'keydown', this.onKeyDown );
    }

    start() {
        this.running = true;
        requestAnimationFrame( this.loop );
    }

    // very useful in React (this will always be the class object)
    loop = ( time ) => {
        // first check if game is running..
        if( this.running ) {
            requestAnimationFrame( this.loop );

            if( time > this.nextMove ) {
                // next move is only 200 ms after current move
                this.nextMove = time + this.configuration.speed;

                // move the snake to new position (head and tail positions are updated but not yet drawn)
                this.snake.move();

                // is game over (unsuccessfully) - went out of board, snake has eaten itself
                // not over - snake ate apple
                // is game over (successfully) - all levels completed
                const state = this.checkState();

                switch( state ) {
                    case -1:
                        this.gameOver();
                        return;
                    case 1:
                        // snake ate an apple
                        this.score += 100;
                        this.snake.grow();
                        this.grid.eat( this.snake.head );
                        if( this.isLevelCompleted() ) {
                            this.nextLevel();
                        }
                    default:
                        this.draw();
                }
            }
        }
    }

    isLevelCompleted() {
        return this.grid.noMoreApples();
    }

    nextLevel() {
        this.score += 1000;
        this.configuration.level++;

        if( this.configuration.level >= MAX_LEVEL ) {
            alert( `You are our new super hero! You scored ${this.score}` );
            return;
        }

        this.configuration.speed = SPEED - 7;
        this.configuration.color = COLORS[this.configuration.level];
        this.grid.addApples();
    }

    // -1 -> game over
    // 1 -> ate apple
    // 0 -> nothing special
    checkState() {
        const head = this.snake.head;

        // is head out of the board?
        if( this.grid.isOutside( head ) ) {
            return -1;
        }

        if( this.snake.isEatenItself() ) {
            return -1;
        }

        if( this.grid.isApple( head ) ) {
            return 1;
        }

        return 0;
    }

    draw() {
        const {
            color,
            width,
            height
        } = this.configuration;
        const ctx = this.canvas.getContext( '2d' );

        ctx.fillStyle = color;
        ctx.fillRect( 0, 0, width, height );

        this.grid.draw( ctx );
        this.snake.draw( ctx );
    }

    gameOver() {
        alert( `You scored ${this.score}. Better luck next time.` );
        this.running = false;
    }

    onKeyDown = ( event ) => {
        event.preventDefault();

        switch( event.key ) {
            case "ArrowUp":
                this.snake.setDirection( Directions.UP );
                return;
            case "ArrowDown":
                this.snake.setDirection( Directions.DOWN );
                return;
            case "ArrowRight":
                this.snake.setDirection( Directions.RIGHT );
                return;
            case "ArrowLeft":
                this.snake.setDirection( Directions.LEFT );
                return;
        }
    }
}

// export {
//     Game as default
// };

export default Game;