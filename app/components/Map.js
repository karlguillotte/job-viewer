import React from 'react'
import 'leaflet/dist/leaflet.css'
import { Map, TileLayer } from 'react-leaflet'

const url = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
const center  = [49.28,-123.15]
const zoom = 10
const STYLE = {
    height: '100vh'
}

export default ({
    children
}) => (
    <Map style={STYLE} {...{center , zoom}}>
        <TileLayer {...{url}} />
        {children}
    </Map>
)
