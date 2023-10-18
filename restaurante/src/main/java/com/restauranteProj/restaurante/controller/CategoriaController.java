package com.restauranteProj.restaurante.controller;
import com.restauranteProj.restaurante.exception.ResourceNotFoundException;
import com.restauranteProj.restaurante.models.Categoria;
import com.restauranteProj.restaurante.models.Producto;
import com.restauranteProj.restaurante.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
public class CategoriaController {
    @Autowired
    private CategoriaRepository categoriasRepository;
    @GetMapping("/categorias")
    public List<Categoria> listarProductos(){
        return categoriasRepository.findAll();
    }
}
