import { expect, test } from "vitest";
import { Drawer, Line, Point } from "../src";

test('Init and get canvas element', () => {
    const canvas = document.createElement('canvas');
    canvas.id = 'drawer';
    document.body.appendChild(canvas);
    const drawer = new Drawer({
        canvasElement: 'drawer',
    })
    
    expect(drawer.config.canvasElement.id).toBe('drawer');

    drawer.draw();
})