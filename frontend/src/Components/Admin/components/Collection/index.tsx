import Clothes from "../Clothes";
import { collectionType } from "../Stock/reducerStock/types";

type propsCollection = {
  collection: collectionType
}

export default function Collection(props: propsCollection){

  const collection = props.collection
  return (
    <div className="collections">
      <div className="title2">
        <h2>{collection.name}</h2>
        <span></span>
      </div>
      <Clothes clothes={collection.clothes}/>
    </div>
  )
}