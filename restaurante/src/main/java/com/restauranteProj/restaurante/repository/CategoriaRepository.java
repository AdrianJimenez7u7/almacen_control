package com.restauranteProj.restaurante.repository;

import com.restauranteProj.restaurante.models.Categoria;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Long>{
}
