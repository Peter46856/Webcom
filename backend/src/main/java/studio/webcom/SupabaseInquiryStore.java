package studio.webcom;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import tools.jackson.databind.ObjectMapper;

@Service
public class SupabaseInquiryStore implements InquiryStore {
    private static final Logger log = LoggerFactory.getLogger(SupabaseInquiryStore.class);
    private final String url;
    private final String key;
    private final ObjectMapper mapper;
    private final HttpClient client = HttpClient.newBuilder().connectTimeout(Duration.ofSeconds(5)).build();

    public SupabaseInquiryStore(@Value("${webcom.supabase-url}") String url,
                               @Value("${webcom.supabase-key}") String key,
                               ObjectMapper mapper) {
        this.url = url.replaceAll("/+$", "");
        this.key = key;
        this.mapper = mapper;
    }

    @Override
    public void save(Map<String, Object> inquiry) {
        if (!url.startsWith("https://") || url.contains("YOUR-") || url.contains("your-project") || key.isBlank() || key.startsWith("replace-")) {
            log.error("event=supabase.config_invalid requestId={} urlMissingOrPlaceholder={} keyMissingOrPlaceholder={}",
                MDC.get("requestId"), !url.startsWith("https://") || url.contains("YOUR-") || url.contains("your-project"), key.isBlank() || key.startsWith("replace-"));
            throw unavailable();
        }
        try {
            var builder = HttpRequest.newBuilder(URI.create(url + "/rest/v1/inquiries"))
                .timeout(Duration.ofSeconds(8))
                .header("apikey", key)
                .header("Content-Type", "application/json")
                .header("Prefer", "return=minimal");
            // New Supabase secret keys use apikey only; legacy JWT service_role keys also use Bearer.
            if (key.startsWith("eyJ")) builder.header("Authorization", "Bearer " + key);
            var request = builder.POST(HttpRequest.BodyPublishers.ofString(mapper.writeValueAsString(inquiry))).build();
            log.info("event=supabase.request_started requestId={}", MDC.get("requestId"));
            var response = client.send(request, HttpResponse.BodyHandlers.ofString());
            if (response.statusCode() < 200 || response.statusCode() >= 300) {
                String code = "unknown";
                try {
                    String value = mapper.readTree(response.body()).path("code").asText();
                    if (value.matches("[A-Z0-9]{4,12}")) code = value;
                } catch (Exception ignored) { /* Never log response bodies, which may contain submitted data. */ }
                String hint = switch (code) {
                    case "PGRST205", "42P01" -> "Apply_the_inquiries_SQL_migration_in_the_correct_project";
                    case "42501" -> "Use_a_server_secret_or_service_role_key_and_check_table_grants";
                    case "PGRST204" -> "Check_migration_columns_and_schema_cache";
                    case "23514" -> "Check_database_constraints_match_form_options";
                    default -> response.statusCode() == 401 || response.statusCode() == 403
                        ? "Check_Supabase_server_key_and_project_URL_match" : "Check_Supabase_API_and_database_logs";
                };
                log.error("event=supabase.response_error requestId={} status={} code={} hint={}",
                    MDC.get("requestId"), response.statusCode(), code, hint);
                throw unavailable();
            }
            log.info("event=supabase.saved requestId={}", MDC.get("requestId"));
        } catch (InterruptedException exception) {
            log.error("event=supabase.interrupted requestId={}", MDC.get("requestId"));
            Thread.currentThread().interrupt();
            throw unavailable();
        } catch (ResponseStatusException exception) {
            throw exception;
        } catch (Exception exception) {
            log.error("event=supabase.connection_failed requestId={} exceptionType={} causeType={} hint=Check_URL_DNS_TLS_and_network_access",
                MDC.get("requestId"), exception.getClass().getSimpleName(),
                exception.getCause() == null ? "none" : exception.getCause().getClass().getSimpleName());
            // Never log submitted contact details, credentials, or upstream response bodies.
            throw unavailable();
        }
    }

    private ResponseStatusException unavailable() {
        return new ResponseStatusException(HttpStatus.SERVICE_UNAVAILABLE, "Inquiry storage is unavailable");
    }

    @Override
    public String notificationEmail() {
        try {
            var builder = HttpRequest.newBuilder(URI.create(url + "/rest/v1/studio_settings?id=eq.main&select=inquiry_email"))
                .timeout(Duration.ofSeconds(3)).header("apikey", key);
            if (key.startsWith("eyJ")) builder.header("Authorization", "Bearer " + key);
            var response = client.send(builder.GET().build(), HttpResponse.BodyHandlers.ofString());
            if (response.statusCode() != 200) {
                log.warn("event=notification.settings_error requestId={} status={} hint=Apply_pricing_and_settings_migration",
                    MDC.get("requestId"), response.statusCode());
                return "";
            }
            var rows = mapper.readTree(response.body());
            if (rows.isArray() && rows.size() == 1) return rows.get(0).path("inquiry_email").asText("");
        } catch (InterruptedException exception) {
            Thread.currentThread().interrupt();
        } catch (Exception ignored) {
            log.warn("event=notification.settings_connection_failed requestId={}", MDC.get("requestId"));
        }
        return "";
    }
}
