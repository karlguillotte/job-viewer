import React from 'react'
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
    },
    RIGHT: {
        flexGrow: 4,
    }
}

export default () => (
    <div style={STYLES.APP}>
        <div style={STYLES.LEFT}>
            <List>
                <a href='#' className='list-group-item'>Tenant name</a>
            </List>
        </div>
        <div style={STYLES.RIGHT}>
            <Map>

            </Map>
        </div>
    </div>
)
