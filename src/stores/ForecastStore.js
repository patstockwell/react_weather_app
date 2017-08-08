import { EventEmitter } from 'events'
import axios from 'axios'
import Dispatcher from '../dispatcher/Dispatcher'
import cityList from '../australian.city.list.min'

class ForecastStore extends EventEmitter {
    constructor() {
        super()
        this.forecastData = [

        ]
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

    toCelcius(kelvin) {
        return kelvin - 273.15
    }

    fetchApiData(keyword) {
        const id = this.getCityId(keyword)
        console.log(id)
        const API_KEY = 'cdfee189f0f29adbbe63a56b6140263c'
        if(id) {
            console.log('fetching data...')
            // go get data from API with axios
            axios.get('http://api.openweathermap.org/data/2.5/forecast', {
                params: {
                    id: id,
                    APPID: API_KEY
                }
            })
            .then(function (response) {
                console.log(response)
            })
            .catch(function (error) {
                console.log(error)
            })
        }


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
