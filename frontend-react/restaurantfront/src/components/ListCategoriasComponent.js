// Importando las bibliotecas y dependencias necesarias
import React, { useEffect, useState } from "react";
import categoriaService from "../services/CategoriaService";
import Button from "@mui/material/Button";
import { Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

// Definición del componente funcional ListCategoriasComponent
export const ListCategoriasComponent = () => {

  // Estado para almacenar las categorías obtenidas desde el servicio
  const [categorias, setCategorias] = useState([]);

  // Hook useEffect para obtener las categorías al montar el componente
  useEffect(() => {
    categoriaService
      .getAllcategorias()
      .then((Response) => {
        // Actualizando el estado con los datos obtenidos
        setCategorias(Response.data);
      })
      .catch((error) => {
        // En caso de error, se muestra en la consola
        console.log(error);
      });
  }, []); // El array de dependencias vacío asegura que esto se ejecute sólo al montar el componente

  // Renderización del componente
  return (
    // Contenedor principal
    <div className="card-group row row-cols-1 row-cols-md-3 g-4 border border-1 m-4 p-3 bg-light rounded">
      
      <Container>
        <Typography variant="h2">Categorias</Typography>
      </Container>
      {categorias.map((categoria) => {
        const base64Flag = "data:image/jpeg;base64,";
        return (
          // Enlace a la página de productos para la categoría específica
          <Link
            to={`/productos/${categoria.categoriaId}`}
            key={categoria.categoriaId}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="col">
              <div className="card">
                <img
                  src={base64Flag + categoria.imagen}
                  alt={`Categoria: ${categoria.nombre}`}
                />
                <div className="card-body">
                  <h5 className="card-title">{categoria.nombre}</h5>
                  <p className="card-text">Categoría número: {categoria.categoriaId}</p>
                </div>
                <div className="card-footer">
                  <small className="text-muted">Estado: {categoria.estado}</small>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
      <div className="col">
        <div className="card">
          <Button
            variant="contained"
            sx={{ height: 100, maxWidth: "elValorQueDesees" }}
          >
            Agregar
          </Button>
        </div>
        <div className="card-footer">
          <small className="text-muted">Agregar Categoria</small>
        </div>
      </div>
    </div>
  );
};

// Exportando el componente para su uso en otras partes de la aplicación
export default ListCategoriasComponent;
