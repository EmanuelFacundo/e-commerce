import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import Clothing from '../Clothing';
import NewOrEditClothing from '../NewOrEditClothing';
import { clothingType } from '../Stock/reducerStock/types';

import './styles.scss';

type propsClothes = {
  idCollection: string;
  clothes: Array<clothingType>;
}

function Clothes(props: propsClothes) {

  const [addClothing, setAddClothing] = useState(false);

  function handlerAddClothing() {
    return (
      <div className="addClothing">
        <NewOrEditClothing />
        {!addClothing ?
          <button onClick={() => setAddClothing(!addClothing)}>
            <FontAwesomeIcon icon={faPlus} />
          </button> 
          :
          <NewOrEditClothing />
        }
      </div >
    )

  }

  const renderClothing = () => {
    const { idCollection } = props
    return props.clothes.map((clothing, index) => {
      return (
        <Clothing key={index}
          index={index} 
          clothing={clothing} 
          idCollection={idCollection} 
        />
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

export default Clothes