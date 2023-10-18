package com.restauranteProj.restaurante.dto;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UsuarioRegistroDTO {

    private Long id;

    private String Nombre;

    private String apellidoPat;

    private String apellidoMat;

    private String Email;
    private String password;
    private byte[] imagen;
}
