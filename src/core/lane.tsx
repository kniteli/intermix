import {Texture, Sprite} from 'pixi.js';
import Renderable from './renderable';

export default class Lane implements Renderable {
    width: number = 0
    length: number = 0
    renderable: Sprite
    constructor(width: number, length: number, texture: Texture) {
        this.width = width;
        this.length = length;
        this.renderable = new Sprite(texture);
        this.renderable.width = this.length;
        this.renderable.height = this.width;
        this.renderable.on('click', (context: any) => {});
    }
    update() {

    }
}