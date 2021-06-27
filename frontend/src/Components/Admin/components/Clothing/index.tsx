import { useState } from 'react';
import { Dispatch, AnyAction, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import { faEdit, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { deleteClothing } from "../Stock/reducerStock/action";
import { clothingType } from "../Stock/reducerStock/types";

import './styles.scss'
import NewOrEditClothing from '../NewOrEditClothing';

type propsType = {
  clothing: clothingType;
  index: number;
  idCollection: string;
  deleteClothing: (idC: string, idc: string) =>
    (dispatch: Dispatch<AnyAction>) => void;
}

function Clothing(props: propsType) {

  const { index, clothing, idCollection, deleteClothing } = props
  const [edit, setEdit] = useState(false)
  
  function renderImages() {
    const { colors } = props.clothing
    return colors.map(color => <img src={color.images[0].url} alt={color.color} />)
  }

  function renderColors() {
    const { clothing } = props
    return clothing.colors.map((color, index) => {
      return (
        <div key={index}>
          <p>Cor: {color.color}</p>
          <p>Quantidade: {color.amount}</p>
        </div>
      )
    })
  }

  return (
    <>
      {edit ?
        <NewOrEditClothing />
        :
        <section className={`clothing ${index % 2 === 0 ?
          'par' : 'impar'}`}>
          <div className="infos">
            <section>
              <div className="titleClothing">
                <h1>{clothing.name}</h1>
                <span>
                  <p>Tipo: {clothing.type}</p>
                  <p>Tamanho: {clothing.size}</p>
                </span>
              </div>
              <div className="colors">
                <div className="texts">
                  {renderColors()}
                </div>
                <Carousel className="images" showThumbs={false} showStatus={false}>
                  {renderImages()}
                </Carousel>
              </div>
            </section>
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
  deleteClothing
}, dispatch)

export default connect(null, mapDispatchToProps)(Clothing)