define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Circle = /** @class */ (function () {
        function Circle(newRadius) {
            this.radius = 20;
            this.x = 0;
            this.y = 0;
            this.radius = newRadius;
        }
        Circle.prototype.update = function () {
            this.x = this.x + 1;
        };
        Circle.prototype.draw = function (ctx, canvasWidth, canvasHeight) {
            ctx.fillStyle = 'Yellow';
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.fill();
        };
        return Circle;
    }());
    exports.Circle = Circle;
});
//# sourceMappingURL=circle.class.js.map