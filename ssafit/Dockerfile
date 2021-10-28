FROM openjdk:8-jdk-alpine
RUN ./gradlew clean build
VOLUME /tmp
ADD ./build/libs/ssafit-0.0.1-SNAPSHOT.jar app.jar
ENV JAVA_OPTS=""
ENTRYPOINT ["java", "-jar", "/app.jar"]
