import {Texture, Sprite, Container} from 'pixi.js';
import {Store} from 'redux';
import Renderable from './renderable';
import connect from './connect';

interface LaneSchema {
    texture: Texture,
    width: number,
    length: number
}

export default class Lane extends Renderable<LaneSchema> {
    renderable: Sprite
    cardinal: string
    id: number
    constructor(store: Store<any>, cardinal: string, id: number) {
        super(store);
        this.store = store;
        this.id = id;
        this.cardinal = cardinal;
        this.state = this.mapStateToSchema(store.getState());
        this.renderable = new Sprite();
        this.renderable.on('click', (context: any) => {});
    }
    mapStateToSchema(state: any) {
        let {lanes, resources, streets} = state;
        let owned_lane = lanes.by_id[this.id];
        return {
            ...lanes.by_id[this.id],
            length: streets[this.cardinal].length,
            texture: resources.textures[owned_lane.texture]
        }
    }
    update() {
        if(this.state.texture && this.state.texture !== this.renderable.texture) {
            this.renderable.texture = this.state.texture;
        }
        this.renderable.height = this.state.width;
        this.renderable.width = this.state.length;
    }
    animate(t: number) {

    }
}