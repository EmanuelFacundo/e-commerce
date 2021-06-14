import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import { faImages } from '@fortawesome/free-regular-svg-icons'

import { clothingType } from '../Stock/reducerStock/types';


import './styles.scss';
import { useState } from 'react';

type propsClothes = {
  clothes: Array<clothingType>
}

export default function Clothes(props: propsClothes) {

  const [addClothing, setAddClothing] = useState(false);


  function handlerAddClothing() {
    return (
      <div className="addClothing">
        {!addClothing ?
          <button onClick={() => setAddClothing(!addClothing)}>
            <FontAwesomeIcon icon={faPlus} />
          </button> :
          <div className="newClothing">
            <div className="dropImage">
              <FontAwesomeIcon icon={faImages} />
            </div> {/*temp*/}
            <div className="news">
              <input className="name" type="text" placeholder="Nome da peça" />
              <p>Cor: <input type="text" placeholder="Cor" /> </p>
              <p>Tipo: <input type="text" placeholder="Tipo" /> </p>
              <p>Quantidade: <input className="number" type="number" placeholder="0" /> </p>
            </div>
            <div className="buttons">
              <button className="add">
                <FontAwesomeIcon icon={faPlus} />
              </button>
              <button className="closed" onClick={() => setAddClothing(!addClothing)}>
                <FontAwesomeIcon icon={faTimes}/>
              </button>
            </div>
          </div>
        }

      </div>
    )

  }

  const renderClothing = () => {
    return props.clothes.map((clothing, index) => {
      return (
        <section key={index} className={`clothing ${index % 2 === 0 ?
          'impar' : 'impar'}`}>
          <img src={clothing.images[0].url} alt={clothing.images[0].name} />
          <div className="infos">
            <h1>{clothing.name}</h1>
            <p>Cor: {clothing.color}</p>
            <p>Tipo: {clothing.type}</p>
            <p>Quantidade {clothing.amount}</p>
          </div>
        </section>
      )
    })
  }
  console.log(addClothing)
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