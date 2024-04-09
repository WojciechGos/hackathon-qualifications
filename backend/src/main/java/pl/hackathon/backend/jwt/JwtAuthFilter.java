//package pl.hackathon.backend.jwt;
//
//
//import jakarta.servlet.FilterChain;
//import jakarta.servlet.ServletException;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Component;
//import org.springframework.web.filter.OncePerRequestFilter;
//
//import java.io.IOException;
//
//@Component
//@RequiredArgsConstructor
//public class JwtAuthFilter extends OncePerRequestFilter {
//
//    private final JwtUtil jwtUtil;
//
//    @Override
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
////        final String authHeader = request.getHeader("Authorization");
////        final String userEmail;
////        final String token;
////
////        if(authHeader == null || !authHeader.startsWith("Bearer ")) {
////            filterChain.doFilter(request, response);
////            return;
////        }
////        token = authHeader.substring(7);
////        userEmail = jwtUtil.extractEmail(token);
////
////        if(userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
////
////
////            if(jwtUtil.isTokenValid(token, userEmail)) {
////                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
////                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
////                SecurityContextHolder.getContext().setAuthentication(authToken);
////            }
////        }
////        filterChain.doFilter(request, response);
//
//    }
//}
