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

        //console.log(this.props.state.displayPeriod.start.unix());

        this.props.actions.loadShifts(this.props.state.displayPeriod.start.unix(), this.props.state.displayPeriod.end.unix());
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

/*        const shiftsForEmployee = (shifts,  employeeId) =>
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

        const shiftsForEmployeeForDay = (shifts,  employeeId, day) =>
        {
            const shiftsForEmployeeForDay = {};
            const shiftIdsForEmployee = Object.keys(shifts).filter( shiftId => shifts[shiftId].employeeId === employeeId );
            const shiftIdsForDay = Object.keys(shifts).filter(shiftId => day.format() === moment.unix(shifts[shiftId].endTime).startOf('day').format());
            const shiftsIdsForEmployeeForDay = shiftIdsForEmployee.filter( shiftIdForEmployee => shiftIdsForDay.find( shiftIdsForDay => shiftIdsForDay === shiftIdForEmployee )  )
            shiftsIdsForEmployeeForDay.forEach(
                shiftId => shiftsForEmployeeForDay[shiftId] = shifts[shiftId]
            );
            return shiftsForEmployeeForDay;
        };*/

        const shiftsIdsForEmployee = (shifts,  employeeId) => Object.keys(shifts).filter( shiftId => shifts[shiftId].employeeId === employeeId );

        const shiftIdsForDay = (shifts, day) => Object.keys(shifts).filter(shiftId => day.format() === moment.unix(shifts[shiftId].endTime).startOf('day').format());

        const shiftIdsForEmployeeForDay = (shifts,  employeeId, day) => shiftsIdsForEmployee(shifts,  employeeId).filter( shiftIdForEmployee => shiftIdsForDay(shifts, day).find( shiftIdsForDay => shiftIdsForDay === shiftIdForEmployee ) );

        const rowForUser = (shifts, displayPeriod, employeeId) =>
        {
            return displayPeriod.map(day =>
            {
                if (shiftIdsForEmployeeForDay(shifts, employeeId, day) && shiftIdsForEmployeeForDay(shifts, employeeId, day)[0])
                {
                    //console.log( shiftIdsForEmployeeForDay(shifts, employeeId, day).map( id => state.shifts[id] ) );
                    const shiftIdForDisplay = shiftIdsForEmployeeForDay(shifts, employeeId, day);

                    return (
                        <td key={day.format('DD-MM-YY')} className={"full"}>
                            <div className={"shift-time-container"}><span>{moment.unix(state.shifts[shiftIdForDisplay[0]].startTime).format("HH")}</span> - <span>{moment.unix(state.shifts[shiftIdForDisplay[0]].endTime).format("HH")}</span></div>
                        </td>
                    )
                }
                else
                {
                    return (<td key={day.format('DD-MM-YY')} className={"empty"}></td>)
                }
            });
        };

        const displayPeriod = [ ...state.displayPeriod.by('day') ];

        const employeeIds = [ ...new Set(Object.keys(state.shifts).map( shiftId => state.shifts[shiftId].employeeId )) ];

        const tableRows = employeeIds.map(employeeId => (
            <tr key={employeeId}>
                { rowForUser(state.shifts, displayPeriod, employeeId) }
            </tr>)
        );

        const tableHeader = displayPeriod.map( ment =>
            (<th key={ ment.format('DD-MM-YY')} >
                <div className="day">{ ment.format('ddd') }</div>
                <div className="month-date">
                    <div className="month">{ ment.format('MMM') }</div>
                    <div className="date">{ ment.format('DD') }</div>
                </div>
            </th>)
        );

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
                            { tableRows }
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