import React from 'react'
import { Field, reduxForm } from 'redux-form'
//import submit from './submit'

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div className="form-group">
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} className="form-control"/>
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)


const RemoteSubmitForm = props => {
  const { error, handleSubmit } = props
  return (
    <form onSubmit={handleSubmit} className="form-inline">
      <Field
        name="username"
        type="text"
        component={renderField}
        label="Username"
      />
      <Field
        name="password"
        type="password"
        component={renderField}
        label="Password"
      />
      {error && <strong>{error}</strong>}
    </form>
  )
}

export default reduxForm({
  form: 'simpleForm', // a unique identifier for this form
})(RemoteSubmitForm)