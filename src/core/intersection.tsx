import {Container, Point, Sprite, Texture} from 'pixi.js';
import _ from 'lodash';
import {Store} from 'redux';
import Street from './street';
import Renderable from './renderable';
import connect from './connect';

type Vec = [number, number];

interface IntersectionSchema {
    streets: {
        north: {
            position: Vec
        },
        south: {
            position: Vec
        },
        east:  {
            position: Vec
        },
        west:  {
            position: Vec
        },
    }
    intersection: {
        width: number
        height: number
        texture: Texture,
        position: Vec
    }
    stage: {
        width: number,
        height: number
    }
}

type Positioner = (position: Vec) => void

interface Positioners {
    north: Positioner
    south: Positioner
    east: Positioner
    west: Positioner
    intersection: Positioner
    [propName: string]: Positioner
}

export default class Intersection extends Renderable<IntersectionSchema> {
    // constructor({north, south, east, west}: any, width: number, height: number) {
    //     let vertical_length = height/3;
    //     let horizontal_length = width/3;
    //     this.streets = {
    //         north: new Street(north.lanes, north.width, vertical_length),
    //         south: new Street(south.lanes, south.width, vertical_length),
    //         east: new Street(east.lanes, east.width, horizontal_length),
    //         west: new Street(west.lanes, west.width, horizontal_length)
    //     }

    //     //position the parts for the intersection
    //     // this.streets.west.renderable.position.y = height/2 - this.streets.west.width/2;

    //     this.streets.north.renderable.rotation = Math.PI / 2;
    //     // this.streets.north.renderable.position.x = width/2 + this.streets.north.width/2;

    //     // this.streets.east.renderable.position.x = width - horizontal_length;
    //     // this.streets.east.renderable.position.y = height/2 - this.streets.east.width/2;

    //     this.streets.south.renderable.rotation = Math.PI / 2;
    //     // this.streets.south.renderable.position.x = width/2 + this.streets.south.width/2;
    //     // this.streets.south.renderable.position.y = height - vertical_length;

    //     this.renderable = _(this.streets).reduce((renderable: Container, street: Street) => {
    //         renderable.addChild(street.renderable);
    //         return renderable;
    //     }, new Container());
    // }

    positioners: Positioners
    intersection: Sprite
    constructor(store: Store<any>) {
        super(store);
        this.renderable = new Container();
        this.state = this.mapStateToSchema(store.getState());
        store.subscribe(connect(this.mapStateToSchema)(this));
        let [north, south, east, west] = _(this.state.streets).map((street: Street, cardinal: string) => {
            let mapped = new Street(store, cardinal);
            store.subscribe(connect(mapped.mapStateToSchema)(mapped));
            return mapped;
        }).value();
        this.intersection = new Sprite();
        this.intersection.width = this.state.intersection.width;
        this.intersection.height = this.state.intersection.height;
        this.renderable.addChild(this.intersection);
        this.children = [north, south, east, west];
        _(this.children).forEach(child => this.renderable.addChild(child.renderable));
        let positioner = (street: Street) => (position: Vec) => street.renderable.position.set(position[0], position[1])
        let intersection_positioner = (intersection: Sprite) => (position: Vec) => intersection.position.set(position[0], position[1])

        this.positioners = {
            north: positioner(north),
            south: positioner(south),
            east: positioner(east),
            west: positioner(west),
            intersection: intersection_positioner(this.intersection)
        }
    }
    mapStateToSchema(state: any) {
        let {intersection, streets} = state;
        let add = (a: Vec, b: Vec): Vec => [a[0] + b[0], a[1] + b[1]];
        return {
            streets: {
                north: {
                    ...streets.north,
                    position: add(intersection.positions.north, [streets.north.width/2, 0])
                },
                south: {
                    ...streets.south,
                    position: add(intersection.positions.south, [streets.south.width/2, -streets.south.length])
                },
                east: {
                    ...streets.east,
                    position: add(intersection.positions.east, [-streets.east.length, -streets.east.width/2])
                },
                west: {
                    ...streets.west,
                    position: add(intersection.positions.west, [0, -streets.west.width/2])
                },
            },
            intersection: {
                texture: state.resources.textures[1],
                width: streets.north.width,
                height: streets.west.width,
                position: add(intersection.positions.intersection, [-streets.north.width/2, -streets.west.width/2])
            },
            stage: {
                width: state.stage.width,
                height: state.stage.height
            }
        };
    }
    update() {
        if(this.state.intersection.texture && this.state.intersection.texture !== this.intersection.texture) {
            this.intersection.texture = this.state.intersection.texture;
        }
        this.renderable.width = this.state.stage.width;
        this.renderable.height = this.state.stage.height;
        this.intersection.width = this.state.intersection.width;
        this.intersection.height = this.state.intersection.height;
    }
    animate(t: number) {
        _(this.state.streets).forEach((street: any, key: string) => this.positioners[key](street.position));
        this.positioners.intersection(this.state.intersection.position);
    }
}

const positioning = (canvas_width: number, canvas_height: number) => (ver_pos: string, hor_pos: string) => {
    //turn switch into let-match
    let x = (() => {
        switch(hor_pos) {
            case 'left':
                return 0;
            case 'center':
                return canvas_width/2;
            case 'right':
                return canvas_width;
        }
    })();
    let y = (() => {
        switch(ver_pos) {
            case 'top':
                return 0;
            case 'center':
                return canvas_height/2;
            case 'bottom':
                return canvas_height;
        }
    })();

    return [x, y];
}


//curry out all the stateful stuff on state changes and just return a pure interpolation function
const interpolate = ([i_x, i_y]: [number, number], [d_x, d_y]: [number, number], start_time: number, length: number) => (t: number) => {
    let scale = (t - start_time)/(length*1000);
    if(scale >= 1) {
        return [d_x, d_y];
    }
    return [lerp(i_x, d_x, scale), lerp(i_y, d_y, scale)];
}


const lerp = (i: number, x: number, t: number) => i + ((x - i) * t)
