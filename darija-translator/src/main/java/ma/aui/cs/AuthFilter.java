package ma.aui.cs;

import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerRequestFilter;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.Provider;

@Provider
public class AuthFilter implements ContainerRequestFilter {

    private static final String VALID_TOKEN = System.getenv("API_TOKEN");

    @Override
    public void filter(ContainerRequestContext ctx) {
        // Skip auth for OPTIONS (preflight already handled by CorsServletFilter)
        if (ctx.getMethod().equalsIgnoreCase("OPTIONS")) return;

        String authHeader = ctx.getHeaderString("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            ctx.abortWith(Response.status(Response.Status.UNAUTHORIZED)
                    .entity("{\"error\":\"Missing or invalid Authorization header\"}")
                    .build());
            return;
        }

        String token = authHeader.substring("Bearer ".length()).trim();

        if (VALID_TOKEN == null || !VALID_TOKEN.equals(token)) {
            ctx.abortWith(Response.status(Response.Status.UNAUTHORIZED)
                    .entity("{\"error\":\"Invalid token\"}")
                    .build());
        }
    }
}
