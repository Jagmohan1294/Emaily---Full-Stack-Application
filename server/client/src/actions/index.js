import axios from 'axios'
import { FETCH_USER, FETCH_SURVEYS } from './types'

const fetchUser =() => async (dispatch) => {
   // axios
   //   .get('/api/current-user')
   //   .then(res => dispatch({
   //     type: FETCH_USER,
   //     payload: res
   //   }))
  const res = await axios.get('/api/current-user')
  dispatch({ type: FETCH_USER, payload: res.data })
  }
const handleStripeToken =  (token) => async dispatch =>{
  const res = await axios.post('/api/stripe', token)
  dispatch({ type:FETCH_USER, payload: res.data })
}

const submitSurvey = (values, history) => async dispatch => {
  const res = await axios.post('/api/surveys', values)
  history.push('/surveys')
  dispatch({type: FETCH_USER, payload: res.data})

}

const fetchSurveys = () => async dispatch => {
  const res = await axios.get('/api/surveys')
  dispatch({ type: FETCH_SURVEYS, payload: res.data })
}

const deleteSurvey = (survey) => async dispatch => {
  console.log(survey)
  const res = await axios.delete(`/api/surveys/${survey._id}/${survey._user}`)
  dispatch({ type: FETCH_SURVEYS, payload: res.data })
  console.log(res.data)
}
export default {
  fetchUser,
  handleStripeToken,
  submitSurvey,
  fetchSurveys,
  deleteSurvey
}