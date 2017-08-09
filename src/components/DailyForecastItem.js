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
        const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

        // get weather icons and description (could be more than one)
        let description = ''
        const images = this.props.data.weather.map(weatherEvent => {
            description += `${weatherEvent.description}. `
            return <img
                className="card-img-top weather-icon"
                src={`http://openweathermap.org/img/w/${weatherEvent.icon}.png`}
                alt={weatherEvent.description}
                key={weatherEvent.id}
            />
        })
        // get temperatures
        const max = parseFloat(this.props.data.temp.max).toFixed(1)
        const min = parseFloat(this.props.data.temp.min).toFixed(1)

        // get day
        const date = new Date(this.props.data.dt * 1000)
        const day = date.getDay()

        // weekend style className
        const weekend = (day === 0 || day === 6) ? 'weekend': 'weekday'

        const rotate = {
            'msTransform': `rotate(${this.props.data.deg}deg)`,
            'WebkitTransform': `rotate(${this.props.data.deg}deg)`,
            'transform': `rotate(${this.props.data.deg}deg)`
        }

        return(
            <div className="col-lg-2 col-md-3 col-sm-4 mb-5">
                <div className={`card weather-tile ${weekend}`}>
                    <div className="card-block">
                        { images }
                        <p className="day">{weekday[day]}</p>
                        <p className="card-text weather-text">{description}</p>
                        <div>
                            <p className="max-min-prefix">Max:</p>
                            <h4 className="card-title max-min-temp">{max}°</h4>
                        </div>
                        <div>
                            <p className="max-min-prefix">Min:</p>
                            <h4 className="card-title max-min-temp">{min}°</h4>
                        </div>
                        <div>
                            <p className="max-min-prefix wind">Wind:</p>
                            <h4 className="up-arrow" style={rotate}>↑</h4>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DailyForecastItem
