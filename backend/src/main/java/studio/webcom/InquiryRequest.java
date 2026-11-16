package studio.webcom;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record InquiryRequest(
    @NotBlank @Size(min=2, max=100) String name,
    @NotBlank @Email @Size(max=254) String email,
    @NotBlank @Size(min=2, max=160) String company,
    @NotBlank @Pattern(regexp="Software engineering|Logistics & fleet systems|Network infrastructure|Cloud & DevOps|Architecture consultation") String scope,
    @NotBlank @Pattern(regexp="Under \\$5,000|\\$5,000–\\$15,000|\\$15,000–\\$50,000|\\$50,000\\+|Let’s scope it together") String budget,
    @NotBlank @Size(min=30, max=5000) String message,
    @NotNull @AssertTrue Boolean consent,
    @Size(max=0) String website
) {}
