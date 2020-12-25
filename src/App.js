import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import Home from './screen/home';
import MusicPlay from './screen/musicPlay';
import logo from './assets/img/logo.png'

const App = () => {
  return(
    <Router>
      <Link to={'/'} exact>
        <div className='logo-container'>
            <img src={logo} alt='main logo' className='logo-img'/>
        </div>
      </Link>
      <Switch>
        <Route path='/' exact>
          <Home />
        </Route>

        <Route path='/music/:songName' exact>
          <MusicPlay />
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
