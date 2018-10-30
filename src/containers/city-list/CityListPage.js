import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actions from './cityListActions'



class CityListPage extends Component {

  componentWillMount(){
    this.props.actions.loadCities();
  }

  handleCityClick(city){
    //if clicking on loaded city
    if (this.props.state.events.city && this.props.state.events.city.id === city.id) this.props.actions.clearEvents();

    else this.props.actions.loadEventsForCoordinates(city.lon, city.lat);
  }

    render() {

        const {state, actions} = this.props;


        const events = state.events.events ?
            state.events.events.map( event =>
                (<div key={event.id} >
                    <div className="link-container">
                        <span>{event.local_date} {event.local_time}</span>
                        <a href={event.link}>{event.name}</a>
                    </div>
                </div>)


            )
            : (<div/>);

        const cities = state.cities.map(city =>
            (<div className="city-container" key={city.id} >
                <div onClick={this.handleCityClick.bind(this, city)}>{city.city}</div>
                { state.events.city && state.events.city.id === city.id && <div className="events-container">{events}</div> }
            </div>)

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