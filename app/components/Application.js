import React, { Component } from 'react'
import List from './List'
import Map from './Map'
import { Marker, Popup } from 'react-leaflet'
import { LatLng, LatLngBounds } from 'leaflet'

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
    }
}

const OPTIONS = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    credentials: 'include',
}

function computeBounds(jobs) {
    if (jobs.length === 0) {
        return new LatLngBounds()
    }

    const longitudes = jobs.map(job => job.longitude)
    const latitudes = jobs.map(job => job.latitude)
    const sw = new LatLng(Math.min(...latitudes), Math.min(...longitudes))
    const ne = new LatLng(Math.max(...latitudes), Math.max(...longitudes))

    return new LatLngBounds(sw, ne)
}

export default class Application extends Component {
    state = {
        tenants: [],
        jobs: [],
        bounds: new LatLngBounds(),
        activeTenantId: null
    };
    componentDidMount() {
        this.fetchTenants()
    }
    fetchTenants() {
        fetch('/api/v1/tenants', OPTIONS)
        .then(response => response.json())
        .then(payload => {
            this.setState({
                tenants: payload.data
            })
        })
    }
    fetchJobs(tenantId) {
        fetch(`/api/v1/tenants/${tenantId}/jobs`, OPTIONS)
        .then(response => response.json())
        .then(({data}) => {
            this.setState({
                jobs: data,
                bounds: computeBounds(data)
            })
        })
    }
    handleTenantClick(tenantId, event) {
        event.preventDefault()
        this.setState({
            activeTenantId: tenantId
        }, this.fetchJobs.bind(this, tenantId))
    }
    render() {
        const {tenants, jobs, bounds, activeTenantId} = this.state

        return (
            <div style={STYLES.APP}>
                <div style={STYLES.LEFT}>
                    <List>
                        {tenants.map(({id, name}) => (
                            <a key={id} href='#' className={`list-group-item ${activeTenantId === id ? 'active' : ''}`} onClick={this.handleTenantClick.bind(this, id)}>
                                {name}
                            </a>
                        ))}
                    </List>
                </div>
                <div style={STYLES.RIGHT}>
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
