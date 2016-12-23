import {WebGLRenderer, Container, Sprite} from 'pixi.js';
import React from 'react';
import {Renderable} from 'core';
import {connect} from 'react-redux';
import {canvasResized} from 'actions';

interface PlaymatOwnProps extends React.Props<Playmat> {
    stage: Renderable<any>
}

interface PlaymatStateProps {
    width: number
    height: number
}

interface PlaymatDispatchProps {
    onResize: (payload: {width: number, height: number}) => void 
}

interface PlaymatState {
    running: boolean
}

type PlaymatProps = PlaymatStateProps & PlaymatOwnProps & PlaymatDispatchProps

class Playmat extends React.Component<PlaymatProps, PlaymatState> {
    renderer: WebGLRenderer
    constructor(props: PlaymatProps) {
        super(props);
        this.state = {
            running: true
        }
    }

    componentWillReceiveProps(nextProps: PlaymatProps) {
        this.renderer.resize(nextProps.width, nextProps.height);
    }

    public componentDidMount() {
        window.addEventListener('resize', e => this.onResize());
        this.setup();
        this.animate();
    }

    public componentWillUnmount() {
        this.setState({running: false});
    }

    public render() {
        return (
            <div ref="canvas" >
            </div>
        );
    }

    private setup() {
        this.renderer = new WebGLRenderer(this.refs.canvas.clientWidth, this.props.height);
        this.onResize();
        this.refs.canvas.appendChild(this.renderer.view);
    }

    private animate() {
        // this is the main render call that makes pixi draw your container and its children.
        this.props.stage.animate((new Date).valueOf());
        this.renderer.render(this.props.stage.renderable);

        // start the timer for the next animation loop
        if(this.state.running) {
            requestAnimationFrame(() => this.animate());
        }
    }

    private onResize(event?: Event) {
        this.props.onResize({width: this.refs.canvas.clientWidth, height: this.props.height});
    }

    refs: {
        [key: string]: (Element);
        canvas: (HTMLElement);
    }
}

const mapStateToProps = (state: any) => {
    return {
        width: state.stage.width,
        height: state.stage.height
    }
}

export default connect<PlaymatStateProps, PlaymatDispatchProps, PlaymatOwnProps>(mapStateToProps, {onResize: canvasResized})(Playmat)