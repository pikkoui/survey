import React, { Component } from "react"
import StarRatings from 'react-star-ratings';


export default class StarRating extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    changeRating( newRating, name ) {
      this.setState({
        rating: newRating
      },() => this.props.ratingHandler(newRating));
    }

    render() {
        return(
            <div>
                <h2>Rate your ride:</h2>
                <StarRatings
                  rating={this.state.rating}
                  starRatedColor="gold"
                  changeRating={this.changeRating.bind(this)}
                  numberOfStars={5}
                  name='rating'
                />
            </div>
        )
    }
}
