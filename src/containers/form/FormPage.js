import React, { Component } from 'react'
import SimpleForm from '../../components/simpleForm'
import { connect } from 'react-redux'
import { submit } from 'redux-form'

import { bindActionCreators } from 'redux'
import * as actions from '../../modules/formPage'



class FormPage extends Component {

  handleSubmit(data) {



    this.props.actions.save(data);




  }

  render(){
    return (
      <div className="row">
        <h1>Form Page</h1>
        <SimpleForm
          onSubmit = { (values) => this.handleSubmit(values) }
        />
        <button
          className="btn btn-lg"
          type='button'
          onClick={ () => this.props.dispatch(submit('simpleForm')) }
        >
          Submit
        </button>
      </div>
    )
  }
}


const mapStateToProps = ({ formPage }) => ({
  state: formPage
});


const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
    dispatch
  };
}

// const mapDispatchToProps = dispatch =>
//   bindActionCreators(
//     {
//       save,
//       dispatch
//     },
//     dispatch
//   )


export default connect(mapStateToProps, mapDispatchToProps)(FormPage)