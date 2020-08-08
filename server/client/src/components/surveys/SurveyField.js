import React from 'react'

const SurveyField = ({ input, label, meta }) => {
  //console.log(meta)
return(
  <div>
    <label>{label}</label>
    <input style={{ marginBottom:'5px' }} {...input }/>
    <div className="red-text" style={{ marginBottom: '20px' }}>
      {meta.touched && meta.error}
    </div>
  </div>
)
}
export default SurveyField