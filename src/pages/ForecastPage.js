import React, { Component } from 'react'
import DailyForecastItem from '../components/DailyForecastItem'
import * as ForecastActions from '../actions/ForecastActions'
import ForecastStore from '../stores/ForecastStore'

class Forecast extends Component {
    constructor(props) {
        super(props)
        this.state = {
            forecastData: [
                { maxTemp: 32, id: 123049870 },
                { maxTemp: 33, id: 238475619 },
                { maxTemp: 24, id: 169450968 },
                { maxTemp: 25, id: 585875857 }
            ]
        }
    }

    fetchNewData() {
        ForecastActions.fetchData('Melbourne')
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
            <div>
                Forecast page

                <div>{dailyForecasts}</div>
                <button onClick={this.fetchNewData}>Fetch New Data</button>
            </div>
        )
    }
}

export default Forecast
