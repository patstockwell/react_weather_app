import Dispatcher from '../dispatcher/Dispatcher'

export function fetchData(keyword) {
    Dispatcher.dispatch({
        type: 'FETCH',
        keyword
    })
}
