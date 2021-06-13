import { clothingType } from '../Stock/reducerStock/types';

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
          <img src={clothing.images[0].url} alt={clothing.images[0].name} />
          <div className="infos">
            <h1>{clothing.name}</h1>
            <p>Cor: {clothing.color}</p>
            <p>Tipo: {clothing.type}</p>
            <p>Quantidade {clothing.amount}</p>
          </div>
        </div>
      )
    })
  }

  return props.clothes[0].name === '' ? <h1>Carregando...</h1> :
    (
      <div>
        {renderClothing()}
      </div>
    )
}