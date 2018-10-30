import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actions from './cityListActions'



class CityListPage extends Component {

  componentWillMount(){
    this.props.actions.loadCities();
  }

  handleCityClick(item){
    this.props.actions.loadEventsForCordinates(item.lon, item.lat);
  }

  render(){

    const { state, actions } = this.props;

    const cities = state.items.map( item => <li key={item.id} onClick = { this.handleCityClick.bind(this, item) } >{item.city}</li> );

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