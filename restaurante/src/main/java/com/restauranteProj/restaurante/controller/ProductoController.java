package com.restauranteProj.restaurante.controller;

import com.restauranteProj.restaurante.exception.ResourceNotFoundException;
import com.restauranteProj.restaurante.models.Producto;
import com.restauranteProj.restaurante.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
public class ProductoController{
    @Autowired
    private ProductoRepository productoRepository;
    @GetMapping("/productos")
    public List<Producto> listarProductos(){
        return productoRepository.findAll();
    }

    @PostMapping("/productos")
    public Producto guardarProducto(@RequestBody Producto producto){
        return productoRepository.save(producto);
    }

    @GetMapping("/productos/{id}")
    public ResponseEntity<Producto> listarProductoID(@PathVariable Long id){
        Producto producto = productoRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("el producto con ese ID no existe: " + id));
        return ResponseEntity.ok(producto);
        }

    @GetMapping("/productos/categoria/{idCategoria}")
    public ResponseEntity<List<Producto>> listarProductosPorCategoria(@PathVariable int idCategoria){
        List<Producto> productos = productoRepository.findByCategoria(idCategoria);
        if (productos == null || productos.isEmpty()) {
            throw new ResourceNotFoundException("No products found with ID category: " + idCategoria);
        }
        return ResponseEntity.ok(productos);
    }


    @PutMapping("/productos/{id}")
    public ResponseEntity<Producto> actualizarCliente(@PathVariable Long id, @RequestBody Producto productoRequest){
        Producto producto = productoRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("el producto con ese ID no existe: " + id));
        producto.setNombre(productoRequest.getNombre());
        producto.setPrecio(productoRequest.getPrecio());
        producto.setCategoria(productoRequest.getCategoria());

        Producto productoActualizado = productoRepository.save(producto);
        return ResponseEntity.ok(productoActualizado);
    }

    @DeleteMapping("/productos/{id}")
    public ResponseEntity<Map<String, Boolean>> eliminarProducto(@PathVariable Long id){
        Producto producto = productoRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("el producto con ese ID no existe: " + id));
        productoRepository.delete(producto);

        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted",Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
    }

