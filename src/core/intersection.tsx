import {Container} from 'pixi.js';
import _ from 'lodash';
import Street from './street';
import Renderable from './renderable';

export default class Intersection implements Renderable {
    streets: {
        north: Street,
        south: Street,
        east: Street,
        west: Street
    }
    renderable: Container
    constructor({north, south, east, west}: any, width: number, height: number) {
        let vertical_length = height/3;
        let horizontal_length = width/3;
        this.streets = {
            north: new Street(north.lanes, north.width, vertical_length),
            south: new Street(south.lanes, south.width, vertical_length),
            east: new Street(east.lanes, east.width, horizontal_length),
            west: new Street(west.lanes, west.width, horizontal_length)
        }

        //position the parts for the intersection
        this.streets.west.renderable.position.y = height/2 - this.streets.west.width/2;

        this.streets.north.renderable.rotation = Math.PI / 2;
        this.streets.north.renderable.position.x = width/2 + this.streets.north.width/2;

        this.streets.east.renderable.position.x = width - horizontal_length;
        this.streets.east.renderable.position.y = height/2 - this.streets.east.width/2;

        this.streets.south.renderable.rotation = Math.PI / 2;
        this.streets.south.renderable.position.x = width/2 + this.streets.south.width/2;
        this.streets.south.renderable.position.y = height - vertical_length;

        this.renderable = _(this.streets).reduce((renderable: Container, street: Street) => {
            renderable.addChild(street.renderable);
            return renderable;
        }, new Container());
    }
    update() {

    }
}
