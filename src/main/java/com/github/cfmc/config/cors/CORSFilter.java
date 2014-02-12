/**
 * 
 */
package com.github.cfmc.config.cors;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.filter.OncePerRequestFilter;

/**
 * 
 * @author Johannes Hiemer.
 *
 */
public class CORSFilter extends OncePerRequestFilter {
 
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
 
        if(request.getHeader("Access-Control-Request-Method") != null && "OPTIONS".equals(request.getMethod())) {
        	response.addHeader("Access-Control-Allow-Origin", "*");
 
            response.addHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, DELETE");
            response.addHeader("Access-Control-Allow-Headers", "Accept, Content-Type");
            response.addHeader("Access-Control-Max-Age", "1800");
        } 
        
        filterChain.doFilter(request, response);
    }
}