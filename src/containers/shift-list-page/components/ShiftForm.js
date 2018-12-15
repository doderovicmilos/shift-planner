import React from 'react'
import { Field, reduxForm } from 'redux-form'


const ShiftForm = props => {

  const { handleSubmit, pristine, reset, submitting } = props

  return (
      <div className="form-container" style={{
          backgroundColor: "#ffffff",
          padding: "10px",
          border: "solid 1px #3333"
      }}>
          <form onSubmit={handleSubmit}>
              <div className="form-inline">
                  <div className="form-group col-xs-4 col-md-4">
                      <label>Start</label>
                      <Field
                          id="startDate"
                          className="form-control form-control-sm"
                          name="start"
                          component="input"
                          type="number"
                          placeholder="start time"
                      />
                  </div>
                  <div className="form-group col-xs-4 col-md-4">
                      <label>End</label>
                      <Field
                          id="endDate"
                          className="form-control form-control-sm"
                          name="end"
                          component="input"
                          type="number"
                          placeholder="end time"
                      />
                  </div>
                  <div className="form-group col-xs-4 col-md-4" style={{
                      display: "flex",
                      justifyContent: "center"
                  }}>
                  <button type="submit" disabled={pristine || submitting} style={{ marginTop: '26px' }}>
                      Submit
                  </button>
                  </div>
              </div>
          </form>
      </div>
  )
}

export default reduxForm({
  form: 'shiftForm' // a unique identifier for this form
})(ShiftForm)