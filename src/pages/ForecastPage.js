import React, { Component } from 'react'
import DailyForecastItem from '../components/DailyForecastItem'
import ForecastStore from '../stores/ForecastStore'
import SearchBar from '../components/SearchBar'

class Forecast extends Component {
    constructor(props) {
        super(props)
        this.state = {
            query: '',
            forecastData: null
        }
    }

    componentWillMount() {
        ForecastStore.on('change', () => {
            this.setState({forecastData: ForecastStore.getForecastData()})
        })
    }

    render() {
        // const dailyForecasts = this.state.forecastData.map(forecast => {
        //     return <DailyForecastItem key={forecast.id} data={forecast}/>
        // })
        const heading = this.state.forecastData ? this.state.forecastData.city.name : 'Australian weather forecast'
        console.log(this.state.forecastData)
        return(
            <div className="container">
                <div className="forecast-heading">
                    <h1 className="display-4 my-5">{heading}</h1>
                </div>
                <div className="row">
                    <DailyForecastItem key="1234" data={this.state.forecastData}/>
                    <DailyForecastItem key="2345" data={this.state.forecastData}/>
                    <DailyForecastItem key="1223534" data={this.state.forecastData}/>
                </div>
                <div className="search-area my-5">
                    <SearchBar />
                </div>
            </div>
        )
    }
}

export default Forecast
