import { actionStockType, collectionsType } from './types';

const INITIAL_STATE = {
  collections: [{
    name: '',
    date: '',
    clothes: [{
      name: '',
      image: '',
      description: '',
      color: '',
      type: '',
      amount: 0,
      size: ''
    }]
  }]
}

export default function reducerStock(state:collectionsType = INITIAL_STATE, action:actionStockType) {
  switch (action.type) {
    case 'SHOW_COLLECTIONS': 
      return {...state, collections: action.payload.collections}

    default: 
      return state
  }

}