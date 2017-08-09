import { EventEmitter } from 'events'
import axios from 'axios'
import Dispatcher from '../dispatcher/Dispatcher'
import cityList from '../australian.city.list.min'

class ForecastStore extends EventEmitter {
    
    constructor() {
        super()
        this.forecastData = null
        // bind the functions IN this class TO this class
        this.handleChange = this.handleChange.bind(this)
        this.fetchApiData = this.fetchApiData.bind(this)
    }

    getCityId(name) {
        if(name) {
            // loop through the city lsit
            for(let x = 0; x < cityList.length; x++) {
                // if the name is found, return it's ID
                if(name.toLowerCase() === cityList[x].name.toLowerCase()) {
                    return cityList[x].id
                }
            }
        }
        return undefined
    }

    fetchApiData(keyword) {
        const self = this
        const id = this.getCityId(keyword)
        const API_KEY = 'cdfee189f0f29adbbe63a56b6140263c'
        if(id) {
            // city has been be identified
            console.log('fetching data...')
            // go get data from API
            axios.get('http://api.openweathermap.org/data/2.5/forecast/daily', {
                params: {
                    id: id, // country id (from cityList)
                    APPID: API_KEY,
                    units: 'metric', // celcius
                    cnt: 8 // cnt: number of days returned (from 1 to 16)
                }
            })
            .then(function (response) { // store data
                self.forecastData = response.data
                // emit an event so that the components calling
                // ForecastStore.on('change', someHandler) can update
                self.emit('change')
            })
            .catch(function (error) {
                console.log(error)
            })
        }
        else {  // city can't be identified by the keyword
            // if data exists, clear it and emit change
            if (self.forecastData !== null) {
                self.forecastData = null
                self.emit('change')
            }
        }

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
