import React from 'react';
import {connect} from 'react-redux';
import {startDragEntity} from 'actions';
import {Texture} from 'pixi.js';

interface SelectorStateProps {
    selectables: Texture[],
}

interface SelectorDispatchProps {
    onStartDrag: (action: {texture_id: number}) => void
}

interface SelectorOwnProps {

}

type SelectorProps = SelectorStateProps & SelectorDispatchProps & SelectorOwnProps;

class Selector extends React.Component<SelectorProps, {}> {
    public render() {
        return (
            <ul>
                {this.props.selectables.map((selectable, index) => <li key={index} onClick={e => this.props.onStartDrag({texture_id: index})}><img src={selectable.baseTexture.imageUrl} /></li>)}
            </ul>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        selectables: state.resources.textures
    }
}

export default connect<SelectorStateProps, SelectorDispatchProps, SelectorOwnProps>(mapStateToProps, {onStartDrag: startDragEntity})(Selector);