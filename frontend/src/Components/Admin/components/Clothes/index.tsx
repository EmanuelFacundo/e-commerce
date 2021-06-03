import blusaTeste from './blusaTeste.jpg'

import './styles.scss';

export default function Clothes() {
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

      </div>
    </div>
  )
}