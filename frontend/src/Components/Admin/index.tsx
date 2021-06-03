import Stock from './components/Stock'
import luss from './static/luss.webp'

import './styles.scss'

export default function Admin() {
  return (
    <>
      <header className="headadmin">
        <a href="adminluss"><img src={luss} alt="Luss" /></a>
        <h1>Painel do Admin Luss</h1>
        <div className="buttons">
         <a href="#estoque">Estoque</a>
         <a href="#pedidos">Pedidos</a>
        </div>
      </header>
      <div className="container">
        <div id="estoque" >
          <Stock />
        </div>
      </div>

    </>
  )
}