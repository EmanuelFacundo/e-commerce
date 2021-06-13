import { clothingType } from '../Stock/reducerStock/types';
import blusaTeste from './blusaTeste.jpg'

import './styles.scss';

type propsClothes = {
  clothes: Array<clothingType>
}

export default function Clothes(props: propsClothes) {

  const renderClothing = () => {
    return props.clothes.map((clothing, index) => {
      console.log(clothing.images)
      return (
        <div key={index} className={`clothes ${index % 2 === 0 ?
          'par' : 'impar'}`}>
          {/* <img src={clothing.images[0].url} alt="" /> */}


        </div>
      )
    })
  }

  return (
    <div className="clothes impar">
      <img src={blusaTeste} alt="blusa" />
      <div className="infos">
        <h1>Blusa simples</h1>
        <p>Cor: branca</p>
        <p>Tipo: blusa</p>
        <p>Quantidade: 3</p>
      </div>
      <div className="buttons">
        {renderClothing()}
      </div>
    </div>
  )
}