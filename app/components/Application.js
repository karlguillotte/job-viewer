import React, { Component } from 'react'
import List from './List'
import Map from './Map'

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

export default class Application extends Component {
    state = {
        tenants: []
    };
    componentDidMount() {
        const url = '/api/v1/tenants'
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            credentials: 'include',
        }

        fetch(url, options)
        .then(response => response.json())
        .then(payload => {
            this.setState({
                tenants: payload.data
            })
        })
    }
    render() {
        const {tenants} = this.state

        return (
            <div style={STYLES.APP}>
                <div style={STYLES.LEFT}>
                    <List>
                        {tenants.map(tenant => (
                            <a href='#' className='list-group-item'>{tenant.name}</a>
                        ))}
                    </List>
                </div>
                <div style={STYLES.RIGHT}>
                    <Map>

                    </Map>
                </div>
            </div>
        )
    }
}
