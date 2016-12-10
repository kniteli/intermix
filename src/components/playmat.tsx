import {WebGLRenderer, Container} from 'pixi.js';
import React from 'react';

interface PlaymatProps extends React.Props<Playmat> {
    renderer: WebGLRenderer,
    stage: Container
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
        this.refs.canvas.appendChild(this.props.renderer.view);
        const animate = () => {
            // start the timer for the next animation loop
            if(this.state.running) {
                requestAnimationFrame(animate);
            }
            // this is the main render call that makes pixi draw your container and its children.
            this.props.renderer.render(this.props.stage);
        }
        animate();
    }
    public componentWillUnmount() {
        this.setState({running: false});
    }
    public render() {
        return (
            <div ref="canvas">
            </div>
        );
    }
    refs: {
        [key: string]: (Element);
        canvas: (HTMLElement);
    }
}
