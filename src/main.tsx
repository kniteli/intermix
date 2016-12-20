import {WebGLRenderer, Sprite, Container, loader, utils, Texture} from 'pixi.js';
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import _ from 'lodash';
import {Playmat, Selector} from 'components';
import {Placeable, Intersection, Street, Lane} from 'core';
import reducers from 'reducers';

let default_layout = {
    north: {
        lanes: [
            {texture: 1, width: 100},
            {texture: 2, width: 100}
        ],
        width: 200
    },
    south: {
        lanes: [
            {texture: 1, width: 100},
            {texture: 2, width: 100}
        ],
        width: 200
    },
    east: {
        lanes: [
            {texture: 1, width: 100},
            {texture: 2, width: 100}
        ],
        width: 200
    },
    west: {
        lanes: [
            {texture: 1, width: 100},
            {texture: 2, width: 100}
        ],
        width: 200,
    }
}

export const main = () => {
  utils.skipHello();
  const canvas_width = 800;
  const canvas_height = 600;
  let renderer = new WebGLRenderer(canvas_width, canvas_height);
  let stage = new Container();
  loader.add('road', 'assets/road.png')
        .add('sidewalk', 'assets/sidewalk.png')
        .add('sidewalk-light', 'assets/sidewalk-light.png')
        .load((loader, resources) => {
            let store = createStore(reducers);
            let placeables: Placeable[] = _(resources).map((resource: any, name: string) => new Placeable(name, new Texture(resource.texture), resource.data)).value();
            _(default_layout).forEach((street: any) => {
                street.lanes = street.lanes.map((lane: any) => {
                    return {texture: placeables[lane.texture].texture, width: lane.width};
                })
            })
            let intersection = new Intersection(default_layout, canvas_width, canvas_height);
            render(
                <div>
                    <Playmat renderer={renderer} stage={stage} intersection={intersection}/>
                    <Selector selectables={placeables} />
                </div>,
                document.getElementById('approot')
            );
        });
}

main();
