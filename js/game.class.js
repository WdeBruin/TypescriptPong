define(["require", "exports", "./keycode.enum", "./gameobject-id.constant", "./action.enum", "./game-objects/ball.class"], function (require, exports, keycode_enum_1, gameobject_id_constant_1, action_enum_1, ball_class_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Game {
        constructor(canvas, initialGameObjects) {
            this.canvas = canvas;
            this.dt = 0;
            this.last = this.timestamp();
            this.step = 1 / 60;
            this.ctx = canvas.getContext('2d');
            this.canvasWidth = canvas.width;
            this.canvasHeight = canvas.height;
            this.gameObjects = initialGameObjects;
            this.frame();
            this.addInputListener();
        }
        frame() {
            this.now = this.timestamp();
            this.dt = this.dt + Math.min(1, (this.now - this.last) / 1000);
            while (this.dt > this.step) {
                this.dt = this.dt - this.step;
                this.update();
                this.aiMove();
            }
            this.render();
            this.last = this.now;
            requestAnimationFrame(() => this.frame());
        }
        addGameObject(newGameObject) {
            this.gameObjects.push(newGameObject);
        }
        addInputListener() {
            // player input
            const paddle1 = this.gameObjects.filter(x => x.id === gameobject_id_constant_1.PADDLE1)[0];
            document.addEventListener('keydown', (event) => {
                switch (event.keyCode) {
                    case keycode_enum_1.KeyCode.UP:
                        paddle1.action(action_enum_1.Action.UP);
                        break;
                    case keycode_enum_1.KeyCode.DOWN:
                        paddle1.action(action_enum_1.Action.DOWN);
                        break;
                }
                event.preventDefault();
            });
            document.addEventListener('keyup', (event) => {
                paddle1.action(action_enum_1.Action.STOPMOVING);
            });
        }
        aiMove() {
            const paddle2 = this.gameObjects.filter(x => x.id === gameobject_id_constant_1.PADDLE2)[0];
            // clone ball
            let ball = this.gameObjects.filter(x => x.id === gameobject_id_constant_1.BALL)[0];
            let ballClone = new ball_class_1.Ball('BALLCLONE', 5, this.canvasWidth, this.canvasHeight, ball.x, ball.y, ball.up, ball.left);
            if (ballClone) {
                // find position of ball on x of paddle2
                while (ballClone.x <= paddle2.x) {
                    ballClone.update(1);
                }
                // aim for that pos with up or down and wait
                if (paddle2.y < ballClone.y)
                    paddle2.action(action_enum_1.Action.DOWN);
                if (paddle2.y > ballClone.y)
                    paddle2.action(action_enum_1.Action.UP);
            }
        }
        timestamp() {
            return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
        }
        update() {
            this.gameObjects.forEach((object) => {
                object.update(this.step);
            });
            // collision paddle & ball
            const paddle1 = this.gameObjects.filter(x => x.id === gameobject_id_constant_1.PADDLE1)[0];
            const paddle2 = this.gameObjects.filter(x => x.id === gameobject_id_constant_1.PADDLE2)[0];
            const ball = this.gameObjects.filter(x => x.id === gameobject_id_constant_1.BALL)[0];
            if (ball.x <= (paddle1.x + 5) && (ball.y > paddle1.y && ball.y < paddle1.y + 15)) {
                ball.action(action_enum_1.Action.BOUNCE);
            }
            if (ball.x <= (paddle1.x + 5) && (ball.y > paddle1.y + 15 && ball.y < paddle1.y + 30)) {
                ball.action(action_enum_1.Action.BOUNCEVERT);
            }
            if (ball.x >= (paddle2.x - 5) && (ball.y > paddle2.y && ball.y < paddle2.y + 15)) {
                ball.action(action_enum_1.Action.BOUNCE);
            }
            if (ball.x >= (paddle2.x - 5) && (ball.y > paddle2.y + 15 && ball.y < paddle2.y + 30)) {
                ball.action(action_enum_1.Action.BOUNCE);
            }
            const scoreboard = this.gameObjects.filter(x => x.id === gameobject_id_constant_1.SCOREBOARD)[0];
            // point on side
            if (ball.x >= this.canvasWidth - 5) {
                scoreboard.action(action_enum_1.Action.SCOREP1);
                ball.action(action_enum_1.Action.RESET);
            }
            if (ball.x <= 5) {
                scoreboard.action(action_enum_1.Action.SCOREP2);
                ball.action(action_enum_1.Action.RESET);
            }
        }
        render() {
            this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
            this.ctx.beginPath();
            this.gameObjects.forEach((object) => {
                object.draw(this.ctx);
            });
        }
    }
    exports.Game = Game;
});
//# sourceMappingURL=game.class.js.map