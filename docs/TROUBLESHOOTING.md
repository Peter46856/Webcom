# Inquiry diagnostics

Restart Next.js and Java after changing their environment variables or the Java source. Submit the form once, then match its `Reference` UUID to `requestId` in both terminals. No credentials, contact fields, request bodies, or upstream response bodies are logged.

| Event                                  | Meaning / next step                                                                                                                                 |
| -------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `inquiry.config_invalid`               | Next.js lists missing, short, or placeholder configuration names. Fix `.env.local` and restart Next.js.                                             |
| `java.connection_failed`               | Java could not be reached. `ECONNREFUSED` usually means no listener at the configured host/port. Check Java startup, `JAVA_API_URL`, and port 8080. |
| `java.response_error` with 401         | Match `JAVA_API_TOKEN` in Next.js with Java's `WEBCOM_API_TOKEN`. Both must use the same real secret, at least 32 characters.                       |
| `java.authentication_failed`           | Java identifies invalid backend token configuration or a mismatch.                                                                                  |
| `supabase.config_invalid`              | Replace placeholder URL/key in the Java terminal environment and restart Java.                                                                      |
| `supabase.response_error` with 401/403 | Check the Supabase server secret belongs to the configured project and has not been revoked.                                                        |
| Code `PGRST205` / `42P01`              | The inquiries table was not found. Apply the SQL migration in the same Supabase project Java uses.                                                  |
| Code `42501`                           | Database permission failure. Use a server key and check the migration's grants.                                                                     |
| Code `PGRST204`                        | Schema/column mismatch. Check the applied migration and schema cache.                                                                               |
| Code `23514`                           | Database check constraint rejected an option. Keep SQL, Java, and React options in sync.                                                            |
| `supabase.connection_failed`           | Check the exception/cause type for DNS, connection, timeout, or TLS problems. Raw exception messages are deliberately excluded.                     |
| `supabase.saved` then `inquiry.saved`  | The database accepted the inquiry and the frontend received confirmation.                                                                           |

HTTP 503 in the browser intentionally remains generic. Detailed diagnostic hints are server-side only. Share the event, reference ID, status, and code when troubleshooting; never share secrets or enable request-body logging.
