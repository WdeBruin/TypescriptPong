define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Action;
    (function (Action) {
        Action[Action["UP"] = 0] = "UP";
        Action[Action["DOWN"] = 1] = "DOWN";
        Action[Action["BOUNCE"] = 2] = "BOUNCE";
        Action[Action["BOUNCEVERT"] = 3] = "BOUNCEVERT";
        Action[Action["STOPMOVING"] = 4] = "STOPMOVING";
        Action[Action["SCOREP1"] = 5] = "SCOREP1";
        Action[Action["SCOREP2"] = 6] = "SCOREP2";
        Action[Action["RESET"] = 7] = "RESET";
    })(Action = exports.Action || (exports.Action = {}));
});
//# sourceMappingURL=action.enum.js.map