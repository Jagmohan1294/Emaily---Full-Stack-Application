import React, { useState, useEffect} from 'react'
import { connect } from 'react-redux'
import actionDispatcher from '../../actions'

const SurveyList = ({ fetchSurveys, surveys, deleteSurvey }) => {
  useEffect( ()=>{
    fetchSurveys()
  },[])
 function onDeleteSurvey(survey) {
   deleteSurvey(survey)
 }
  function renderSurveys() {
    return !surveys.length ? (
      <div className="center"> Loading Survey List...
        <div className="preloader-wrapper big active">
          <div className="spinner-layer spinner-blue-only">
            <div className="circle-clipper left">
              <div className="circle"/>
            </div>
            <div className="gap-patch">
              <div className="circle"/>
            </div>
            <div className="circle-clipper right">
              <div className="circle"/>
            </div>
          </div>
        </div>
      </div>
    ):
     surveys.reverse().map(survey=>{
      return(
        <div className="card darken-1" key={survey._id}>
          <div className="card-content">
            <span className="card-title">{survey.title}</span>
            <p>
              {survey.body}
            </p>
            <p className="right">
              Sent On: {new Date(survey.dateSent).toLocaleDateString()}
            </p>
          </div>
          <div className="card-action">
            <a>Yes: {survey.yes}</a>
            <a>No: {survey.no}</a>
            <div>
              <a className="waves-effect waves-light btn" onClick={()=>onDeleteSurvey(survey)}>
                <i className="large material-icons">delete</i>
              </a>
            </div>
          </div>
        </div>
      )
    })
  }
  //console.log(surveys, loading)
  return renderSurveys()


}
const mapStateToProps =(state)=>{
  return {
    surveys: state.surveys
  }
}

const mapDispatchToProps = {
  fetchSurveys: actionDispatcher.fetchSurveys,
  deleteSurvey: actionDispatcher.deleteSurvey
}

export default connect(mapStateToProps,mapDispatchToProps )(SurveyList)