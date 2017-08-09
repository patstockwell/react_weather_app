import React, { Component } from 'react'
import * as ForecastActions from '../actions/ForecastActions'

class SearchBar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            query: ''
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

    render() {
        return(
            <div className="row">
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
        )
    }
}

export default SearchBar
