import React from 'react'
import { reduxForm, Field } from 'redux-form'
import SurveyField from './SurveyField'
import { Link } from 'react-router-dom'
import validateEmails from '../../utils/validateEmails'
import FIELDS from './formFields'

const SurveyForm = ({ handleSubmit, onSurveySubmit }) => {

  const renderFields = () =>
    FIELDS.map( ({name, label})=>
            <Field
              key={name}
              type="text"
              name={name}
              component={SurveyField}
              label={label}
          />)
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSurveySubmit)}
      >
        {renderFields()}
        <Link to="/surveys" className="red btn-flat white-text">Cancel</Link>
        <button type="submit" className="teal btn-flat right white-text">
          Next
          <i className="material-icons right">done</i>
        </button>
      </form>
    </div>
  )
}

const validate = (values) => {
  console.log(values)

  const errors = {}
  errors.recipients = validateEmails(values.recipients || '')
  FIELDS.forEach(({ name })=>{
    if(!values[name]) {
      errors[name] = `You must provide ${[name]}`
    }
  })
  return errors
}

export default reduxForm({
  validate,
  form: 'surveyForm',
  destroyOnUnmount: false
})(SurveyForm)