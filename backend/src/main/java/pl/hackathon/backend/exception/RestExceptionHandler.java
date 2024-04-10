package pl.hackathon.backend.exception;

import jakarta.validation.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import java.sql.Timestamp;
import java.util.HashMap;
import java.util.Map;

@RestController
@ControllerAdvice
public class RestExceptionHandler {
    // TODO  Logging with SLF4J and Logback
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ExceptionResponse> handleResourceNotFoundException(ResourceNotFoundException ex) {
        return new ResponseEntity<>(new ExceptionResponse(404, "Not Found", ex.getMessage(), new Timestamp(System.currentTimeMillis())), HttpStatus.NOT_FOUND);
    }
    @ExceptionHandler(NoResourceFoundException.class)
    public ResponseEntity<ExceptionResponse> handleNoHandlerFoundException(NoResourceFoundException ex) {
        return new ResponseEntity<>(new ExceptionResponse(404, "Not Found", ex.getMessage(), new Timestamp(System.currentTimeMillis())), HttpStatus.NOT_FOUND);
    }
    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<ExceptionResponse> handleAuthenticationException(AuthenticationException ex) {
        return new ResponseEntity<>(new ExceptionResponse(400, "Bad Request", ex.getMessage(), new Timestamp(System.currentTimeMillis())), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ExceptionResponse> handleHttpMessageNotReadableException(HttpMessageNotReadableException ex) {
        return new ResponseEntity<>(new ExceptionResponse(400, "Bad Request", ex.getMessage(), new Timestamp(System.currentTimeMillis())), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ExceptionResponse> handleException(Exception ex) {
        return new ResponseEntity<>(new ExceptionResponse(500, "Internal Server Error", ex.getMessage(), new Timestamp(System.currentTimeMillis())), HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ExceptionResponse> handleValidationExceptions(ConstraintViolationException ex) {
        return new ResponseEntity<>(new ExceptionResponse(400, "Bad Request", ex.getMessage(), new Timestamp(System.currentTimeMillis())), HttpStatus.BAD_REQUEST);
    }

}