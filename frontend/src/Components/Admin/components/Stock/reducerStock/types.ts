export type actionStockType = {
  type: string;
  payload: { collections: Array<collectionType>} ;
}

export type collectionsType = {
  collections: Array<collectionType>
}

export type collectionType = {
  _id: string;
  name: string;
  date: string;
  clothes: Array<clothingType>
}

export type clothingType = {
  _id: string;
  name: string;
  images: Array<image>;
  description: string;
  color: string;
  type: string;
  amount: number;
  size: string;
}

export type image = {
  name: string;
  size: number;
  key: string;
  url: string;
  createdAt: string;
}