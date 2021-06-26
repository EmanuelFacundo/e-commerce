import { actionStockType, collectionsType } from './types';

const INITIAL_STATE = {
  collections: [{
    _id: '',
    name: '',
    date: '',
    clothes: [{
      _id: '',
      name: '',
      description: '',
      colors: {
        color: '',
        images: [{
          name: '',
          size: 0,
          key: '',
          url: '',
          createdAt: '',
        }]
      },
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