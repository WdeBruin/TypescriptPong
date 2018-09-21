define(["require", "exports", "./game.class", "./game-objects/ball.class", "./game-objects/paddle.class", "./gameobject-id.constant", "./game-objects/scoreboard.class"], function (require, exports, game_class_1, ball_class_1, paddle_class_1, gameobject_id_constant_1, scoreboard_class_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function main() {
        const canvas = document.getElementById('gameCanvas');
        // game objects
        const ball = new ball_class_1.Ball(gameobject_id_constant_1.BALL, 5, canvas.width, canvas.height, 5, canvas.height / 2);
        const paddle1 = new paddle_class_1.Paddle(gameobject_id_constant_1.PADDLE1, canvas.height, 15, canvas.height / 2, 5, 30);
        const paddle2 = new paddle_class_1.Paddle(gameobject_id_constant_1.PADDLE2, canvas.height, canvas.width - 15, canvas.height / 2, 5, 30);
        const score = new scoreboard_class_1.ScoreBoard(gameobject_id_constant_1.SCOREBOARD, canvas.width / 2 - 20, 20);
        new game_class_1.Game(canvas, [
            ball,
            paddle1,
            paddle2,
            score
        ]);
    }
    main();
});
//# sourceMappingURL=app.js.map