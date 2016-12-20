import {Container} from 'pixi.js';
import Lane from './lane';
import Renderable from './renderable';

export default class Street implements Renderable {
    lanes: Lane[]
    width: number
    renderable: Container
    constructor(lanes: any[], width: number, length: number) {
        var total_width = 0;
        this.lanes = lanes.map(lane => {
            let mapped = new Lane(lane.width, length, lane.texture);
            mapped.renderable.position.y = total_width;
            total_width += mapped.width;
            return mapped;
        });
        this.width = width;
        this.renderable = this.lanes.reduce((container: Container, lane: Lane) => {
            container.addChild(lane.renderable);
            return container;
        }, new Container());
    }
    update() {

    }
}
