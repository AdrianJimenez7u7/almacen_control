import axios from "axios";
const CATEGORIAS_BASE_REST_API_URL = "http://localhost:8090/api/v1/categorias";

class categoriaService{
    getAllcategorias(){
        return axios.get(CATEGORIAS_BASE_REST_API_URL).catch(error => {
            console.error(error);
          });
    }
}

export default new categoriaService();