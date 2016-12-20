import {WebGLRenderer, Container, Sprite} from 'pixi.js';
import React from 'react';
import {Street, Lane, Intersection} from 'core';

interface PlaymatProps extends React.Props<Playmat> {
    renderer: WebGLRenderer
    stage: Container
    intersection: Intersection
}

interface PlaymatState {
    running: boolean
}

export default class Playmat extends React.Component<PlaymatProps, PlaymatState> {

    constructor(props: PlaymatProps) {
        super(props);
        this.state = {
            running: true
        }
    }

    public componentDidMount() {
        this.setup(this.props.renderer, this.props.stage, this.props.intersection);
        this.animate();
    }

    // public componentWillReceiveProps(nextProps: PlaymatProps) {
    //     if(nextProps.renderer !== this.props.renderer || nextProps.stage !== this.props.stage) {
    //         this.setup(nextProps.renderer, this.props.stage, this.props.intersection);
    //     }
    //     // nextProps.stage.addChild(nextProps.layers.reduce((container: Container, layer: any) => container.addChild(layer.something()), new Container()));
    // }

    // public shouldComponentUpdate(nextProps: PlaymatProps) : boolean {
    //     if(nextProps.renderer !== this.props.renderer || nextProps.stage !== this.props.stage) {
    //         return true;
    //     }
    //     return false;
    // }

    public componentWillUnmount() {
        this.setState({running: false});
    }

    public render() {
        return (
            <div ref="canvas">
            </div>
        );
    }

    private setup(renderer: WebGLRenderer, stage: Container, intersection: Intersection) {
        this.props.stage.addChild(intersection.renderable);
        this.refs.canvas.appendChild(renderer.view);
    }

    private animate() {
        // this is the main render call that makes pixi draw your container and its children.
        this.props.intersection.update();
        this.props.renderer.render(this.props.stage);

        // start the timer for the next animation loop
        if(this.state.running) {
            requestAnimationFrame(() => this.animate);
        }
    }

    refs: {
        [key: string]: (Element);
        canvas: (HTMLElement);
    }
}
