import { GameObject } from '../gameobject.interface';
import { Action } from '../action.enum';

export class Paddle implements GameObject {
    private simSpeed: number = 150;

    private bottomWall: number;
    private topWall: number;

    constructor(public id: string, canvasHeight: number, public x: number,
        public y: number, private width: number, private height: number) {
        this.bottomWall = canvasHeight - this.height;
        this.topWall = 0;
    }

    public up?: boolean;

    public update(step: number) {
        const moveSpeed = step * this.simSpeed;

        if (this.y <= this.topWall && this.up === true) 
            this.up = undefined;
            
        if (this.y >= this.bottomWall && this.up === false)
            this.up = undefined;

        if(this.up != undefined)
            this.y = this.up ? this.y -= moveSpeed : this.y += moveSpeed;
    }

    public draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'White';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    public action(action: Action) {        
        switch(action) {
            case Action.DOWN:
                this.up = false;
                break;
            case Action.UP:
                this.up = true;
                break;
            case Action.STOPMOVING:
                this.up = undefined;
                break;
        }
    }
}
