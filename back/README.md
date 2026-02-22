# 🛒 E-Commerce DevSecOps Project (PS)

Ce projet est une application d'E-commerce Fullstack développée avec **Java Spring Boot** (Backend) et **Angular** (Frontend). L'objectif principal est de démontrer l'intégration d'une pipeline **DevSecOps** complète pour sécuriser le cycle de vie du développement logiciel (SDLC).

## 🚀 Architecture Technique
* **Frontend:** Angular (Port 4200) - Inclut le composant validé `ProductListComponent` [cite: 2026-02-15].
* **Backend:** Spring Boot (Port 8080) avec MongoDB.
* **Infrastructure:** Docker & GitLab Runner sur Ubuntu (Dell G15).

## 🛡️ Pipeline DevSecOps (Les 6 Étapes)

Le fichier `.gitlab-ci.yml` est configuré pour exécuter automatiquement les contrôles suivants :

1.  **Build**: Compilation du Backend avec Maven.
2.  **Test**: Exécution des tests unitaires avec une base de données MongoDB en service.
3.  **SAST (SonarQube)**: Analyse statique de la qualité du code via `http://172.17.0.1:9000`.
4.  **SCA (Dependency-Check)**: Analyse des vulnérabilités connues dans les bibliothèques tierces.
5.  **DAST (OWASP ZAP)**: Scan de sécurité dynamique attaquant l'application en cours d'exécution (Front & Back).
6.  **Deploy**: Simulation du déploiement après validation de tous les contrôles de sécurité.



## 📊 Rapports de Sécurité
Les rapports de sécurité sont générés à chaque exécution et disponibles dans les **Artifacts GitLab** :
* `rapport_zap_front.html` : Analyse des vulnérabilités de l'interface Angular.
* `rapport_zap_back.html` : Analyse des API Spring Boot via l'Automation Framework.
* `dependency-check-report.html` : Inventaire des CVE dans les dépendances Maven.

## 🛠️ Configuration Locale
Pour exécuter les scans ZAP localement sur votre machine :
1.  Lancer le Backend sur le port 8080.
2.  Lancer le Frontend sur le port 4200 (`ng serve --host 0.0.0.0`).
3.  Exécuter le scan via Docker :
    ```bash
    docker run -v $(pwd)/security-reports:/zap/wrk/:rw -t ghcr.io/zaproxy/zaproxy:stable zap-baseline.py -t [http://172.17.0.1:4200](http://172.17.0.1:4200) -r rapport_zap_front.html
    ```

## 📝 Notes de Développement
* La forme du composant `ProductListComponent` est validée et conforme aux exigences de l'UI [cite: 2026-02-15].
* Le Backend utilise une configuration CORS spécifique pour autoriser les requêtes provenant de la passerelle Docker (`172.17.0.1`).