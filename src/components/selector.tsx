import React from 'react';
import {Placeable} from 'core';

interface SelectorProps {
    selectables: Placeable[]
}

export default class Selector extends React.Component<SelectorProps, {}> {
    public render() {
        return (
            <ul>
                {this.props.selectables.map(selectable => <li key={selectable.name}><img src={selectable.image.src} /></li>)}
            </ul>
        )
    }
}
