# Secure DevSecOps CI/CD Platform

A full-stack web application developed to demonstrate a complete **DevSecOps workflow**, from source code and automated CI/CD to code quality, security testing, containerization, and cloud deployment.

The application was developed with **Angular**, **Spring Boot**, and **MongoDB Atlas**, with the entire delivery workflow automated through **GitLab CI/CD**.

> **Deployment status:** The application was previously deployed on **Microsoft Azure** through the GitLab CI/CD pipeline. The Azure deployment is currently stopped, but the CI/CD and deployment configuration remains part of the project.

---

## Project Overview

The goal of this project was not only to build a web application, but to integrate security and automation throughout the software development lifecycle.

The project combines:

* Full-stack application development
* REST API development
* MongoDB Atlas database
* Docker containerization
* GitLab CI/CD
* Self-hosted GitLab Runner
* SonarQube static code analysis
* Dependency and vulnerability checking
* OWASP ZAP security testing
* Microsoft Azure deployment

The project was developed as a **solo project**, covering both application development and the DevSecOps infrastructure.

---

## Architecture

```text
                    ┌──────────────────────┐
                    │      Developer       │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │       GitLab         │
                    │   Source Repository  │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │    GitLab CI/CD      │
                    │       Pipeline       │
                    └──────────┬───────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                ▼                ▼
        ┌──────────┐    ┌────────────┐   ┌─────────────┐
        │  Build   │    │ SonarQube  │   │ OWASP ZAP   │
        │  & Test  │    │  Analysis  │   │   Security  │
        └──────────┘    └────────────┘   └─────────────┘
              │                │                │
              └────────────────┼────────────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │       Docker         │
                    │      Containers      │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   Microsoft Azure    │
                    │   Deployment Target  │
                    │   (currently stopped)│
                    └──────────────────────┘

              Application
                    │
          ┌─────────┴─────────┐
          ▼                   ▼
     Angular Frontend    Spring Boot API
                              │
                              ▼
                       MongoDB Atlas
```

---

# Application Stack

## Frontend

The frontend is developed using **Angular**.

It communicates with the Spring Boot backend through REST APIs.

```text
Angular
   │
   │ HTTP / REST
   ▼
Spring Boot API
```

## Backend

The backend is developed using **Java and Spring Boot**.

It provides the REST API responsible for application logic, authentication, and data management.

The backend is built with **Maven**.

## Database

The application uses **MongoDB Atlas** as its database platform.

MongoDB Atlas provides the managed MongoDB environment used by the application instead of hosting the database directly inside the application container.

```text
Spring Boot
     │
     │ MongoDB connection
     ▼
MongoDB Atlas
```

Database credentials and connection information are provided through environment variables rather than being hardcoded in the source code.

---

# DevSecOps Pipeline

The main objective of the project is the integration of security into the CI/CD process.

The pipeline is implemented using **GitLab CI/CD** and executed using a **self-hosted GitLab Runner**.

The general workflow is:

```text
Git Push
   │
   ▼
GitLab Repository
   │
   ▼
GitLab CI/CD
   │
   ├── Build
   │
   ├── Automated Tests
   │
   ├── SonarQube Analysis
   │
   ├── Dependency / Vulnerability Checks
   │
   ├── OWASP ZAP Security Testing
   │
   ├── Docker Build
   │
   └── Deployment
            │
            ▼
       Microsoft Azure
```

This allows the project to automatically validate the application before deployment.

---

# GitLab CI/CD

**GitLab** is used as the central platform for:

* Source code management
* Version control
* CI/CD pipeline configuration
* Pipeline execution
* Automated build and testing
* Security and quality checks

The pipeline configuration is defined in:

```text
.gitlab-ci.yml
```

A **self-hosted GitLab Runner** is used to execute the pipeline jobs.

This runner also interacts with the Docker environment used by the DevSecOps tools.

---

# Self-Hosted GitLab Runner

Instead of relying exclusively on GitLab's shared runners, the project uses a **self-hosted GitLab Runner**.

The runner is responsible for executing the CI/CD jobs and interacting with the project's containerized development environment.

During the project, a networking conflict was encountered between the GitLab Runner environment and locally hosted containers.

The issue was diagnosed and resolved by configuring an **external gateway for the SonarQube container**, allowing the runner to communicate correctly with the required services.

This was an important part of the infrastructure and troubleshooting work involved in the project.

---

# Code Quality — SonarQube

