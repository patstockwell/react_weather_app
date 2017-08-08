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
            <div className="card col-sm-3">
                <img className="card-img-top" src="..." alt="clouds and rain" />
                <div className="card-block">
                    <h4 className="card-title">Card title</h4>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
            </div>
        )
    }
}

export default DailyForecastItem
