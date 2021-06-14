import React from 'react'
import { AnyAction, bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'

import Collection from '../Collection'

import { showCollections, addCollection } from './reducerStock/action'
import { collectionsType } from './reducerStock/types'

import blusa from "../../static/blusa.webp"
import arara from "../../static/arara.webp"

import './styles.scss'

class Stock extends React.Component<statePropsType, collectionsType> {
  newC = false

  newCollection = {
    name: ''
  }

  constructor(props: statePropsType) {
    super(props)

    this.handlerNewCollection = this.handlerNewCollection.bind(this)
    this.onChangeNewCollection = this.onChangeNewCollection.bind(this)
    this.handlerAddNewCollection= this.handlerAddNewCollection.bind(this)
  }
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
  handlerNewCollection() {
    this.newC = !this.newC
    this.forceUpdate()
  }

  onChangeNewCollection(name: string) {
    this.newCollection.name = name;
  }

  handlerAddNewCollection(){
    this.props.addCollection(this.newCollection)
    this.newCollection.name = ''
    this.newC = !this.newC
    this.props.showCollections()
    this.forceUpdate()
  }

  render() {
    return (
      <div className="estoque">
        <div className="menu">
          <div className="title">
            <h1>Estoque</h1>
            <span />
          </div>
          <div className="buttons">
            <button onClick={() => this.handlerNewCollection()}>
              {this.newC ? 'Cancelar' : 'Nova Coleção'}
              <img src={arara} alt="arara" />
            </button>
            <button>
              <p>Nova Peça <br /> Sem Coleção </p>  <img src={blusa} alt="blusa" />
            </button>
          </div>
        </div>
        {this.newC ?
          <div className="newCollection">
            <input
              type="text"
              placeholder="Nome da coleção..."
              onChange={(e) => this.onChangeNewCollection(e.target.value)}
            />
            <button onClick={() => this.handlerAddNewCollection()}>
              Adicionar
            </button>
          </div> : ''
        }

        {this.renderCollections()}
      </div>
    )
  }
}

type statePropsType = {
  stock?: collectionsType;
  showCollections: () => (dispatch: Dispatch<AnyAction>) => void;
  addCollection: (collection: { name: string }) => (dispatch: Dispatch<AnyAction>) => void;
}

const mapStateToProps = (state: statePropsType) => ({
  stock: state.stock
})

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => bindActionCreators({
  showCollections,
  addCollection
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Stock)