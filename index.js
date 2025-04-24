import { Drawer } from "./src/index.js";

document.addEventListener('DOMContentLoaded', () => {   
    const drawer = new Drawer({
        canvasElement: 'drawer',
    })
    drawer.draw();
})