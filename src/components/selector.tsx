import React from 'react';
import {connect} from 'react-redux';
import {DragHandler} from 'core';
import {Texture} from 'pixi.js';

interface SelectorStateProps {
    selectables: Texture[],
}

interface SelectorOwnProps {
    draggable: DragHandler
}

type SelectorProps = SelectorStateProps & SelectorOwnProps;

class Selector extends React.Component<SelectorProps, {}> {
    public render() {
        return (
            <ul>
                {this.props.selectables.map((selectable, index) => <li key={index} onDragStart={e => this.props.draggable.onStartDrag(e)}><img src={selectable.baseTexture.imageUrl} /></li>)}
            </ul>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        selectables: state.resources.textures
    }
}

export default connect<SelectorStateProps, {}, SelectorOwnProps>(mapStateToProps)(Selector);