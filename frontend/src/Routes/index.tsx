import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Admin from '../Components/Admin'



export default function Routes() {
  return(
    <BrowserRouter>
      <Switch>
        <Route path="/adminluss" exact component={Admin} />
      </Switch>
    </BrowserRouter>
  )  
}