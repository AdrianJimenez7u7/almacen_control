import axios from "axios";
const PRODUCTO_BASE_REST_API_URL = "http://localhost:8090/api/v1/productos";

class productoService{
    getAllProductos(){
        return axios.get(PRODUCTO_BASE_REST_API_URL);
    }

    createProducto(producto){
        return axios.post(PRODUCTO_BASE_REST_API_URL, producto).catch(error => {
            console.error(error);
          });
    }

    getProductoById(productoId){
        return axios.get(`${PRODUCTO_BASE_REST_API_URL}/${productoId}`).catch(error => {
            console.error("producto nuevo o no identificado");
          });
    }

    getProductoByCategoria(categoriaId){
        return axios.get(`${PRODUCTO_BASE_REST_API_URL}/categoria/${categoriaId}`).catch(error => {
            console.error("categoria sin productos identificados");
          });
    }

    updateProducto(productoId,producto){
        return axios.put(PRODUCTO_BASE_REST_API_URL + "/" + productoId, producto).catch(error => {
            console.error(error);
          });
    }

    deleteProducto(productoId){
        return axios.delete(PRODUCTO_BASE_REST_API_URL + "/" + productoId).catch(error => {
            console.error(error);
          });
    }

}

const productServiceInstance = new productoService();
export default productServiceInstance;