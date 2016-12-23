import React from 'react';

export interface DragHandler {
    onStartDrag: (e: any) => void
    onMoveDrag: () => void
    onEndDrag: () => void
}

export default class Drag implements DragHandler {
    constructor() {

    }

    onStartDrag(e: any) {
        console.log(e);
    }

    onMoveDrag() {

    }

    onEndDrag() {

    }
}
