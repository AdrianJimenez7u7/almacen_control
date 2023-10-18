package com.restauranteProj.restaurante.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

//esta clase retorna el estatus not found
@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException{
    private static final long serialVersionUID =1L;

    public ResourceNotFoundException(String message) {
        super(message);
    }

    public ResourceNotFoundException(){

    }
}
