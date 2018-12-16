import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from './shiftListActions'
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import Popover from 'react-popover';
import ShiftEntryForm from './components/ShiftEntryForm'
const moment = extendMoment(Moment)


class ShiftListPage extends Component {

    componentWillMount()
    {
        this.props.actions.loadShifts();
    }

    handlePeriodButtonClick(args)
    {
        this.props.actions.changeDisplayPeriod(args);
    }

    handleShiftPlaceholderClick(args)
    {
        this.props.actions.selectShift(args)
    }

    handleFormSubmit(data)
    {
        const { shiftId, day, employeeId } = this.props.state.selectedShift;
        const startTime = day.clone().hours(data.startTime).unix();
        const endTime = day.clone().hours(data.endTime).unix();
        this.props.actions.createEditShift({ shiftId, employeeId, startTime, endTime });
    }

    handleFormCancel()
    {
        this.props.actions.selectShift({})
    }

    render()
    {
        const { state, actions } = this.props;

        const shiftIdsForEmployeeForDay = (shifts,  employeeId, day) => Object.keys(shifts).filter( shiftId => shifts[shiftId].employeeId === employeeId && moment.unix(shifts[shiftId].endTime).startOf('day').isSame(day) );

        const rowForUser = (shifts, displayPeriod, employeeId) =>
        {
            return displayPeriod.map(day =>
            {
                if (shiftIdsForEmployeeForDay(shifts, employeeId, day) && shiftIdsForEmployeeForDay(shifts, employeeId, day)[0])
                {
                    const shiftIdForDisplay = shiftIdsForEmployeeForDay(shifts, employeeId, day);

                    console.log(((state.shifts[shiftIdForDisplay[0]].endTime - state.shifts[shiftIdForDisplay[0]].startTime)/864));

                    return (
                        <td key={day.format('DD-MM-YY')} className={"full"}>
                            <Popover
                                body={(<ShiftEntryForm
                                    onSubmit={ this.handleFormSubmit.bind(this) }
                                    enableReinitialise={ true }
                                    initialValues = { state.selectedShift }
                                    onCancel = { this.handleFormCancel.bind(this) }
                                />)}
                                isOpen={ state.selectedShift && state.selectedShift.day && state.selectedShift.employeeId && state.selectedShift.employeeId === employeeId && state.selectedShift.day.isSame(day) }
                            >
                                <div className={"shift-time-container"}
                                     style = {{ position: "relative" }}
                                     onClick={
                                         this.handleShiftPlaceholderClick.bind(this,
                                         {
                                             shiftId: shiftIdForDisplay[0],
                                             day,
                                             employeeId,
                                             startTime: moment.unix(state.shifts[shiftIdForDisplay[0]].startTime).hours(),
                                             endTime: moment.unix(state.shifts[shiftIdForDisplay[0]].endTime).hours()
                                         })
                                     }
                                >
                                    <span>{moment.unix(state.shifts[shiftIdForDisplay[0]].startTime).format("HH")}</span>
                                     -
                                    <span>{moment.unix(state.shifts[shiftIdForDisplay[0]].endTime).format("HH")}</span>
                                    <div className={"background"}
                                        style = {{
                                            position: "absolute",
                                            top: 0,
                                            width: (state.shifts[shiftIdForDisplay[0]].endTime - state.shifts[shiftIdForDisplay[0]].startTime)/864 + "%",
                                            left: ( state.shifts[shiftIdForDisplay[0]].startTime - moment(day).startOf('day').unix() )/864 + "%",
                                            height: "100%",
                                            backgroundColor: "darkseagreen",
                                            zIndex: "-1"
                                        }}
                                    />
                                </div>
                            </Popover>
                        </td>
                    )
                }
                else
                {
                    return (
                        <td key={day.format('DD-MM-YY')} className={"empty"}>
                            <Popover
                                body={(<ShiftEntryForm
                                    onSubmit={ this.handleFormSubmit.bind(this) }
                                    enableReinitialise={ true }
                                    initialValues = {  state.selectedShift }
                                    onCancel = { this.handleFormCancel.bind(this) }
                                />)}
                                isOpen={state.selectedShift && state.selectedShift.day && state.selectedShift.employeeId && state.selectedShift.employeeId === employeeId && state.selectedShift.day.isSame(day) }
                            >
                                <div className={"shift-time-container"}
                                     onClick={ this.handleShiftPlaceholderClick.bind(this,
                                         {
                                         shiftId: null,
                                         day,
                                         employeeId,
                                         startTime: moment().startOf('day').hours(8).hours(),
                                         endTime: moment().startOf('day').hours(16).hours()
                                     })}
                                > -
                                </div>
                            </Popover>
                        </td>
                    )
                }
            });
        };

        const displayPeriod = [ ...state.displayPeriod.by('day') ];

        //const employeeIds = [ ...new Set(Object.keys(state.shifts).map( shiftId => state.shifts[shiftId].employeeId )) ];

        const employeeIds = [ 1, 2, 3, 4, 5 ];

        const tableRows = employeeIds.map(employeeId => (
            <tr key={employeeId}>
                { rowForUser(state.shifts, displayPeriod, employeeId) }
            </tr>)
        );

        const tableHeader = displayPeriod.map( day =>
            (<th key={ day.format('DD-MM-YY')} className =  { day.isSame(moment().startOf('day')) ? "today" : "" } >
                <div className="day-month-date">
                    <div className="day">{ day.format('ddd') }</div>
                    <div className="month-date">
                        <div className="month">{ day.format('MMM') }</div>
                        <div className="date">{ day.format('DD') }</div>
                    </div>
                </div>
            </th>)
        );

        return (
            <div className="list-page">

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

                <div className="add-remove-button-groups">
                    <div className="btn-group left">
                        <button className="btn btn-sm" onClick={ this.handlePeriodButtonClick.bind(this, {direction: "left", value: 1}) }>+</button>
                        <button className="btn btn-sm" onClick={ this.handlePeriodButtonClick.bind(this, {direction: "left", value:-1}) }
                                                       disabled={ displayPeriod.length <= 1 }>-</button>
                    </div>
                    <div className="btn-group right">
                        <button className="btn btn-sm" onClick={ this.handlePeriodButtonClick.bind(this, {direction: "right", value:-1}) }
                                                       disabled={ displayPeriod.length <= 1 }>-</button>
                        <button className="btn btn-sm" onClick={ this.handlePeriodButtonClick.bind(this, {direction: "right", value: 1}) }>+</button>
                    </div>
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

