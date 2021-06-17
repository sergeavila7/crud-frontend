import { BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import NavbarJsx from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Update from './components/Update';

const isAuth = () =>{
  const token = sessionStorage.getItem('token')
  if(token){
    return true
  }else{
    return false
  }
}

const MyRoute = (props)=>{
  return isAuth()? <Route {...props}/>: <Redirect to='/'/>
}
const PublicRoute = (props)=>{
  return isAuth()? <Redirect to='/home'/>:<Route {...props}/>
}

function App() {
  return (
    <Router>
      <NavbarJsx />
      <PublicRoute path='/' exact component={Login} />
      <Route path='/register' exact component={Register} />
      <MyRoute path='/home' exact component={Home} />
      <MyRoute path='/edit/:id' exact component={Update} />
    </Router>
  );
}

export default App;
