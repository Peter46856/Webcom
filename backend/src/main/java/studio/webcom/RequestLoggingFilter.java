package studio.webcom;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.UUID;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class RequestLoggingFilter extends OncePerRequestFilter {
    private static final Logger log = LoggerFactory.getLogger(RequestLoggingFilter.class);

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain chain) throws ServletException, IOException {
        String supplied = request.getHeader("X-Request-ID");
        String id = supplied != null && supplied.matches("[a-fA-F0-9-]{36}")
            ? supplied : UUID.randomUUID().toString();
        MDC.put("requestId", id);
        response.setHeader("X-Request-ID", id);
        long started = System.nanoTime();
        try {
            chain.doFilter(request, response);
        } finally {
            log.info("event=java.request_complete requestId={} status={} elapsedMs={}",
                id, response.getStatus(), (System.nanoTime() - started) / 1_000_000);
            MDC.remove("requestId");
        }
    }
}
