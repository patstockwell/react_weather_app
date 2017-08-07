import React, { Component } from 'react'

class DailyForecastItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ForecastData: {}
        }
    }
    render() {
        return(
            <div>
                Forecast Item for a single day
                Max Temp is: {this.props.data.maxTemp}
            </div>
        )
    }
}

export default DailyForecastItem
