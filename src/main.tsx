import {WebGLRenderer, Sprite, Container, loader, utils, Texture} from 'pixi.js';
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import _ from 'lodash';
import {Playmat, Selector} from 'components';
import {Placeable, Intersection, Street, Lane} from 'core';
import reducers from 'reducers';
import {Draggable, connect} from 'core';
import {startupDataLoaded} from 'actions';

export const main = () => {
    utils.skipHello();
    let draggable = new Draggable();
    let store = createStore(reducers);
    let intersection = new Intersection(store);
    //@TODO: currently using a placeholder for the connect
    store.subscribe(connect(intersection.mapStateToSchema)(intersection));
    render(
        <Provider store={store}>
            <div>
                <Playmat stage={intersection}/>
                <Selector draggable={draggable} />
            </div>
        </Provider>,
        document.getElementById('approot')
    );
    loader.add('road', 'assets/road.png')
            .add('sidewalk', 'assets/sidewalk.png')
            .add('sidewalk-light', 'assets/sidewalk-light.png')
            .load((loader, resources) => {
                store.dispatch(
                    startupDataLoaded({
                        resources: _(resources).map((resource: any) => new Texture(resource.texture)).value()
                    })
                );
            });
    }

main();
