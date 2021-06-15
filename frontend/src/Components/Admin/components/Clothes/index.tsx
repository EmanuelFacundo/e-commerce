import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleLeft, faAngleDoubleRight, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import { Dispatch, AnyAction, bindActionCreators } from 'redux';

import { addClothing, showCollections } from '../Stock/reducerStock/action';
import { clothingType } from '../Stock/reducerStock/types';


import './styles.scss';
import Upload from '../Upload';
import { connect } from 'react-redux';
import { useEffect } from 'react';

type propsClothes = {
  idCollection?: string;
  clothes: Array<clothingType>;
  addClothing: (form: FormData) => (dispatch: Dispatch<AnyAction>) => void;
  showCollections: () => (dispatch: Dispatch<AnyAction>) => void;
}

function Clothes(props: propsClothes) {

  const [addClothing, setAddClothing] = useState(false);
  const [nextAdd, setNextAdd] = useState(false);
  const [disabledAdd, setDisabledAdd] = useState(true);

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [color, setColor] = useState('')
  const [type, setType] = useState('')
  const [amount, setAmount] = useState(0)
  const [size, setSize] = useState('')


  const clothing = `{
    "idCollection": "${props.idCollection}",
    "clothing": {
      "name": "${name}",
      "description": "${description}",
      "color": "${color}",
      "type": "${type}",
      "amount": ${amount},
      "size": "${size}",
      "images": []
    }
  }`

  const files: Array<File> = []
  let [uploadedImages, setUploadedImages] = useState(files)
  const [uploaded, setUploaded] = useState(false)
  const [reset, setReset] = useState(false)

  if (name !== '' && description !== '' && color !== '' && uploaded &&
    type !== '' && amount !== 0 && size !== '' && disabledAdd) {
    setDisabledAdd(!disabledAdd)
  }

  const showCollections = props.showCollections

  useEffect(() => {
    showCollections()
    return
  }, [reset, showCollections])

  const handlerUpload = (files: File[]) => {
    uploadedImages = files
    setUploadedImages(files)
    setUploaded(!!uploadedImages.length)
  }

  function resetClothing() {
    //clothing
    setName('')
    setDescription('')
    setColor('')
    setType('')
    setAmount(0)
    setSize('')
    setUploadedImages([])
    setUploaded(false)
    //addClothing
    setAddClothing(false)
    setNextAdd(false)
    setDisabledAdd(true)
  }

  function onClickAddClothing() {
    const form = new FormData()

    uploadedImages.forEach((file) => {
      form.append('file', file)
    })

    let json = JSON.stringify(clothing)
    form.append('body', JSON.parse(json))
    props.addClothing(form)
    resetClothing()

  }

  function handlerAddClothing() {
    return (
      <div className="addClothing">
        {!addClothing ?
          <button onClick={() => setAddClothing(!addClothing)}>
            <FontAwesomeIcon icon={faPlus} />
          </button> :
          <div className="newClothing">
            <div className={`upload ${uploaded && 'uploaded'}`}>
              <Upload onUpload={handlerUpload} uploaded={uploaded} />
            </div>
            <div className="news">
              {!nextAdd ? (
                <>
                  <input
                    className="name"
                    type="text"
                    placeholder="Nome da peça"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <p>
                    Cor: <input
                      type="text"
                      placeholder="Cor"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                    />
                  </p>
                  <p>
                    Tipo: <input
                      type="text"
                      placeholder="Tipo"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                    />
                  </p>
                  <p>
                    Tamanho: <input
                      type="text"
                      placeholder="Tamanho"
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                    />
                  </p>
                  <p>
                    Quantidade: <input
                      className="number"
                      type="number"
                      placeholder="0"
                      value={amount}
                      min="0"
                      onChange={(e) => setAmount(parseInt(e.target.value))}
                    />
                    <button onClick={() => setNextAdd(!nextAdd)}>
                      <FontAwesomeIcon icon={faAngleDoubleRight} />
                    </button>
                  </p>
                </>
              ) : (
                <>
                  <h2>Descrição</h2>
                  <textarea
                    name="description"
                    cols={30} rows={10}
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    placeholder="Descrição..."
                  ></textarea>
                  <button onClick={() => setNextAdd(!nextAdd)}>
                    <FontAwesomeIcon icon={faAngleDoubleLeft} />
                  </button>
                </>
              )}
            </div>
            <div className="buttons">
              <button className="add" disabled={disabledAdd} onClick={() => {
                setReset(!reset)
                onClickAddClothing()
              }}>
                <FontAwesomeIcon icon={faPlus} />
              </button>
              <button className="closed" onClick={() => setAddClothing(!addClothing)}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
          </div>
        }

      </div >
    )

  }

  const renderClothing = () => {
    return props.clothes.map((clothing, index) => {
      return (
        <section key={index} className={`clothing ${index % 2 === 0 ?
          'par' : 'impar'}`}>
          <img src={clothing.images[0]?.url} alt={clothing.images[0]?.name} />
          <div className="infos">
            <h1>{clothing.name}</h1>
            <p>Cor: {clothing.color}</p>
            <p>Tipo: {clothing.type}</p>
            <p>Tamanho: {clothing.size}</p>
            <p>Quantidade: {clothing.amount}</p>
          </div>
        </section>
      )
    })
  }

  return props.clothes.length === 0 ?
    (
      <div className="clothes">
        {handlerAddClothing()}
      </div>
    ) :
    (
      <div>
        <div className="clothes">
          {renderClothing()}
          {handlerAddClothing()}
        </div>
      </div>
    )
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => bindActionCreators({
  addClothing,
  showCollections
}, dispatch)

export default connect(null, mapDispatchToProps)(Clothes)