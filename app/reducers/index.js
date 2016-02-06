import { combineReducers } from 'redux'
import * as CONSTANTS from '../constants'

function jobs(state = new Map(), action) {
    switch (action.type) {
        case CONSTANTS.JOBS_RECEIVED:
            action.payload.forEach(job => {
                state.set(job.id, job)
            })

            return new Map([...state])
        default:
            return state
    }
}

function tenants(state = new Map(), action) {
    switch (action.type) {
        case CONSTANTS.TENANTS_RECEIVED:
            action.payload.forEach(tenant => {
                state.set(tenant.id, tenant)
            })

            return new Map([...state])
        default:
            return state
    }
}

function activeTenantId(state = null, action) {
    switch (action.type) {
        case CONSTANTS.TENANT_ACTIVATED:
            return action.payload
        default:
            return state
    }
}

export default combineReducers({
    jobs,
    tenants,
    activeTenantId,
})
