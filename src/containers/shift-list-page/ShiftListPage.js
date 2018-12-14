import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from './shiftListActions'
import Moment from 'moment';
import { extendMoment } from 'moment-range';
const moment = extendMoment(Moment)

class ShiftListPage extends Component {

    componentWillMount()
    {
        this.props.actions.loadShifts();
    }

    handleCityClick(city)
    {
        //if clicking on loaded city
        if (this.props.state.events.city && this.props.state.events.city.id === city.id)
        {
            this.props.actions.clearEvents();
        }
        else
        {
            this.props.actions.loadEventsForCoordinates(city.lon, city.lat);
        }
    }

    handleEventDetailsClick(eventId)
    {
        if (this.props.state.visibleDetails.includes(eventId))
        {
            this.props.actions.removeVisibleDetails(eventId);
        }
        else
        {
            this.props.actions.setVisibleDetails(eventId);
        }
    }

    render()
    {
        const {state} = this.props;

        // const events = state.events.events ?
        //     state.events.events.map( event =>
        //         (<div key={event.id}>
        //             <div className="link-container">
        //                 <span className="date-time">
        //                     {event.local_date} {event.local_time}
        //                 </span>
        //                 <a href={event.link}>
        //                     {event.name}
        //                 </a>
        //                 <span className="details" onClick={this.handleEventDetailsClick.bind(this, event.id)}>
        //                     {
        //                         !this.props.state.visibleDetails.includes(event.id) &&
        //                         <span>show details</span>
        //                     }
        //                     {
        //                         this.props.state.visibleDetails.includes(event.id) &&
        //                         <span>hide details</span>
        //                     }
        //                 </span>
        //             </div>
        //             {
        //                 this.props.state.visibleDetails.includes(event.id) &&
        //                 <div className="details-container" dangerouslySetInnerHTML={{__html: event.description}}/>
        //             }
        //         </div>)
        //     )
        //     :
        //     (<div/>);


        //for (let day of state.displayPeriod.by('day')) {
          console.log([...state.displayPeriod.by('day')]);
        //}



        const displayPeriod = [ ...state.displayPeriod.by('day') ];
        
        const tableHeader = displayPeriod.map( moment =>
            (<td key={ moment.format('DD-MM-YY')} >
                { moment.format('ll') }
            </td>)
        );


        const shifts = displayPeriod.map( moment  =>
            (<div className="shift-container" key={ moment.format('DD-MM-YYYY') }>
                {/*<div onClick={this.handleCityClick.bind(this, city)} className="city-name">*/}
                    {/*{city.city}*/}
                {/*</div>*/}
                {/*{*/}
                    {/*state.events.city && state.events.city.id === city.id &&*/}
                    {/*<div className="events-container">{events}</div>*/}
                {/*}*/}


                 {  }


{/*                Employee: <span>{ state.shifts[shiftId].employeeId }</span>,
                Date: <span>{ moment.unix(state.shifts[shiftId].endTime).format("ll") }</span>,
                Start: <span>{ moment.unix(state.shifts[shiftId].startTime).format("HH:mm") }</span>,
                End: <span>{ moment.unix(state.shifts[shiftId].endTime).format("HH:mm") }</span>*/}

          </div>)
        );

        return (
            <div className="list-page-container">
                <h3>City List</h3>
                <div className="table-container">
                    <table >
                        <thead>
                            { tableHeader }
                        </thead>
                        {shifts}
                    </table>
                </div>
            </div>
        )
    }

}

const mapStateToProps = ({list}) =>
({
    state: list
});

const mapDispatchToProps = (dispatch) =>
({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShiftListPage)