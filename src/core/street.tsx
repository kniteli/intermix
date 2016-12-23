import {Container} from 'pixi.js';
import {Store} from 'redux';
import Lane from './lane';
import Renderable from './renderable';
import {Lane as LaneData} from 'reducers/lanes';
import _ from 'lodash';
import connect from './connect';

interface StreetSchema {
    width: number
    length: number
    orientation: string
    lanes: LaneData[]
}

export default class Street extends Renderable<StreetSchema> {
    cardinal: string
    renderable: Container
    lane_container: Container
    children: Lane[]
    constructor(store: Store<any>, cardinal: string) {
        super(store);
        this.renderable = new Container();
        this.lane_container = new Container();
        this.renderable.addChild(this.lane_container);
        this.cardinal = cardinal;
        this.state = this.mapStateToSchema(store.getState());
        this.children = this.state.lanes.map((lane: LaneData, index: number) => {
            let mapped = new Lane(store, cardinal, lane.id);
            store.subscribe(connect(mapped.mapStateToSchema)(mapped));
            this.lane_container.addChild(mapped.renderable);
            return mapped;
        });
        store.subscribe(connect(this.mapStateToSchema)(this));
    }
    mapStateToSchema(state: any) {
        let {lanes, streets} = state;
        let owned_lanes = lanes.by_cardinal[this.cardinal];
        return {
            ...streets[this.cardinal],
            lanes: owned_lanes.map((id: number) => lanes.by_id[id])
        }
    }
    update() {
        var total_width = 0;
        _(this.children).forEach(lane => {
            lane.renderable.position.y = total_width;
            total_width += _(this.state.lanes).filter(lane_data => lane.id !== lane_data.id).value().pop().width;
        })
        this.lane_container.rotation = (() => {
            switch(this.state.orientation) {
                case 'horizontal':
                    return 0;
                case 'vertical':
                    return Math.PI/2;
            }
        })();
    }
    animate(t: number) {
        
    }
}
