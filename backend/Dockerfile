FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn -B verify

FROM eclipse-temurin:21-jre
WORKDIR /app
RUN groupadd --system webcom && useradd --system --gid webcom webcom
COPY --from=build /app/target/webcom-api-1.0.0.jar app.jar
USER webcom
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
