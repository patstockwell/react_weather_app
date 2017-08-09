import React, { Component } from 'react'
import './DailyForecastItem.css'

class DailyForecastItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ForecastData: {}
        }
    }
    render() {
        const icon = '10n'
        const description = 'clouds and rain'
        const imageUrl = `http://openweathermap.org/img/w/${icon}.png`
        return(
            <div className="col-md-3 col-sm-4">
                <div className="card">
                    <div className="card-block">
                        <img className="card-img-top weather-icon" src={imageUrl} alt={description} />
                        <div>
                            <p className="max-min-prefix">Max:</p><h4 className="card-title max-min-temp">23°</h4>
                        </div>
                        <div>
                            <p className="max-min-prefix">Min:</p><h4 className="card-title max-min-temp">13°</h4>
                        </div>
                        <p className="card-text">{description}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default DailyForecastItem
