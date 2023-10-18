package com.restauranteProj.restaurante.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collection;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "usuarios", uniqueConstraints = @UniqueConstraint(columnNames = "email"))
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "nombre")
    private String Nombre;
    @Column(name = "apellidoPat")
    private String apellidoPat;
    @Column(name = "apellidoMat")
    private String apellidoMat;
    @Column(name = "email")
    private String Email;
    @Column(name = "password")
    private String password;

    //relacion muchos a muchos en cascada
    @ManyToMany(fetch = FetchType.EAGER,cascade = CascadeType.ALL)
    @JoinTable(name = "usuarios_roles", joinColumns = @JoinColumn(name = "usuario_id",referencedColumnName = "id"),//relacion de tabla usuario con tabla Rol
    inverseJoinColumns = @JoinColumn(name = "rol_id", referencedColumnName = "id"))
    @Column(name = "rol")
    private Collection<Rol> roles;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "YYYY-MM-dd")
    @Column(name = "imagen")
    private byte[] imagen;
}
