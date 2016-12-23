import {Container, Sprite} from 'pixi.js';
import {Store} from 'redux';
import _ from 'lodash';
// interface Renderable {
//     renderable: Container| Sprite
//     animate: (t: number) => void
// }

class Renderable<StateSchema> {
    renderable: Container | Sprite
    children: Renderable<any>[] = []
    state: StateSchema
    store: Store<any>

    constructor(store: Store<any>) {
        this.store = store;
    }

    animate(t: number) {
        this.children.forEach(renderable => renderable.animate(t));
    }
}

export default Renderable;