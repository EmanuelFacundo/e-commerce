export type actionStockType = {
  type: string;
  payload: { collections: Array<collectionType>} ;
}

export type collectionsType = {
  collections: Array<collectionType>
}

export type collectionType = {
  name: string;
  date: string;
  clothes: Array<clothingType>
}

export type clothingType = {
  name: string;
  image: string;
  description: string;
  color: string;
  type: string;
  amount: number;
  size: string;
}