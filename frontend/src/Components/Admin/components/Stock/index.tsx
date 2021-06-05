import React from 'react'
import { AnyAction, bindActionCreators , Dispatch } from 'redux'
import { connect } from 'react-redux'

import { showCollections } from './reducerStock/action'
import { collectionsType } from './reducerStock/types'

import Clothes from "../Clothes";

import './styles.scss'

class Stock extends React.Component<statePropsType, collectionsType> {

  componentDidMount() {
    this.props.showCollections()
  }

  render() {

    console.log(this.props.stock?.collections)
    return (
      <div className="estoque">
        <div className="menu">
          <div className="title">
            <h1>Estoque</h1>
            <span />
          </div>
          <div className="btns">
            
          </div>
        </div>
  
        <div className="collections">
          <div className="title2">
            <h2>Coleção teste</h2>
            <span />
          </div>
          <Clothes />
        </div>
      </div>
    )
  }
}

type statePropsType = {
  stock?: collectionsType;
  showCollections: () => (dispatch: Dispatch<AnyAction>) => void;
}

const mapStateToProps = (state:statePropsType) => ({
  stock: state.stock
})

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => bindActionCreators({
  showCollections
}, dispatch)

export default connect(mapStateToProps,mapDispatchToProps)(Stock)