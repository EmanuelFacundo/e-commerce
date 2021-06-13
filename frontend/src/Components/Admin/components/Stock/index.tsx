import React from 'react'
import { AnyAction, bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'

import Collection from '../Collection'

import { showCollections } from './reducerStock/action'
import { collectionsType } from './reducerStock/types'

import blusa from "../../static/blusa.webp"
import arara from "../../static/arara.webp"

import './styles.scss'

class Stock extends React.Component<statePropsType, collectionsType> {

  componentDidMount() {
    this.props.showCollections()
  }

  renderCollections() {
    return this.props.stock?.collections.map((collection, index) => {
      return (
        <section key={index}>
          <Collection collection={collection} />
        </section>
      )
    })
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
          <div className="buttons">
            <button>Nova Coleção <img src={arara} alt="arara" /> </button>
            <button> <p>Nova Peça <br /> Sem Coleção </p>  <img src={blusa} alt="blusa" /> </button>
          </div>
        </div>

        {this.renderCollections()}
      </div>
    )
  }
}

type statePropsType = {
  stock?: collectionsType;
  showCollections: () => (dispatch: Dispatch<AnyAction>) => void;
}

const mapStateToProps = (state: statePropsType) => ({
  stock: state.stock
})

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => bindActionCreators({
  showCollections
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Stock)