import React, { Component } from 'react'
import List from '../containers/List'
import Map from '../containers/Map'
import computeBounds from '../utils/computeBounds'
import { Marker, Popup } from 'react-leaflet'

const STYLES = {
    APP: {
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'space-around',
        height: '100vh'
    },
    LEFT: {
        flexGrow: 1,
        padding: 5,
        overflowY: 'auto'
    },
    RIGHT: {
        flexGrow: 4,
    },
    PANEL: {
        position: 'fixed',
        top: 7,
        right: 7,
        zIndex: 1
    }
}

const OPTIONS = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    credentials: 'include',
}

export default class Application extends Component {
    handleTenantClick(tenantId, event) {
        event.preventDefault()
        this.setState({
            activeTenantId: tenantId
        }, this.fetchJobs.bind(this, tenantId))
    }
    render() {
        return (
            <div style={STYLES.APP}>
                <div style={STYLES.LEFT}>
                    <List />
                </div>
                <div style={STYLES.RIGHT}>
                    <Map />
                    <Map bounds={bounds} >
                        {jobs.map(({id, longitude, latitude, description, jobNumber, year}) => (
                            <Marker key={id} position={[latitude, longitude]}>
                                <Popup>
                                    <dl>
                                        <dt>Number</dt><dd>{jobNumber}</dd>
                                        <dt>Year</dt><dd>{year}</dd>
                                        <dt>Description</dt><dd>{description}</dd>
                                        <dt>Longitude</dt><dd>{longitude}</dd>
                                        <dt>Latitude</dt><dd>{latitude}</dd>
                                    </dl>
                                </Popup>
                            </Marker>
                        ))}
                    </Map>
                </div>
            </div>
        )
    }
}
