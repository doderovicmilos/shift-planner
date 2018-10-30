import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actions from './cityListActions'



class CityListPage extends Component {

  componentWillMount(){
    this.props.actions.loadCities();
  }

  handleCityClick(item){
    this.props.actions.loadEventsForCoordinates(item.lon, item.lat);
  }

    render() {

        const {state, actions} = this.props;


        const events = state.events.events ? state.events.events.map(event => <div key={event.id}>{event.name}</div>) : <div/> ;

        const cities = state.cities.map(city =>
            <div className="city-container" key={city.id} onClick={this.handleCityClick.bind(this, city)}>
                <div>{city.city}</div>
                { state.events.city && state.events.city.id === city.id && <div>{events}</div> }

            </div>

        );



        return (<div>
            <h1>List Page</h1>
            <ul>
                {cities}
            </ul>
        </div>)
    }
}


//export default ListView
const mapStateToProps = ({list}) => ({
  state: list
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CityListPage)