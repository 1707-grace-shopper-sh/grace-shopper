
import axios from 'axios'
import history from '../history'

const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

const defaultUser = {}

const getUser = user => {type: GET_USER, user}

const me = () => {
  function meThunk() {
  //Look in   boilermaker==> client/store/user
  }
}