import React from 'react'
import { connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import FIELDS from './formFields'
import actionDispatcher from '../../actions'

const SurveyReview = ({ onCancel, formValues, submitSurvey, history}) => {
  const reviewFields = FIELDS.map(({ label, name })=>(
      <div key={name}>
        <label>{label}</label>
        <div>{formValues[name]}</div>
      </div>
    ))

  return(
    <div>
      <h5>Please Confirm Entries</h5>
      {reviewFields}
      <button onClick={onCancel} className="yellow darken-3 btn-flat">
        Back
      </button>
      <button
        className="green btn-flat right"
        onClick={() => submitSurvey(formValues, history)}
      >
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  )
}

const mapStateToProps =(state)=>{
  return {
    formValues: state.form.surveyForm.values
  }
}

const mapDispatchToProps = {
  submitSurvey: actionDispatcher.submitSurvey
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SurveyReview))