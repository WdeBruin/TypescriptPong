import { GameObject } from './gameobject.interface';
import { KeyCode } from './keycode.enum';
import { BALL, PADDLE1, SCOREBOARD, PADDLE2 } from './gameobject-id.constant';
import { Action } from './action.enum';
import { Ball } from './game-objects/ball.class';

export class Game {
    private readonly ctx: CanvasRenderingContext2D;
    private readonly canvasWidth: number;
    private readonly canvasHeight: number;
    private gameObjects: GameObject[];

    // gameloop props
    private now: number;
    private dt: number = 0;
    private last: number = this.timestamp();
    private step: number = 1 / 60;

    constructor(private canvas: HTMLCanvasElement, initialGameObjects?: GameObject[]) {
        this.ctx = canvas.getContext('2d');
        this.canvasWidth = canvas.width;
        this.canvasHeight = canvas.height;

        this.gameObjects = initialGameObjects;
        this.frame();

        this.addInputListener();
    }

    public frame() {
        this.now = this.timestamp();
        this.dt = this.dt + Math.min(1, (this.now - this.last) / 1000)

        while (this.dt > this.step) {
            this.dt = this.dt - this.step;
            this.update();
            this.aiMove();
        }
        this.render();
        this.last = this.now;
        requestAnimationFrame(() => this.frame());
    }

    public addGameObject(newGameObject: GameObject) {
        this.gameObjects.push(newGameObject);
    }

    private addInputListener() {
        // player input
        const paddle1 = this.gameObjects.filter(x => x.id === PADDLE1)[0];
        document.addEventListener('keydown', (event) => {
            switch (event.keyCode) {
                case KeyCode.UP:
                    paddle1.action(Action.UP);
                    break;
                case KeyCode.DOWN:
                    paddle1.action(Action.DOWN);
                    break;
            }

            event.preventDefault();
        });

        document.addEventListener('keyup', (event) => {
            paddle1.action(Action.STOPMOVING)
        });
    }

    private aiMove() {
        const paddle2 = this.gameObjects.filter(x => x.id === PADDLE2)[0];

        // clone ball
        let ball = this.gameObjects.filter(x => x.id === BALL)[0];
        let ballClone = new Ball('BALLCLONE', 5, this.canvasWidth, this.canvasHeight, ball.x, ball.y, ball.up, ball.left);

        if (ballClone) {
            // find position of ball on x of paddle2
            while (ballClone.x <= paddle2.x) {
                ballClone.update(1);
            }

            // aim for that pos with up or down and wait
            if (paddle2.y < ballClone.y)
                paddle2.action(Action.DOWN);

            if (paddle2.y > ballClone.y)
                paddle2.action(Action.UP);
        }
    }

    private timestamp() {
        return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
    }

    private update() {
        this.gameObjects.forEach((object) => {
            object.update(this.step);
        });

        // collision paddle & ball
        const paddle1 = this.gameObjects.filter(x => x.id === PADDLE1)[0];
        const paddle2 = this.gameObjects.filter(x => x.id === PADDLE2)[0];
        const ball = this.gameObjects.filter(x => x.id === BALL)[0];

        if (ball.x <= (paddle1.x + 5) && (ball.y > paddle1.y && ball.y < paddle1.y + 15)) {
            ball.action(Action.BOUNCE);
        }

        if (ball.x <= (paddle1.x + 5) && (ball.y > paddle1.y + 15 && ball.y < paddle1.y + 30)) {
            ball.action(Action.BOUNCEVERT);
        }

        if (ball.x >= (paddle2.x - 5) && (ball.y > paddle2.y && ball.y < paddle2.y + 15)) {
            ball.action(Action.BOUNCE);
        }

        if (ball.x >= (paddle2.x - 5) && (ball.y > paddle2.y + 15 && ball.y < paddle2.y + 30)) {
            ball.action(Action.BOUNCE);
        }

        const scoreboard = this.gameObjects.filter(x => x.id === SCOREBOARD)[0];
        // point on side
        if (ball.x >= this.canvasWidth - 5) {
            scoreboard.action(Action.SCOREP1);
            ball.action(Action.RESET);
        }
        if (ball.x <= 5) {
            scoreboard.action(Action.SCOREP2);
            ball.action(Action.RESET);
        }
    }

    private render() {
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.ctx.beginPath();

        this.gameObjects.forEach((object) => {
            object.draw(this.ctx);
        });
    }
}
