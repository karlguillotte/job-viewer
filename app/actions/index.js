import * as CONSTANTS from '../constants'

const parse = response => response.json()
const OPTIONS = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    credentials: 'include',
}

function fetchTenants() {
    return dispatch => {
        dispatch({
            type: CONSTANTS.TENANTS_FETCH_REQUESTED
        })

        fetch('/api/v1/tenants', OPTIONS).then(parse)
        .then(payload => {
            dispatch(receiveTenants(payload.data))
        })
    }
}
function fetchTenantJobs(tenantId) {
    return dispatch => {
        dispatch({
            type: CONSTANTS.TENANT_JOBS_FETCH_REQUESTED,
            payload: tenantId
        })

        fetch(`/api/v1/tenants/${tenantId}/jobs`, OPTIONS).then(parse)
        .then(payload => {
            dispatch(receiveJobs(payload.data))
        })
    }
}

function receiveJobs(jobs) {
    return {
        type: CONSTANTS.JOBS_RECEIVED,
        payload: jobs
    }
}
function receiveTenants(tenants) {
    return {
        type: CONSTANTS.TENANTS_RECEIVED,
        payload: tenants
    }
}

export function initialize() {
    return dispatch => {
        dispatch(fetchTenants())
    }
}
export function activateTenant(tenantId) {
    return dispatch => {
        dispatch({
            type: CONSTANTS.TENANT_ACTIVATED,
            payload: tenantId
        })
        dispatch(fetchTenantJobs(tenantId))
    }
}
