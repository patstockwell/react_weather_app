import React, { Component } from 'react'
import DailyForecastItem from '../components/DailyForecastItem'
import * as ForecastActions from '../actions/ForecastActions'
import ForecastStore from '../stores/ForecastStore'

class Forecast extends Component {
    constructor(props) {
        super(props)
        this.state = {
            query: '',
            forecastData: null
        }
        this.handleInput = this.handleInput.bind(this)
        this.fetchNewData = this.fetchNewData.bind(this)
    }

    handleInput(event) {
        this.setState({
            query: event.target.value
        })
    }

    fetchNewData(event) {
        event.preventDefault()
        ForecastActions.fetchData(this.state.query)
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
                <div className="search-area row my-5">
                    <div className="col-sm-4">
                        <form onSubmit={this.fetchNewData}>
                            <div className="form-group">
                                <input value={this.state.query} onInput={this.handleInput} type="text" className="form-control my-3" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="City" />
                                <small id="emailHelp" className="form-text text-muted my-1">Get the 5 day forecast for any city in Australia.</small>
                                <button type="submit" className="btn btn-primary my-3">Search</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Forecast
