import {WebGLRenderer, Sprite, Container, loader, utils, Texture} from 'pixi.js';
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import _ from 'lodash';
import {Playmat, Selector} from 'components';
import {Placeable} from 'core';
import reducers from 'reducers';

export const main = () => {
  utils.skipHello();
  let renderer = new WebGLRenderer(800, 600);
  let stage = new Container();
  loader.add('road', 'assets/road.png')
        .add('sidewalk', 'assets/sidewalk.png')
        .load((loader, resources) => {
            let store = createStore(reducers);
            let placeables: Placeable[] = _(resources).map((resource: any, name: string) => new Placeable(name, new Texture(resource), resource.data)).value();
            render(
                <Provider store={store}>
                    <Playmat renderer={renderer} stage={stage} />
                    <Selector selectables={placeables} />
                </Provider>,
                document.getElementById('approot')
            );
        });
}

main();
