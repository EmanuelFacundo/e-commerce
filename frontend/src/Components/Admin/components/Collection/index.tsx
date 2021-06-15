import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { Dispatch, AnyAction, bindActionCreators } from "redux";

import Clothes from "../Clothes";
import { deleteCollection, showCollections } from "../Stock/reducerStock/action";
import { collectionType } from "../Stock/reducerStock/types";

type propsCollection = {
  collection: collectionType
  deleteCollection: (_id: string) => (dispatch: Dispatch<AnyAction>) => void;
  showCollections: () => (dispatch: Dispatch<AnyAction>) => void;
}

function Collection(props: propsCollection) {

  const {collection, deleteCollection, showCollections} = props
  const [toggleDeleted, setToggleDeleted] = useState(false)
  useEffect(() => {
    showCollections()
  },[toggleDeleted,showCollections]);
  return (
    <div className="collections">
      <div className="menuTitle2">
        <div className="title2">
          <h2>{collection.name}</h2>
          <span></span>
        </div>
        <button onClick={() => {
          setToggleDeleted(!toggleDeleted)
          deleteCollection(collection._id)
        }}>
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      </div>
      <Clothes idCollection={collection._id} clothes={collection.clothes} />
    </div>
  )
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => bindActionCreators({
  deleteCollection,
  showCollections
}, dispatch)

export default connect(null, mapDispatchToProps)(Collection)