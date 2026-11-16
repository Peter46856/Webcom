package studio.webcom;

import jakarta.validation.Valid;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.time.Instant;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/inquiries")
public class InquiryController {
    private static final Logger log = LoggerFactory.getLogger(InquiryController.class);
    private final InquiryStore store;
    private final String token;

    public InquiryController(InquiryStore store, @Value("${webcom.api-token}") String token) {
        this.store = store;
        this.token = token;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Map<String, String> create(@RequestHeader(value="X-WebCom-Token", defaultValue="") String supplied,
                                      @Valid @RequestBody InquiryRequest request) {
        if (token.length() < 32 || token.startsWith("replace-") || !MessageDigest.isEqual(
                token.getBytes(StandardCharsets.UTF_8), supplied.getBytes(StandardCharsets.UTF_8))) {
            log.warn("event=java.authentication_failed requestId={} reason={}", MDC.get("requestId"),
                token.length() < 32 || token.startsWith("replace-") ? "WEBCOM_API_TOKEN_missing_short_or_placeholder" : "shared_token_mismatch");
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        }
        var id = UUID.randomUUID().toString();
        var inquiry = new HashMap<String, Object>();
        inquiry.put("id", id);
        inquiry.put("name", request.name().strip());
        inquiry.put("email", request.email().strip());
        inquiry.put("company", request.company().strip());
        inquiry.put("scope", request.scope());
        inquiry.put("budget", request.budget());
        inquiry.put("message", request.message().strip());
        inquiry.put("consent_at", Instant.now().toString());
        store.save(inquiry);
        // Internal response only: this endpoint requires the server-to-server token.
        // The web route must never return the notification recipient to public clients.
        String recipient = "";
        try {
            recipient = store.notificationEmail();
        } catch (Exception ignored) {
            log.warn("event=notification.settings_unavailable requestId={}", MDC.get("requestId"));
        }
        return Map.of("id", id, "message", "Inquiry received", "notificationEmail", recipient);
    }
}
