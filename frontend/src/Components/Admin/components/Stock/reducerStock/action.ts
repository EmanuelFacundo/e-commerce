import Axios from 'axios'
import { Dispatch } from 'react'
import { AnyAction } from 'redux'

const DB = process.env.REACT_APP_DATABASE_LUSS

export function showCollections() {

  return (dispatch: Dispatch<AnyAction>) => {
    Axios.get(`${DB}/collection/showCollections`)
      .then(resp => {
        dispatch({
          type: 'SHOW_COLLECTIONS',
          payload: resp.data
        })
      })
      .catch(err => {
        alert(err)
      })
  }
}

export function addCollection(collection: { name: string }) {
  return (dispatch: Dispatch<AnyAction>) => {
    Axios.post(`${DB}/collection/createCollection`, collection)
      .then(resp => {
        dispatch({
          type: 'ADD_COLLECTION',
          payload: resp.data
        })
      })
      .catch(err => {
        alert(err.message)
      })
  }
}

export function deleteCollection(_id: string) {
  return (dispatch: Dispatch<AnyAction>) => {
    Axios.put(`${DB}/collection/deleteCollection`, { _id })
      .then(resp => {
        dispatch({
          type: 'DELETE_COLLECTION',
          payload: resp.data
        })
      })
      .catch(err => {
        alert(err.message)
      })
  }
}

export function addClothing(form: FormData) {

  return (dispatch: Dispatch<AnyAction>) => {
    Axios.put(`${DB}/collection/addClothing`, form)
      .then(resp => {
        dispatch({
          type: 'SHOW_COLLECTIONS',
          payload: resp.data
        })
        alert("Roupa Adicionada com sucesso!")
      })
      .catch(err => {
        alert(err.message)
      })
  }
}