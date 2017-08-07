import { EventEmitter } from 'events'

import Dispatcher from '../dispatcher/Dispatcher'

class ForecastStore extends EventEmitter {
    constructor() {
        super()
        this.forecastData = [
        
        ]
        // bind the functions IN this class TO this class
        this.handleChange = this.handleChange.bind(this)
        this.fetchApiData = this.fetchApiData.bind(this)
    }

    fetchApiData(keyword) {
        // go get data from API with axios
        this.forecastData = [
            { maxTemp: 13, id: 123049870 },
            { maxTemp: 12, id: 238475619 },
            { maxTemp: 7, id: 169450968 },
            { maxTemp: 9, id: 585875857 }
        ]
        // emit an event so that the components calling
        // ForecastStore.on('change', someHandler) can update
        this.emit('change')
    }

    getForecastData() {
        return this.forecastData
    }

    handleChange(action) {
        switch(action.type) {
            case 'FETCH': {
                this.fetchApiData(action.keyword)
                break
            }
            default: {}
        }
    }



}

// instantiate the class
const forecastStore = new ForecastStore()
// register the callback with the dispatcher
Dispatcher.register(forecastStore.handleChange)

export default forecastStore
