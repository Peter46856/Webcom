package studio.webcom;

import java.util.Map;

public interface InquiryStore {
    void save(Map<String, Object> inquiry);
    default String notificationEmail() { return ""; }
}
