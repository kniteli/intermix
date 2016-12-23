import {Texture, Sprite, Container, Graphics, Text} from 'pixi.js';
import {Store} from 'redux';
import Renderable from './renderable';
import connect from './connect';
import {laneAdded, laneResizeStarted, laneResizeEnded, laneResizeMove} from 'actions';

interface LaneSchema {
    texture: Texture,
    width: number,
    length: number,
    droppable: number,
    resize_target: number,
    resize_start_pos: number,
    resize_start_width: number
}

const create_handle = (pos: any) => {
    let handle = new Graphics();
    handle.beginFill(0xFFFFFF00);
    handle.lineStyle(5, 0xFF0000);
    handle.drawRect(0, 0, 25, 25);
    handle.width = 25;
    handle.height = 25;
    handle.position.set(pos[0], pos[1]);
    handle.interactive = true;
    return handle;
}

export default class Lane extends Renderable<LaneSchema> {
    sprite: Sprite
    cardinal: string
    id: number
    handles_container: Container
    handles: {
        top: Graphics,
        bottom: Graphics
    }
    width_text: Text
    constructor(store: Store<any>, cardinal: string, id: number) {
        super(store);
        this.store = store;
        this.id = id;
        this.cardinal = cardinal;
        this.renderable = new Container();
        this.renderable.interactive = true;
        this.state = this.mapStateToSchema(store.getState());
        this.handles_container = new Container();
        this.handles = {
            top: create_handle([0, 0]),
            bottom: create_handle([0, this.state.width - 25])
        };
        this.width_text = new Text(this.state.width.toString());
        this.width_text.position.set(0, this.state.width/2 - this.width_text.height/2);
        this.handles_container.addChild(this.width_text);
        this.handles_container.addChild(this.handles.top, this.handles.bottom);
        this.handles_container.visible = false;
        this.sprite = new Sprite();
        this.renderable.addChild(this.sprite);
        this.renderable.addChild(this.handles_container);
        this.sprite.interactive = true;
        this.sprite.on('mouseup', (context: any) => {
            if(this.state.droppable) {
                store.dispatch(laneAdded({cardinal: cardinal, texture_id: this.state.droppable, length: this.state.length, width: 100}));
            }
        });
        var prev_pos = 0;
        this.renderable.on('mousemove', (event: any) => {
            if(event.target === this.sprite || event.target === this.handles.top || event.target === this.handles.bottom) {
                if(!this.handles_container.visible) {
                    this.handles_container.visible = true;
                }
                if(id === this.state.resize_target && (event.target === this.handles.top || event.target === this.handles.bottom)) {
                    let new_width = (() => {
                        let calc = (prev_pos - event.data.getLocalPosition(event.target.parent.parent).y);
                        prev_pos = event.data.getLocalPosition(event.target.parent.parent).y;
                        if(event.target === this.handles.bottom) {
                            return -calc;
                        }
                        return calc;
                    })();
                    if(event.target === this.handles.top) {
                        store.dispatch(laneResizeMove({id: id, new_width: new_width, cardinal: cardinal}));
                    } else {
                        store.dispatch(laneResizeMove({id: id, new_width: new_width, cardinal: cardinal}));
                    }
                }
            } else {
                this.handles_container.visible = false;
            }
            
            // let pos = event.data.getLocalPosition(this.renderable);
            // console.log(event.target);
        })
        this.renderable.on('mousedown', (event: any) => {
            if(event.target === this.handles.top || event.target === this.handles.bottom) {
                prev_pos = event.data.getLocalPosition(event.target.parent.parent).y;
                store.dispatch(laneResizeStarted({id: id, resize_start_width: this.state.width, resize_start_pos: event.data.getLocalPosition(event.target.parent.parent).y}));
            }
        })
        this.renderable.on('mouseup', (event: any) => {
            store.dispatch(laneResizeEnded({}));
        })
        this.renderable.on('mouseupoutside', () => {
            store.dispatch(laneResizeEnded({}));
        })
        // this.sprite.on('mouseover', () => {
        //     // store.dispatch(laneHovered({id: id}));
        //     top_handle.on('mousedown', (event: any) => {
        //         store.dispatch(laneResizeStarted({id: id}));
        //     });
        //     // this.renderable.on('mousemove', (event:any) => {
        //     //     console.log(event);
        //     //     if(event.data.target == top_handle && this.state.resize_target === id) {
        //     //         console.log(event);
        //     //     }
        //     // })
        //     top_handle.on('mouseup', () => {
        //         store.dispatch(laneResizeEnded({}));
        //     });
        //     let bottom_handle= new Graphics();
        //     bottom_handle.beginFill(0xFFFFFF00);
        //     bottom_handle.lineStyle(5, 0xFF0000);
        //     bottom_handle.drawRect(0, 0, 25, 25);
        //     bottom_handle.width = 25;
        //     bottom_handle.height = 25;
        //     bottom_handle.interactive = true;
        //     bottom_handle.position.set(0, this.state.width - 25);
        //     bottom_handle.on('mousedown', () => {
        //         store.dispatch(laneResizeStarted({id: id}));
        //     });
        //     // bottom_handle.on('mousemove', (event:any) => {
        //     //     if(event.data.target == bottom_handle && this.state.resize_target === id) {

        //     //     }
        //     // })
        //     bottom_handle.on('mouseup', () => {
        //         store.dispatch(laneResizeEnded({}));
        //     });
        //     this.handles_container.addChild(top_handle);
        //     this.handles_container.addChild(bottom_handle);
        // });
        this.sprite.on('mouseout', () => {
            // this.handles_container.removeChildren();
            // store.dispatch(laneHoverLeft({}))
        });
    }
    mapStateToSchema(state: any) {
        let {lanes, resources, streets} = state;
        let owned_lane = lanes.by_id[this.id];
        return {
            ...lanes.by_id[this.id],
            length: streets[this.cardinal].length,
            texture: resources.textures[owned_lane.texture],
            droppable: resources.droppable,
            resize_target: lanes.resize_target,
            resize_start_pos: lanes.resize_start_pos,
            resize_start_width: lanes.resize_start_width
        }
    }
    update() {
        if(this.state.texture && this.state.texture !== this.sprite.texture) {
            this.sprite.texture = this.state.texture;
        }
        this.sprite.height = this.state.width;
        this.sprite.width = this.state.length;
        this.handles_container.position.set(this.state.length/2, 0);
        this.handles.bottom.position.set(0, this.state.width - 25);
        this.width_text.position.set(0, this.state.width/2 - this.width_text.height/2);
        this.width_text.text = this.state.width.toString();
    }
    animate(t: number) {

    }
}