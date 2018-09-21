define(["require", "exports", "../action.enum"], function (require, exports, action_enum_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ScoreBoard {
        constructor(id, x, y) {
            this.id = id;
            this.x = x;
            this.y = y;
            this.scoreP1 = 0;
            this.scoreP2 = 0;
        }
        update(step) {
        }
        draw(ctx) {
            ctx.font = '16px Courier New';
            ctx.strokeStyle = 'White';
            ctx.strokeText(`${this.scoreP1} - ${this.scoreP2}`, this.x, this.y);
        }
        action(action) {
            if (action === action_enum_1.Action.SCOREP1)
                this.scoreP1++;
            if (action === action_enum_1.Action.SCOREP2)
                this.scoreP2++;
        }
    }
    exports.ScoreBoard = ScoreBoard;
});
//# sourceMappingURL=scoreboard.class.js.map