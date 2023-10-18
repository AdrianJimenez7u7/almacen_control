import './assets/css/App.css';
import ListProductoComponent from './components/ListProductoComponent';
import HeaderComponent from './components/HeaderComponent';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ListCategoriasComponent from './components/ListCategoriasComponent';
import AddProductoCompontent from './components/AddProductoCompontent';
import SignUp from './components/SingUp';
import { Container, Button } from '@mui/material';
import ListProductoCategoria from './components/ListProductosCategoria';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <HeaderComponent/>
        <div className='container'>
          <Routes>
            <Route exact path='/' element={<ListCategoriasComponent/>}></Route>
            <Route exact path='/productos' element={<ListProductoComponent/>}></Route>
            <Route exact path='/productos/:categoria' element={<ListProductoCategoria/>}></Route>
            <Route exact path='/add-producto' element={<AddProductoCompontent/>}></Route>
            <Route exact path='/edit-producto/:id' element={<AddProductoCompontent/>}></Route>
            <Route exact path='/categorias' element={<ListCategoriasComponent/>}></Route>
            <Route exact path='/register' element={<SignUp/>}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
