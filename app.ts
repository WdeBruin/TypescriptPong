import { Game } from './game.class';
import { Ball } from './game-objects/ball.class';
import { Paddle } from './game-objects/paddle.class';
import { BALL, PADDLE1, SCOREBOARD, PADDLE2 } from './gameobject-id.constant';
import { ScoreBoard } from './game-objects/scoreboard.class';

function main() {
    const canvas = <HTMLCanvasElement>document.getElementById('gameCanvas');
    
    // game objects
    const ball = new Ball(BALL, 5, canvas.width, canvas.height, 5, canvas.height / 2);
    const paddle1 = new Paddle(PADDLE1, canvas.height, 15, canvas.height / 2, 5, 30);
    const paddle2 = new Paddle(PADDLE2, canvas.height, canvas.width - 15, canvas.height / 2, 5, 30);
    const score = new ScoreBoard(SCOREBOARD, canvas.width / 2 - 20, 20);    

    new Game(canvas, [
        ball,
        paddle1,
        paddle2,
        score
    ]);  
}

main();
