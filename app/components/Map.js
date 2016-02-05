import React, { Component } from 'react'
import 'leaflet/dist/leaflet.css'
import { Map as BaseMap, TileLayer } from 'react-leaflet'

const url = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
const center  = [49.28,-123.15]
const zoom = 10
const STYLE = {
    height: '100vh'
}

export default class Map extends Component {
    map = null;
    get leaflet() {
        return this.map.getLeafletElement()
    }
    componentWillReceiveProps(nextProps) {
        const {bounds} = this.props

        if (!nextProps.bounds.isValid() || nextProps.bounds.equals(bounds)) {
            return
        }

        this.leaflet.fitBounds(nextProps.bounds)
    }
    render() {
        return (
            <BaseMap ref={map => this.map = map} style={STYLE} {...{center , zoom}}>
                <TileLayer {...{url}} />
                {this.props.children}
            </BaseMap>
        )
    }
}
