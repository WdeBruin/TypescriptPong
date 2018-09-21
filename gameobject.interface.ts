import { Action } from "./action.enum";

export interface GameObject {
    id: string;
    update(step: number);
    draw(ctx: CanvasRenderingContext2D);
    action(action: Action);
    x: number;
    y: number;
    up?: boolean;
    left?: boolean;
}
