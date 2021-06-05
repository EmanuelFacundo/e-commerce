import Axios from 'axios'
import { Dispatch } from 'react'
import { AnyAction } from 'redux'

const DB = process.env.REACT_APP_DATABASE_LUSS 

export function showCollections(){

  return (dispatch:Dispatch<AnyAction>) => {
    Axios.get(`${DB}/collection/showCollections`)
      .then(resp => {
        dispatch({
          type: 'SHOW_COLLECTIONS',
          payload: resp.data
        })
      })
      .catch(err => {
        console.log(err.message)
      })
  }
}