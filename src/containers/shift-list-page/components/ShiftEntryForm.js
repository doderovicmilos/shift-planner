import React, {Component} from 'react';
import { Field, reduxForm, submit } from 'redux-form'

const validator = values => {

    const errors = {}

    if ( Number(values.startTime) > Number(values.endTime) ) {
        errors.startEndTime = 'Shift end time value must be higher than shift start time value!'
    }

    if ( Number(values.startTime) === Number(values.endTime) ) {
        errors.startEndTime = 'Shift start time value must not equal shift end time value!'
    }

    return errors
};


const minValue = min => value =>
     value && value < min ? `Must be at least ${min}` : undefined;

const maxValue = max => value =>
     value && value > max ? `Must be at least ${max}` : undefined;


const minValue0 = minValue(0);

const maxValue24 = maxValue(24);

const ShiftEntryForm = props => {

    const {handleSubmit, pristine, reset, submitting } = props;

    return (
        <div className="form-container" style={{
            backgroundColor: "#ffffff",
            padding: "10px",
            border: "solid 1px #3333",
            width: "400px"
        }}>
            <form onSubmit={handleSubmit}>
                <div className="form-inline">
                    <div className="form-group col-xs-4 col-md-4">
                        <label>Start</label>
                        <Field
                            label="Start"
                            id="startDate"
                            className="form-control form-control-sm"
                            name="startTime"
                            component="input"
                            type="number"
                            min="0"
                            max="24"
                            validate={[minValue0, maxValue24]}
                            placeholder="start time"
                            style={{
                                width: "100%"
                            }}
                        />
                    </div>
                    <div className="form-group col-xs-4 col-md-4">
                        <label>End</label>
                        <Field
                            id="endDate"
                            className="form-control form-control-sm"
                            name="endTime"
                            component="input"
                            type="number"
                            min="0"
                            max="24"
                            validate={[minValue0, maxValue24]}
                            placeholder="end time"
                            style={{
                                width: "100%"
                            }}
                        />
                    </div>
                    <div className="form-group col-xs-4 col-md-4" style={{
                        display: "flex",
                        justifyContent: "space-around"

                    }}>
                        <button type="submit"
                                disabled={submitting}
                                style={{marginTop: '26px'}}
                                className="btn btn-primary btn-sm"
                        >
                            Submit
                        </button>
                    </div>
                </div>
                <Field name="startEndTime"
                    component={ ({
                      input,
                      label,
                      type,
                      meta: { touched, error, warning }
                    }) => (
                        <div style={{minheight: '5px', fontSize: '13px', paddingTop:'7px', color: 'red' }}>
                            { error && (<span>{error}</span>) }
                        </div>
                    ) }
                />
            </form>
            <a
                type="cancel"
                onClick={ props.onCancel.bind(this) }
                style={{
                    position: "absolute",
                    top: "0px",
                    right: "5px",
                    backgroundColor: "transparent",
                    border: "none",
                    fontWeight: 700,
                    fontSize: "22px",
                    width: "20px",
                    lineHeight: 1.2
                }}
            >
                &times;
            </a>
            {/*{touched &&*/}
            {/*((error && <span>{error}</span>) ||*/}
            {/*(warning && <span>{warning}</span>))}*/}
        </div>
    )
}


export default reduxForm({
  form: 'shiftEntryForm',
  validate: validator
})(ShiftEntryForm)

