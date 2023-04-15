import { Scores, State, getVelocity, Velocity } from './utils/utils.js';

console.log( 'Game on' );

// type assertion (type casting)
const board = document.querySelector( '.board' ) as HTMLElement;
const ball = document.querySelector( '.ball' ) as HTMLElement;
const paddle_1 = document.querySelector( '.paddle_1' ) as HTMLElement;
const paddle_2 = document.querySelector( '.paddle_2' ) as HTMLElement;
const score_1 = document.querySelector( '.player_1_score' ) as HTMLElement;
const score_2 = document.querySelector( '.player_2_score' ) as HTMLElement;
const message = document.querySelector( '.message' ) as HTMLElement;

let board_coord = board.getBoundingClientRect();
let ball_coord = ball.getBoundingClientRect();

// useful when we want to get the ball to its initial position (center of the board)
const initial_ball_coord = ball_coord;
const ball_top = ball.style.top;
const ball_left = ball.style.left;

let paddle_1_coord = paddle_1.getBoundingClientRect();
let paddle_2_coord = paddle_2.getBoundingClientRect();
const paddle_height = paddle_1_coord.height;

class Game {
    private scores : Scores = {
        player1: 0,
        player2: 0
    }

    private SPEED = 0.085; // how much fraction of the window height is to be covered in one movement of the paddle (TT bat)

    private state = State.STOPPED;

    start() {
        this.bindListeners();
    }

    // this method shall be called when a rally is over
    reset() {
        this.state = State.STOPPED;

        // bring the ball to its initial position (board's center)
        ball.style.top = ball_top;
        ball.style.left = ball_left;
        ball_coord = initial_ball_coord; // bounding rect information for initial position

        message.textContent = 'Press Enter to play';
    }

    bindListeners() {
        document.addEventListener( 'keydown', ( event ) => {
            const key = event.key;

            if( this.state === State.STOPPED ) {
                if( key === 'Enter' ) {
                    this.state = State.STARTED;

                    message.textContent = 'Game on!';

                    requestAnimationFrame(() => {
                        const velocity = getVelocity();
                        console.log( velocity );
                        this.moveBall( velocity );
                    })
                }
            }

            if( this.state === State.STARTED ) {
                if( key === 'w' ) {
                    // move left paddle up
                    paddle_1.style.top = Math.max( paddle_1_coord.top - this.SPEED * window.innerHeight, board_coord.top ) + 'px';
                    paddle_1_coord = paddle_1.getBoundingClientRect();
                }
                if( key === 's' ) {
                    // move left paddle down
                    paddle_1.style.top = Math.min( paddle_1_coord.top + this.SPEED * window.innerHeight, board_coord.bottom - paddle_height ) + 'px';
                    paddle_1_coord = paddle_1.getBoundingClientRect();
                }
                if( key === 'ArrowUp' ) {
                    // move right paddle up
                    paddle_2.style.top = Math.max( paddle_2_coord.top - this.SPEED * window.innerHeight, board_coord.top ) + 'px';
                    paddle_2_coord = paddle_2.getBoundingClientRect();
                }
                if( key === 'ArrowDown' ) {
                    // move right paddle up
                    paddle_2.style.top = Math.min( paddle_2_coord.top + this.SPEED * window.innerHeight, board_coord.bottom - paddle_height ) + 'px';
                    paddle_2_coord = paddle_2.getBoundingClientRect();
                }
            }
        })
    }

    isGameOver() {
        if( this.scores.player1 === 21 ) {
            alert( 'Player 1 wins the match' );
        }
        
        if( this.scores.player2 === 21 ) {
            alert( 'Player 2 wins the match' );
        }
    }

    moveBall( velocity : Velocity ) {
        // if ball hits the top / bottom then change the direction (sign of the y velocity coordinate)
        if(
            ball_coord.top <= board_coord.top
            ||
            ball_coord.bottom >= board_coord.bottom
        ) {
            velocity.y = -velocity.y;
        }

        // if it hits the paddles, it has to bounce off
        // if ball hits paddle 1
        if(
            ball_coord.left <= paddle_1_coord.right &&
            ball_coord.top >= paddle_1_coord.top &&
            ball_coord.bottom <= paddle_1_coord.bottom
        ) {
            velocity.x = -velocity.x;
        }
        
        // if ball hits paddle 2
        if(
            ball_coord.right >= paddle_2_coord.left &&
            ball_coord.top >= paddle_2_coord.top &&
            ball_coord.bottom <= paddle_2_coord.bottom
        ) {
            velocity.x = -velocity.x;
        }

        // player 1 wins
        if( ball_coord.right >= board_coord.right ) {
            this.scores.player1++;
            score_1.textContent = '' + this.scores.player1;
            this.reset();
            this.isGameOver();
            return;
        }
        
        // player 2 wins
        if( ball_coord.left <= board_coord.left ) {
            this.scores.player2++;
            score_2.textContent = '' + this.scores.player2;
            this.reset();
            this.isGameOver();
            return;
        }

        ball.style.top = ball_coord.top + velocity.y + 'px';
        ball.style.left = ball_coord.left + velocity.x + 'px';

        ball_coord = ball.getBoundingClientRect();

        requestAnimationFrame(() => {
            this.moveBall( velocity );
        });
    }
}

const game = new Game();
game.start();