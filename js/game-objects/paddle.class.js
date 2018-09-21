define(["require", "exports", "../action.enum"], function (require, exports, action_enum_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Paddle {
        constructor(id, canvasHeight, x, y, width, height) {
            this.id = id;
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.simSpeed = 150;
            this.bottomWall = canvasHeight - this.height;
            this.topWall = 0;
        }
        update(step) {
            const moveSpeed = step * this.simSpeed;
            if (this.y <= this.topWall && this.up === true)
                this.up = undefined;
            if (this.y >= this.bottomWall && this.up === false)
                this.up = undefined;
            if (this.up != undefined)
                this.y = this.up ? this.y -= moveSpeed : this.y += moveSpeed;
        }
        draw(ctx) {
            ctx.fillStyle = 'White';
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
        action(action) {
            switch (action) {
                case action_enum_1.Action.DOWN:
                    this.up = false;
                    break;
                case action_enum_1.Action.UP:
                    this.up = true;
                    break;
                case action_enum_1.Action.STOPMOVING:
                    this.up = undefined;
                    break;
            }
        }
    }
    exports.Paddle = Paddle;
});
//# sourceMappingURL=paddle.class.js.map