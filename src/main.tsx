import {WebGLRenderer, Sprite, Container, loader, utils} from 'pixi.js';
import {Playmat, Selector} from 'components';
import {Placeable} from 'core';
import React from 'react';
import {render} from 'react-dom';
import _ from 'lodash';

export const main = () => {
  // You can use either `new PIXI.WebGLRenderer`, `new PIXI.CanvasRenderer`, or `PIXI.autoDetectRenderer`
  // which will try to choose the best renderer for the environment you are in.
  utils.skipHello();
  let renderer = new WebGLRenderer(800, 600);
  let stage = new Container();
  // load the texture we need
  loader.add('road', 'assets/road.png')
        .add('sidewalk', 'assets/sidewalk.png')
        .load((loader, resources) => {
            let placeables: Placeable[] = _(resources).map((resource: any, name: string) => new Placeable(name, resource.data)).value();
            console.log(placeables);
            render(
                <div>
                    <Playmat renderer={renderer} stage={stage} />
                    <Selector selectables={placeables} />
                </div>,
                document.getElementById('approot'));
        });

  // You need to create a root container that will hold the scene you want to draw.

  //north, south, west, east, center roads
  let intersection = {};
  let road_dirs = {
    north: {
      lanes: {}
    },
    south: {},
    east: {},
    west: {}
  }

  // Declare a global variable for our sprite so that the animate function can access it.
  var bunny : Sprite = null;


}

main();
