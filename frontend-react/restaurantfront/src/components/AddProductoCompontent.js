import React, { useEffect, useState } from 'react'
import ProductoService from '../services/ProductoService';
import { Link, useNavigate, useParams } from 'react-router-dom';

export const AddProductoCompontent = () => {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [disponible, setDisponible] = useState('');
  const [unidad, setUnidad] = useState('');
  const [categoria, setCategoria] = useState('');
  const navegate = useNavigate();
  const {id} = useParams();

  const saveOrUpdateProducto = (e) => {
    e.preventDefault();
    const producto = {nombre, precio, disponible, unidad, categoria};
    if(id){
      ProductoService.updateProducto(id,producto).then((response) => {
        console.log(response.data);
        navegate('/productos');
      }).catch(error => {
        console.log(error);
      })
    }else{
      ProductoService.createProducto(producto).then((response) => {
        console.log(response.data);
        navegate('/productos');
      }).catch(error => {
        console.log(error);
      })
    }
    
  }

  useEffect(() => {
      ProductoService.getProductoById(id).then((response) => {
        const valor = (response);
        setNombre(response.data.nombre);
        setPrecio(response.data.precio);
        setDisponible(response.data.disponible);
        setUnidad(response.data.unidad);
        setCategoria(response.data.categoria);
        console.log(valor);
      }).catch(error => {
        console.log("producto nuevo o no identificado");
      });
});



  const title = () =>{
    if(id){
      return <h2 className='text-center'>Actualizar Producto</h2>
    }else{
      return <h2 className='text-center'>Agregar Producto</h2>
    }
  }
  return (
    <div>
    <div className='container'>
        <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3 m-4 p-3 bg-light rounded position-absolute top-50 start-50 translate-middle'>
                <h2 className='text-center'>{title()}</h2>
                <div className='card-body'>
                    <form className="needs-validation" noValidate onSubmit={(e) => {
                        e.preventDefault();
                        if (e.currentTarget.checkValidity() === false) {
                            e.stopPropagation();
                        } else {
                            saveOrUpdateProducto(e);
                        }
                        e.currentTarget.classList.add('was-validated');
                    }}>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Nombre</label>
                            <input type='text' placeholder='Ingrese el nombre' name='nombre' className='form-control' value={nombre} 
                                onChange={(e) => setNombre(e.target.value)} required>
                            </input>
                            <div className="invalid-feedback">Por favor, ingrese el nombre.</div>
                        </div>
                        <div className='form-group mb-2'>
                            <label className='form-label'>precio</label>
                            <input type='number' placeholder='Ingrese el Precio' name='precio' className='form-control' value={precio} 
                                onChange={(e) => setPrecio(e.target.value)} required>
                            </input>
                            <div className="invalid-feedback">Por favor, ingrese el precio.</div>
                        </div>
                        <div className='form-group mb-2'>
                            <label className='form-label'>categoria</label>
                            <input type='number' placeholder='Indique la categoria' name='categoria' className='form-control' value={categoria} 
                                onChange={(e) => setCategoria(e.target.value)} required>
                            </input>
                            <div className="invalid-feedback">Por favor, indique la categoría.</div>
                        </div>
                        <button className='btn btn-success' type="submit">Guardar</button>
                        &nbsp;&nbsp;
                        <Link to="/productos" className='btn btn-danger'>Cancelar</Link>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

  )
}

export default AddProductoCompontent;