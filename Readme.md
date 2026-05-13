# Full-Stack Docker Application — CSC424 Final Exam

**Author:** Kevin A. Concepcion-Bustillo  
**Institution:** Southern Connecticut State University

This repository contains a containerized full-stack application integrated with a GitHub Actions CI/CD pipeline for automated testing and deployment.

---

## DevOps Setup

### Local Execution

To run the entire application stack locally for development or testing, ensure Docker and Docker Compose are installed and execute the following command from the root of the repository:

```bash
docker compose up --build -d
```

---

## Access and Testing

The application is configured to be accessible on **Port 80**. You can verify that the services are running correctly by testing the following URLs in your web browser:

- **Frontend User Interface:** http://localhost
- **Backend API Service:** http://localhost/api/ping

---

## Service Overview

The application architecture utilizes three primary services to handle web traffic and data processing:

- **Frontend:** A web-based user interface that interacts with the backend API.
- **Backend:** A RESTful service that provides API endpoints and handles application logic.
- **Nginx:** Functions as a high-performance reverse proxy and web server, routing incoming requests to either the frontend or backend service based on the URL path.

---

## CI/CD Pipeline

The project uses GitHub Actions to automate the integration and deployment process through the `.github/workflows/deploy-qa.yml` workflow. The pipeline operates as follows:

1. **Automation Trigger:** The workflow is automatically initiated whenever code is pushed to the `main` branch.
2. **Build and Push:** The pipeline builds new Docker images for the frontend and backend and pushes them to a container registry (such as Docker Hub or GHCR).
3. **Automated Deployment:** Once the images are pushed, the pipeline uses SSH to connect to the QA server, pulls the latest images, and restarts the environment using `docker compose up -d`.
4. **Security:** All sensitive information, including SSH keys and registry credentials, is stored securely within GitHub Secrets, ensuring no credentials are hardcoded in the source code.
