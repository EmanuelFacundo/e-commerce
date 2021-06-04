import Clothes from "../Clothes";

import './styles.scss'

export default function Stock() {
  return (
    <div className="estoque">
      <div className="menu">
        <div className="title">
          <h1>Estoque</h1>
          <span />
        </div>
        <div className="btns">

        </div>
      </div>

      <div className="collections">
        <div className="title2">
          <h2>Coleção teste</h2>
          <span />
        </div>
        <Clothes />
      </div>
    </div>
  )
}