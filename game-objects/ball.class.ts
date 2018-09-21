import { GameObject } from '../gameobject.interface';
import { Action } from '../action.enum';

export class Ball implements GameObject {
    private radius: number = 20;
    public x: number = 0;
    public y: number = 0;
    private simSpeed: number = 150;
    
    private topWall: number;
    private bottomWall: number;
    private leftWall: number;
    private rightWall: number;
    
    constructor(public id: string, newRadius: number, canvasWidth: number, canvasHeight: number, startx?: number, starty?: number,
        public up?: boolean, public left?: boolean) {

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

    public update(step: number) {
        const moveSpeed = step * this.simSpeed;

        if(this.x >= this.rightWall)
        {
            this.left = true;
        } else if (this.x <= this.leftWall) {
            this.left = false;
        }
        if(this.y >= this.bottomWall) {
            this.up = true;
        } else if (this.y <= this.topWall) {
            this.up = false;
        }
        
        this.x = this.left ? this.x -= moveSpeed : this.x += moveSpeed;
        if(this.up != undefined)
            this.y = this.up ? this.y -= moveSpeed : this.y += moveSpeed;
    }    
    
    public draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'White';
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        ctx.fill();
    }

    public action(action: Action) { 
        if (action === Action.BOUNCE) {
            
            this.up = this.y > 30;
            this.left = !this.left;       
        }
        
        if (action === Action.BOUNCEVERT) {
            this.left = !this.left;
            this.up = !(this.y < this.bottomWall - 30);
        }

        if (action === Action.RESET) {
            this.x = this.rightWall / 2;
            this.y = this.bottomWall / 2;
            this.up = undefined;
            this.left = true;
        }
    }
}
