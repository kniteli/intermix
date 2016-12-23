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
    added_lanes: LaneData[]
    removed_lanes: LaneData[]
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
        this.renderable.interactive = true;
    }
    mapStateToSchema(state: any): StreetSchema {
        let {lanes, streets} = state;
        let owned_lanes = lanes.by_cardinal[this.cardinal];
        let added_lanes: number[] = owned_lanes.filter((id: number) => this.state && !this.state.lanes.find((lane: LaneData) => id === lane.id));
        let removed_lanes: number[] = owned_lanes.filter((id: number) => false);
        return {
            ...streets[this.cardinal],
            lanes: owned_lanes.map((id: number):LaneData => lanes.by_id[id]),
            added_lanes: added_lanes.map((id: number): LaneData => lanes.by_id[id]),
            removed_lanes: removed_lanes.map((id: number): LaneData => lanes.by_id[id])
        }
    }
    update() {
        var total_width = 0;
        _(this.children).forEach(lane => {
            let lane_state = _(this.state.lanes).find(lane_data => lane.id === lane_data.id); 
            lane.renderable.position.y = total_width;
            total_width += lane_state.width;
        })
        this.lane_container.rotation = (() => {
            switch(this.state.orientation) {
                case 'horizontal':
                    return 0;
                case 'vertical':
                    return Math.PI/2;
            }
        })();
        _(this.state.added_lanes).forEach((lane) => {
            let mapped = new Lane(this.store, this.cardinal, lane.id);
            this.store.subscribe(connect(mapped.mapStateToSchema)(mapped));
            this.lane_container.addChild(mapped.renderable);
            this.children.push(mapped)
        });
    }
    animate(t: number) {
        
    }
}
