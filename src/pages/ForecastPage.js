import React, { Component } from 'react'
import DailyForecastItem from '../components/DailyForecastItem'
import * as ForecastActions from '../actions/ForecastActions'
import ForecastStore from '../stores/ForecastStore'

class Forecast extends Component {
    constructor(props) {
        super(props)
        this.state = {
            query: '',
            forecastData: [
                { maxTemp: 32, id: 123049870 },
                { maxTemp: 33, id: 238475619 },
                { maxTemp: 24, id: 169450968 },
                { maxTemp: 25, id: 585875857 }
            ]
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
        const dailyForecasts = this.state.forecastData.map(forecast => {
            return <DailyForecastItem key={forecast.id} data={forecast}/>
        })
        return(
            <div className="container">
                <div className="row">
                    Forecast page
                </div>
                <div className="row">
                    {dailyForecasts}
                </div>
                <div className="row my-5">
                    <form onSubmit={this.fetchNewData}>
                        <div className="form-group">
                            <input value={this.state.query} onInput={this.handleInput} type="text" className="form-control my-3" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="City" />
                            <small id="emailHelp" className="form-text text-muted my-1">Get the 5 day forecast for any city in Australia.</small>
                            <button type="submit" className="btn btn-primary my-3">Fetch New Data</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Forecast
