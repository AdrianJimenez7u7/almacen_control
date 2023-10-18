import React, { useEffect, useState } from 'react';
import ProductoService from '../services/ProductoService';
import MUIDataTable from 'mui-datatables';
import {Alert, Snackbar} from "@mui/material";
import { Link, useParams } from 'react-router-dom';


export const ListProductoCategoria = () => {
    const {categoria} = useParams();
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
      setOpen(true);
    };
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };
    const [productos, setproductos] = useState([]);

    useEffect(() => {
        listarProductos()
    }, [])

    const deleteProducto = (productoId) => {
        ProductoService.deleteProducto(productoId).then((response) => {
            listarProductos()
        }).catch(error => {
            console.log(error)
        })
    }

    const listarProductos = () => {
        ProductoService.getProductoByCategoria(categoria).then(Response => {
            setproductos(Response.data);
        }).catch(error => {
            console.log(error);
        })
    }

    const options = {
        filterType: 'dropdown',
        responsive: 'standard',
        textLabels: {
            body: {
                noMatch: "Lo siento, no se encontraron registros",
                toolTip: "Ordenar",
                columnHeaderTooltip: column => `Ordenar por ${column.label}`
            },
            pagination: {
                next: "Siguiente",
                previous: "Anterior",
                rowsPerPage: "Filas por página:",
                displayRows: "de",
            },
            toolbar: {
                search: "Buscar",
                downloadCsv: "Descargar CSV",
                print: "Imprimir",
                viewColumns: "Ver Columnas",
                filterTable: "Filtrar Tablas",
            },
            filter: {
                all: "Todos",
                title: "FILTROS",
                reset: "REINICIAR",
            },
            viewColumns: {
                title: "Mostrar Columnas",
                titleAria: "Mostrar/Ocultar Columnas",
            },
            selectedRows: {
                text: "fila(s) seleccionadas",
                delete: "Eliminar",
                deleteAria: "Eliminar las filas seleccionadas"
            }
        }
    };
    

    const columns = [
        "ID",
        "nombre",
        "precio",
        "categoria",
        {
            name: "acciones",
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    const productoId = tableMeta.rowData[0];
                    return (
                        <>
                            <Link className='btn btn-info' to={`/edit-producto/${productoId}`}><i className='bx bx-edit'></i></Link>
                            <button 
    className='btn btn-danger' 
    variant="outlined" 
    style={{ marginLeft: "10px" }} 
    onClick={() => {
        deleteProducto(productoId); 
        handleClick();
    }}
>
    Eliminar
</button>
                        </>
                    );
                }
            }
        }
    ];

    const data = productos.map(producto => [
        producto.productoId,
        producto.nombre,
        producto.precio,
        producto.categoria
    ]);


    return (
        <div className='container border border-1  m-4 p-3 bg-light rounded'>
            <h2 className='text-center'>Lista de producto</h2>
            <Link to="/add-producto" className='btn btn-primary mb-2'>Agregar Producto</Link>
            <MUIDataTable 
                title={"Productos"}
                data={data}
                columns={columns}
                options={options}
            />

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert severity="warning">Producto Eliminado!</Alert>
      </Snackbar>
        </div>
    )
}

export default ListProductoCategoria;
