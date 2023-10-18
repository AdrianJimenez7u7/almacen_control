package com.restauranteProj.restaurante.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.antlr.v4.runtime.Token;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

//clase para generar, extraer info y validar tokens de acceso

//estructura token jwt
/**
 * HEADER.PAYLOAD.SIGNATURE
 * HEADER: (2 valores): {"algoritmo", "type"}
 * PAYLOAD: (datos("name":"[nombre]", "exp":"02/10/2023
 * SIGNATURE: (verifica la firma mediante la clave secreta)
 */
@Service
public class JwtUtil {
    private String secret = "sucha2023";

    /**
     * extraemos el usuario del token
     * @param token
     * @return "usuarioToken"
     */
    public String extractUsername(String token){
        return extractClaims(token, Claims::getSubject);
    }

    /**
     * extraemos del token la fecha en la que vence el token
     * @param token
     * @return "FechaExpiracionToken"
     */
    public Date extractExpiration(String token){
        return extractClaims(token, Claims::getExpiration);
    }

    /**
     * nos da todos los parametros que tiene el token
     * @param token
     * @param claimsResolver
     * @return
     * @param <T>
     */
    public <T> T extractClaims(String token, Function<Claims, T> claimsResolver){
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    /**
     * extrae todos los parametros del token
     * @param token
     * @return
     */
    public Claims extractAllClaims(String token){
        return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
    }

    /**
     * valida si el toquen esta expirado
     * @param token
     * @return True
     */
    private Boolean isTokenExpired(String token){
        return extractExpiration(token).before(new Date());
    }

    /**
     *
     * @param username
     * @param role
     * @return
     */
    public String generateToken(String username, String role){
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", role);
        return createToken(claims,username);
    }

    /**
     * este metodo nos crea el token con una caducidad de 1000 horas, lo firma con la clave secreta y lo encripta
     * @param claims
     * @param subject
     * @return
     */
    private String createToken(Map<String, Object> claims,String subject){
        return Jwts.builder().setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 100 * 60 * 60 * 10))
                .signWith(SignatureAlgorithm.HS256, secret).compact();
    }

    /**
     * valida que el token no este expirado y que este autorizado para el usuario
     * @param token
     * @param userDetails
     * @return
     */
    public Boolean validateToken(String token, UserDetails userDetails){
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
}
