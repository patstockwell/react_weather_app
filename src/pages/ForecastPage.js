import React, { Component } from 'react'
import DailyForecastItem from '../components/DailyForecastItem'
import ForecastStore from '../stores/ForecastStore'
import SearchBar from '../components/SearchBar'

class Forecast extends Component {
    constructor(props) {
        super(props)
        this.state = {
            query: '',
            lastUnfoundSearch: null,
            forecastData: null
        }
    }

    componentWillMount() {
        ForecastStore.on('change', () => {
            this.setState({
                lastUnfoundSearch: null,
                forecastData: ForecastStore.getForecastData()
            })
        })
        ForecastStore.on('error', () => {
            this.setState({
                lastUnfoundSearch: ForecastStore.getKeywordSearched()
            })
        })
    }

    render() {
        let dailyForecasts
        if(this.state.forecastData) {
            dailyForecasts = this.state.forecastData.list.map(forecast => {
                return <DailyForecastItem key={forecast.dt} data={forecast}/>
            })
        }
        const error = this.state.lastUnfoundSearch ? `Couldn't find ${this.state.lastUnfoundSearch}` : ''
        const heading = this.state.forecastData ? this.state.forecastData.city.name : 'Australian weather forecast'
        console.log(this.state.forecastData)
        return(
            <div className="container">
                <div className="forecast-heading">
                    <h1 className="display-4 my-2">{heading}</h1>
                </div>
                <div className="search-area my-2">
                    <SearchBar />
                    <p className="error">{error}</p>
                </div>
                <div className="forecast-tile-area pb-5">
                    <div className="row">
                        { dailyForecasts }
                    </div>
                </div>
            </div>
        )
    }
}

export default Forecast
