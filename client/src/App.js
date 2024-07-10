
import './App.css';
import Table from './Components/Table';
import Input from './Components/Input';
import{Route,Routes} from 'react-router-dom'
import Signup from './Components/Signup';
import Signin from './Components/Signin';
import Updatepass from './Components/Updatepass';
import'./Assets/bg.jpg'



function App() {
  return <>
<Routes>
<Route path='/' element={<Signup/>}/>
<Route path='/signin' element={<Signin/>}/>
<Route path='/ip' element={<Input/>}/>
<Route path='/op' element={<Table/>}/>
<Route path='/passwordupdate' element={<Updatepass/>}/>

</Routes>
  </>
}

export default App;