**SonarQube** is integrated into the CI/CD workflow for static code analysis.

It is used to inspect the source code and identify potential code-quality issues.

The pipeline can therefore evaluate the code before continuing with later stages.

```text
Source Code
     │
     ▼
 SonarQube
     │
     ├── Static Analysis
     ├── Code Quality
     └── Issues Detection
```

---

# Security Testing

Security is integrated directly into the pipeline rather than being treated as a separate step after development.

## OWASP ZAP

**OWASP ZAP** is used for application security testing.

The project integrates security testing including:

* Active scanning
* Vulnerability detection
* Web application security analysis

This allows security checks to be executed automatically as part of the CI/CD workflow.

---

# Dependency & Vulnerability Checking

The pipeline also includes dependency and vulnerability checking.

The objective is to identify potentially vulnerable dependencies used by the application and assess the security exposure before deployment.

---

# Docker

Docker is used to containerize the application and supporting DevSecOps services.

Containerization provides:

* Reproducible environments
* Isolation between services
* Easier CI/CD execution
* Consistent development and deployment environments

The Docker environment is also used by the GitLab Runner and security/quality services.

---

# Microsoft Azure

The application was previously deployed to **Microsoft Azure** through the CI/CD workflow.

The deployment process was connected to the GitLab pipeline so that the application could be delivered to the cloud environment after passing the required stages.

### Current status

The Azure deployment is **currently stopped**.

This means there is no continuously running public production instance at the moment.

The project nevertheless retains the deployment and CI/CD configuration to demonstrate the complete workflow used during development.

```text
GitLab
   │
   ▼
GitLab CI/CD
   │
   ▼
Docker
   │
   ▼
Microsoft Azure
   │
   └── Deployment currently stopped
```

---

# Technologies

| Category                       | Technologies              |
| ------------------------------ | ------------------------- |
| Frontend                       | Angular                   |
| Backend                        | Java, Spring Boot         |
| Database                       | MongoDB Atlas             |
| Build                          | Maven                     |
| Version Control                | Git                       |
| CI/CD                          | GitLab CI/CD              |
| CI Runner                      | Self-hosted GitLab Runner |
| Containers                     | Docker                    |
| Code Quality                   | SonarQube                 |
| Security Testing               | OWASP ZAP                 |
| Vulnerability Checking         | Dependency / NVD checks   |
| Cloud                          | Microsoft Azure           |
| Operating System / Environment | Linux                     |

---

# Project Structure

```text
devsecops_E-commerce_PS/
│
├── back/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   └── resources/
│   │   └── test/
│   ├── pom.xml
│   └── ...
│
├── front/
│   └── ...
│
├── .gitlab-ci.yml
├── .gitignore
├── docker-compose.yml
└── README.md
```

---

# Configuration & Secrets

Sensitive configuration values are not stored directly in the source code.

For example, the JWT signing secret is provided through an environment variable:

```properties
jwt.secret=${JWT_SECRET}
```

The application therefore expects the secret to be provided by the execution environment.

The same principle is applied to other sensitive CI/CD configuration such as tokens and API keys.

Generated build artifacts such as Maven's `target/` directory are excluded from version control.

---

# Running the Backend Locally

Make sure Java, Maven and MongoDB connectivity are available.

Set the JWT secret:

```bash
export JWT_SECRET="your_secure_secret"
```

Then start the backend:

```bash
cd back
./mvnw spring-boot:run
```

The application can then connect to the configured MongoDB environment.

---

# What This Project Demonstrates

This project brings together several areas of software engineering:

* Full-stack development
* REST API design
* Database integration
* Authentication
* Docker containerization
* CI/CD automation
* Static code analysis
* Dependency security
* Web application security testing
* Linux environments
* GitLab Runner administration
* Container networking
* Cloud deployment with Azure

More importantly, it demonstrates how these components can be integrated into a single **DevSecOps workflow** rather than being treated as isolated technologies.

---

# Author

**Nsibi Dhia Elhack**

Computer Engineering Student — ENISo

Interested in:

* Software Engineering
* Full-Stack Development
* Backend Development
* DevOps / DevSecOps
* Cloud Computing
* Cybersecurity

---

## Project Status

**Development:** Completed
**CI/CD:** Configured with GitLab CI/CD
**Cloud Deployment:** Previously deployed on Azure — currently stopped
**Database:** MongoDB Atlas
**Repository:** GitHub / GitLab
