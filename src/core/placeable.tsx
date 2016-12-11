import {Texture} from 'pixi.js';

export default class Placeable {
    name: string
    image: any
    texture: Texture
    constructor(name: string, texture: Texture, image: any) {
        this.name = name;
        this.image = image;
        this.texture = texture;
    }
}
