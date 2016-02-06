import React, { Component } from 'react'
import List from '../components/List'
import { connect } from 'react-redux'
import { activateTenant } from '../actions'

const selector = state => {

}
const actions = {
    onItemClick: activateTenant
}

@connect(selector, actions)
export default class ListContainer extends Component {
    render() {
        const { items } = this.props

        return (
            <List>
                {items.map(({id, name, active}) => (
                    <a key={id} href='#' className={`list-group-item ${active ? 'active' : ''}`} onClick={this.props.onItemClick.bind(this, id)}>
                    {name}
                    </a>
                ))}
            </List>
        )
    }
}
