package studio.webcom;

import static org.junit.jupiter.api.Assertions.assertEquals;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT, properties = {
    "webcom.api-token=integration-test-token-longer-than-32-characters",
    "webcom.supabase-url=",
    "webcom.supabase-key="
})
class InquiryHttpTest {
    @LocalServerPort int port;
    private static final String TOKEN = "integration-test-token-longer-than-32-characters";
    private static final String VALID = """
        {"name":"Alex Example","email":"alex@example.com","company":"Example Logistics",
         "scope":"Software engineering","budget":"Under $5,000",
         "message":"We need a new fleet operations dashboard for our dispatch team.",
         "consent":true,"website":""}
        """;

    private int post(String token, String body) throws Exception {
        var request = HttpRequest.newBuilder(URI.create("http://localhost:" + port + "/api/inquiries"))
            .header("Content-Type", "application/json").header("X-WebCom-Token", token)
            .POST(HttpRequest.BodyPublishers.ofString(body)).build();
        return HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.discarding()).statusCode();
    }

    @Test void requestsRequireServerAuthentication() throws Exception {
        assertEquals(401, post("incorrect-token", VALID));
    }
    @Test void frameworkValidationRejectsMalformedInquiries() throws Exception {
        assertEquals(400, post(TOKEN, VALID.replace("alex@example.com", "invalid-email")));
    }
    @Test void unconfiguredStorageCannotReportSuccess() throws Exception {
        assertEquals(503, post(TOKEN, VALID));
    }
}
