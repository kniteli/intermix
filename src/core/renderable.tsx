import {Container, Sprite} from 'pixi.js';

interface Renderable {
    renderable: Container| Sprite
    update: () => void
}

export default Renderable;