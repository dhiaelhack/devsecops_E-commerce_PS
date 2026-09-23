## DevSecOps Pipeline

The project uses **GitLab CI/CD** to automate the software delivery workflow.

The pipeline includes:

* Application build
* Automated testing
* SonarQube code quality analysis
* Dependency vulnerability scanning
* Security testing
* Docker image building
* Deployment automation

The application was previously deployed to **Microsoft Azure** as part of the CI/CD workflow. The Azure deployment is currently **stopped** to avoid keeping the cloud infrastructure running continuously.

```text
Developer
    │
    ▼
  GitLab
    │
    ▼
GitLab CI/CD
    │
    ├── Build
    ├── Tests
    ├── SonarQube
    ├── Dependency Security Checks
    ├── OWASP Security Testing
    └── Docker
            │
            ▼
     Microsoft Azure
     (deployment stopped)
```

## Deployment

The application was deployed to **Microsoft Azure** through the GitLab CI/CD pipeline.

The deployment environment is currently stopped, so the application is **not continuously available online**.

The infrastructure and deployment configuration remain part of the project to demonstrate the complete CI/CD workflow and cloud deployment process.

## Technologies

| Category           | Technologies                      |
| ------------------ | --------------------------------- |
| Frontend           | Angular                           |
| Backend            | Java, Spring Boot                 |
| Database           | MongoDB                           |
| Authentication     | JWT                               |
| CI/CD              | GitLab CI/CD                      |
| Cloud              | Microsoft Azure                   |
| Containerization   | Docker                            |
| Code Quality       | SonarQube                         |
| Security           | OWASP ZAP, OWASP Dependency-Check |
| Vulnerability Data | NVD                               |
| Build Tool         | Maven                             |
| Version Control    | Git                               |
