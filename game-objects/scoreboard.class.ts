import { GameObject } from "../gameobject.interface";
import { Action } from "../action.enum";

export class ScoreBoard implements GameObject {
    public scoreP1 = 0;
    public scoreP2 = 0;

    constructor(public id: string, public x: number,
        public y: number) {        
    }
    
    update(step: number) {
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.font = '16px Courier New';
        ctx.strokeStyle = 'White';
        ctx.strokeText(`${this.scoreP1} - ${this.scoreP2}`, this.x, this.y);
    }

    action(action: Action) {
        if(action === Action.SCOREP1)
            this.scoreP1++;

        if(action === Action.SCOREP2)
            this.scoreP2++;
    }
}