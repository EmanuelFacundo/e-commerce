import { faCheck, faEdit, faTimes, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { connect } from "react-redux";
import { Dispatch, AnyAction, bindActionCreators } from "redux";

import Clothes from "../Clothes";
import { deleteCollection, editNameCollection } from "../Stock/reducerStock/action";
import { collectionType } from "../Stock/reducerStock/types";

type propsCollection = {
  collection: collectionType
  deleteCollection: (_id: string) => (dispatch: Dispatch<AnyAction>) => void;
  editNameCollection: (idCollection: string, name: string) => 
    (dispatch: Dispatch<AnyAction>) => void;
}

function Collection(props: propsCollection) {

  const { collection, deleteCollection, editNameCollection } = props
  const [editName, setEditName] = useState(false)
  const [nameCollection, setNameCollection] = useState(collection.name)

  return (
    <div className="collections">
      <div className="menuTitle2">
        <div className="title2">
          {editName ?
            <input
              type="text"
              value={nameCollection}
              onChange={(e) => setNameCollection(e.target.value)}
              autoFocus
            />
            :
            <h2>{collection.name}</h2>
          }
          <span></span>
        </div>
        <div className="buttons">
          {editName ?
            <>
              <button className="check" onClick={() => {
                editNameCollection(collection._id, nameCollection)
                setEditName(!editName)
              }}>
                <FontAwesomeIcon icon={faCheck} />
              </button>
              <button onClick={() => setEditName(!editName)}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </>
            :
            <>
              <button onClick={() => setEditName(!editName)}>
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button onClick={() => {
                deleteCollection(collection._id)
              }}>
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
            </>
          }
        </div>
      </div>
      <Clothes idCollection={collection._id} clothes={collection.clothes} />
    </div>
  )
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => bindActionCreators({
  deleteCollection,
  editNameCollection
}, dispatch)

export default connect(null, mapDispatchToProps)(Collection)