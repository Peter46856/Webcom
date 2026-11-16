package studio.webcom;

import static org.junit.jupiter.api.Assertions.*;
import java.util.Map;
import java.util.concurrent.atomic.AtomicReference;
import org.junit.jupiter.api.Test;
import org.springframework.web.server.ResponseStatusException;
import jakarta.validation.Validation;

class InquiryControllerTest {
    private static final String TOKEN = "local-test-token-with-more-than-32-characters";
    private InquiryRequest valid() {
        return new InquiryRequest("Alex Example", "alex@example.com", "Example Logistics", "Software engineering",
                "$15,000–$50,000", "We need a fleet operations dashboard and a dispatch integration.", true, "");
    }
    @Test void validInquiryIsPersistedBeforeSuccess() {
        var captured = new AtomicReference<Map<String, Object>>();
        var controller = new InquiryController(captured::set, TOKEN);
        var response = controller.create(TOKEN, valid());
        assertEquals(response.get("id"), captured.get().get("id"));
        assertEquals("alex@example.com", captured.get().get("email"));
        assertNotNull(captured.get().get("consent_at"));
        assertFalse(captured.get().containsKey("website"));
    }
    @Test void unauthorizedCallsNeverReachStorage() {
        var controller = new InquiryController(data -> fail("Unexpected storage call"), TOKEN);
        var error = assertThrows(ResponseStatusException.class, () -> controller.create("wrong", valid()));
        assertEquals(401, error.getStatusCode().value());
    }
    @Test void storageFailureDoesNotReturnSuccess() {
        var controller = new InquiryController(data -> {throw new IllegalStateException("Storage unavailable");}, TOKEN);
        assertThrows(IllegalStateException.class, () -> controller.create(TOKEN, valid()));
    }
    @Test void validationRejectsInvalidEmailAndMissingConsent() {
        try (var factory = Validation.buildDefaultValidatorFactory()) {
            var validator = factory.getValidator();
            assertTrue(validator.validate(valid()).isEmpty());
            var invalid = new InquiryRequest("Alex", "not-an-email", "Company", "Software engineering",
                "Under $5,000", "We need a new software platform for our operations.", false, "");
            assertEquals(2, validator.validate(invalid).size());
        }
    }
    @Test void notificationSettingsFailureDoesNotLoseSavedInquiry() {
        var saved = new AtomicReference<Map<String, Object>>();
        InquiryStore store = new InquiryStore() {
            public void save(Map<String, Object> data) { saved.set(data); }
            public String notificationEmail() { throw new IllegalStateException("Settings unavailable"); }
        };
        var response = new InquiryController(store, TOKEN).create(TOKEN, valid());
        assertEquals(saved.get().get("id"), response.get("id"));
        assertEquals("", response.get("notificationEmail"));
    }
    @Test void recipientLookupHappensOnlyAfterStorageSucceeds() {
        InquiryStore store = new InquiryStore() {
            public void save(Map<String, Object> data) { throw new IllegalStateException("Storage unavailable"); }
            public String notificationEmail() { fail("Must not notify before persistence"); return ""; }
        };
        assertThrows(IllegalStateException.class, () -> new InquiryController(store, TOKEN).create(TOKEN, valid()));
    }
}
