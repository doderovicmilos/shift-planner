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

        // console.log(this.props.state.displayPeriod.start);
        // console.log(this.props.state.displayPeriod.end);

        this.props.actions.loadShifts(this.props.state.displayPeriod.start, this.props.state.displayPeriod.end);
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

        const shiftsForEmployee = (shifts,  employeeId) =>
        {
            const shiftsForEmployee = {};
            const shiftIdsForEmployee = Object.keys(shifts).filter( shiftId => shifts[shiftId].employeeId === employeeId );
            shiftIdsForEmployee.forEach(
                shiftId => shiftsForEmployee[shiftId] = shifts[shiftId]
            );

            return shiftsForEmployee;
        };

        //given object with shifts extracts all shifts ended that day (day is moment set to start of day)
        const shiftsForDay = (shifts, day) =>
        {
            const shiftsForDay = {};
            const shiftIdsForDay = Object.keys(shifts).filter(shiftId => day.format() === moment.unix(shifts[shiftId].endTime).startOf('day').format());
            shiftIdsForDay.forEach(
                shiftId => shiftsForDay[shiftId] = shifts[shiftId]
            );
            return shiftsForDay;
        } ;


        const rowForUser = (displayPeriod, userId)=> {

            return displayPeriod.map(ment => {

                //if (shiftsPerEmployee && shiftsPerEmployee[userId] && Object.keys(shiftsPerEmployee[userId]).find(shiftId => ment.format() === moment.unix(shiftsPerEmployee[userId][shiftId].endTime).startOf('day').format())) {


                    //console.log(Object.keys(shiftsPerEmployee[userId]).find(shiftId => ment.format() === moment.unix(shiftsPerEmployee[userId][shiftId].endTime).startOf('day').format()));


                if(shiftsForEmployee(userId)){

                    var shiftId = Object.keys(shiftsPerEmployee[userId]).find(shiftId => ment.format() === moment.unix(shiftsPerEmployee[userId][shiftId].endTime).startOf('day').format());

                    return (<td key={ment.format('DD-MM-YY')} className={"full"}>

                        <span>{moment.unix(state.shifts[shiftId].startTime).format("HH:mm")}</span>
                        <span>{moment.unix(state.shifts[shiftId].endTime).format("HH:mm")}</span>

                    </td>)




                } else return (<td key={ment.format('DD-MM-YY')} className={"empty"}></td>)


            });




        };



        const displayPeriod = [ ...state.displayPeriod.by('day') ];

        const employeeIds = [...new Set(Object.keys(state.shifts).map( shiftId => state.shifts[shiftId].employeeId ))];

        const shiftsPerEmployee = {};

        employeeIds.forEach( employeeId => {

            shiftsPerEmployee[employeeId] = {};

            const shiftIdsPerEmployee = Object.keys(state.shifts).filter( shiftId => state.shifts[shiftId].employeeId === employeeId );

            shiftIdsPerEmployee.forEach(

                shiftId => shiftsPerEmployee[employeeId][shiftId] = state.shifts[shiftId]

            );

        });


        //console.log(shiftsForEmployee(shiftsForDay(state.shifts, moment().startOf('day')), 1));
        //console.log(shiftsForDay(shiftsForEmployee(state.shifts, 2), moment().startOf('day') ));



        const tableHeader = displayPeriod.map( ment =>
            (<th key={ ment.format('DD-MM-YY')} >
                { ment.format('ddd MMM DD') }
            </th>)
        );

        // const shifts = displayPeriod.map( moment  =>
        //     (<div className="shift-container" key={ moment.format('DD-MM-YYYY') }>
        //      {/*Employee: <span>{ state.shifts[shiftId].employeeId }</span>,
        //         Date: <span>{ moment.unix(state.shifts[shiftId].endTime).format("ll") }</span>,
        //         Start: <span>{ moment.unix(state.shifts[shiftId].startTime).format("HH:mm") }</span>,
        //         End: <span>{ moment.unix(state.shifts[shiftId].endTime).format("HH:mm") }</span>*/}
        //     </div>)
        // );

        return (
            <div className="list-page-container">

                <div className="table-container">
                    <table className={"table"}>
                        <thead>
                            <tr>
                                { tableHeader }
                            </tr>
                        </thead>
                        <tbody>
                        <tr>{ rowForUser(displayPeriod, 1)}</tr>
                        <tr>{ rowForUser(displayPeriod, 2)}</tr>
                        <tr>{ rowForUser(displayPeriod, 3)}</tr>
                        </tbody>
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