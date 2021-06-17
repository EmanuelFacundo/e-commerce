import { useState } from 'react';
import { Dispatch, AnyAction, bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { faEdit, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleLeft, faAngleDoubleRight, faTimes } from '@fortawesome/free-solid-svg-icons';

import { deleteClothing, editClothing } from "../Stock/reducerStock/action";
import { clothingType } from "../Stock/reducerStock/types";

import './styles.scss'

type propsType = {
  clothing: clothingType;
  index: number;
  idCollection: string;
  deleteClothing: (idC: string, idc: string) =>
    (dispatch: Dispatch<AnyAction>) => void;
  editClothing: (clothing: clothingType, idCollection: string) =>
    (dispatch: Dispatch<AnyAction>) => void;
}

function Clothing(props: propsType) {

  const { index, clothing, idCollection, deleteClothing, editClothing } = props
  const [edit, setEdit] = useState(false)
  const [nextEdit, setNextEdit] = useState(false)

  const [name, setName] = useState(clothing.name)
  const [description, setDescription] = useState(clothing.description)
  const [color, setColor] = useState(clothing.color)
  const [type, setType] = useState(clothing.type)
  const [amount, setAmount] = useState(clothing.amount)
  const [size, setSize] = useState(clothing.size)
  const newClothing: clothingType = {
    _id: clothing._id,
    name,
    description,
    color,
    type,
    amount,
    size,
    images: clothing.images
  }
  function reset() {
    setName(clothing.name)
    setDescription(clothing.description)
    setColor(clothing.color)
    setType(clothing.type)
    setAmount(clothing.amount)
    setSize(clothing.size)
    setNextEdit(false)
    setEdit(false)
  }

  return (
    <>
      {edit ?
        <section className={`clothing ${index % 2 === 0 ?
          'par' : 'impar'}`}>
          <div className="infos">
            <img src={clothing.images[0]?.url} alt={clothing.images[0]?.name} />
            <div className="text">
              {!nextEdit ? (
                <>
                  <input
                    className="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <p>
                    Cor: <input
                      type="text"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                    />
                  </p>
                  <p>
                    Tipo: <input
                      type="text"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                    />
                  </p>
                  <p>
                    Tamanho: <input
                      type="text"
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                    />
                  </p>
                  <p>
                    Quantidade: <input
                      className="number"
                      type="number"
                      value={amount}
                      min="0"
                      onChange={(e) => setAmount(parseInt(e.target.value))}
                    />
                    <button onClick={() => setNextEdit(!nextEdit)}>
                      <FontAwesomeIcon icon={faAngleDoubleRight} />
                    </button>
                  </p>
                </>
              ) : (
                <>
                  <h2>Descrição</h2>
                  <textarea
                    name="description"
                    cols={30} rows={4}
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                  ></textarea>
                  <button onClick={() => setNextEdit(!nextEdit)}>
                    <FontAwesomeIcon icon={faAngleDoubleLeft} />
                  </button>
                </>
              )}
            </div>
            <div className="buttonsEdit">
              <button className="edit" onClick={() => {
                editClothing(newClothing, idCollection)
                setNextEdit(false)
                setEdit(false)
              }}>
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button onClick={() => reset()}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
          </div>
        </section>
        :
        <section className={`clothing ${index % 2 === 0 ?
          'par' : 'impar'}`}>
          <div className="infos">
            <img src={clothing.images[0]?.url} alt={clothing.images[0]?.name} />
            <div className="text">
              <h1>{clothing.name}</h1>
              <p>Cor: {clothing.color}</p>
              <p>Tipo: {clothing.type}</p>
              <p>Tamanho: {clothing.size}</p>
              <p>Quantidade: {clothing.amount}</p>
            </div>
          </div>
          <div className="buttons">
            <button onClick={() => setEdit(!edit)}>
              <FontAwesomeIcon icon={faEdit} />
            </button>
            <button onClick={() => deleteClothing(idCollection, clothing._id)}>
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </div>
        </section>
      }
    </>
  )
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => bindActionCreators({
  deleteClothing,
  editClothing
}, dispatch)

export default connect(null, mapDispatchToProps)(Clothing)