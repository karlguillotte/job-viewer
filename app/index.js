import React from 'react'
import ReactDOM from 'react-dom'
import Application from './components/Application'
import { createStore, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import reducers from './reducers'
import { initialize } from './actions'

const logger = createLogger()
const store = createStore(reducers, applyMiddleware(logger, thunk))

ReactDOM.render((
    <Provider store={store}>
        <Application />
    </Provider>
), document.getElementById('container'), () => {
    store.dispatch(initialize())
})
