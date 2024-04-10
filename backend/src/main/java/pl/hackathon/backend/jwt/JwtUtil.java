//package pl.hackathon.backend.jwt;
//
//
//import io.jsonwebtoken.Claims;
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.SignatureAlgorithm;
//import io.jsonwebtoken.security.Keys;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Service;
//
//import java.security.Key;
//import java.time.Instant;
//import java.util.Calendar;
//import java.util.Date;
//import java.util.List;
//import java.util.Map;
//
////@Service
//public class JwtUtil {
//
//    @Value("${jwt.secret}")
//    private String SECRET_KEY;
//
//    public String extractEmail(String token) {
//        return getSubject(token);
//    }
//
//    public String issueToken(String subject, List<String> scopes) {
//        return issueToken(subject, Map.of("scopes", scopes));
//    }
//    public String issueToken(
//            String email,
//            Map<String, Object> claims) {
//        Calendar now = Calendar.getInstance();
//        Calendar expirationTime = (Calendar) now.clone();
//        expirationTime.add(Calendar.DAY_OF_YEAR, 30);
//
//        return Jwts
//                .builder()
//                .setClaims(claims)
//                .setSubject(email)
//                .setIssuedAt(Date.from(Instant.now()))
//                .setExpiration(expirationTime.getTime())
//                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
//                .compact();
//    }
//
//    public String getSubject(String token) {
//        return getClaims(token).getSubject();
//    }
//
//    private Claims getClaims(String token) {
//        return Jwts
//                .parserBuilder()
//                .setSigningKey(getSigningKey())
//                .build()
//                .parseClaimsJws(token)
//                .getBody();
//    }
//
//    private Key getSigningKey() {
//        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
//    }
//
//    public boolean isTokenValid(String jwt, String email) {
//        String subject = getSubject(jwt);
//        return subject.equals(email) && !isTokenExpired(jwt);
//    }
//
//    private boolean isTokenExpired(String jwt) {
//        Date today = Date.from(Instant.now());
//        return getClaims(jwt).getExpiration().before(today);
//    }
//}