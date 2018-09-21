define(["require", "exports", "../action.enum"], function (require, exports, action_enum_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Ball {
        constructor(id, newRadius, canvasWidth, canvasHeight, startx, starty, up, left) {
            this.id = id;
            this.up = up;
            this.left = left;
            this.radius = 20;
            this.x = 0;
            this.y = 0;
            this.simSpeed = 150;
            this.radius = newRadius;
            this.x = startx;
            this.y = starty;
            this.up = up;
            this.left = left;
            this.topWall = this.radius;
            this.leftWall = this.radius;
            this.rightWall = canvasWidth - this.radius;
            this.bottomWall = canvasHeight - this.radius;
        }
        update(step) {
            const moveSpeed = step * this.simSpeed;
            if (this.x >= this.rightWall) {
                this.left = true;
            }
            else if (this.x <= this.leftWall) {
                this.left = false;
            }
            if (this.y >= this.bottomWall) {
                this.up = true;
            }
            else if (this.y <= this.topWall) {
                this.up = false;
            }
            this.x = this.left ? this.x -= moveSpeed : this.x += moveSpeed;
            if (this.up != undefined)
                this.y = this.up ? this.y -= moveSpeed : this.y += moveSpeed;
        }
        draw(ctx) {
            ctx.fillStyle = 'White';
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.fill();
        }
        action(action) {
            if (action === action_enum_1.Action.BOUNCE) {
                this.up = this.y > 30;
                this.left = !this.left;
            }
            if (action === action_enum_1.Action.BOUNCEVERT) {
                this.left = !this.left;
                this.up = !(this.y < this.bottomWall - 30);
            }
            if (action === action_enum_1.Action.RESET) {
                this.x = this.rightWall / 2;
                this.y = this.bottomWall / 2;
                this.up = undefined;
                this.left = true;
            }
        }
    }
    exports.Ball = Ball;
});
//# sourceMappingURL=ball.class.js.map