
## Quick Start Guide

### 1. Prerequisites
Ensure you have the following installed on your machine:
* Node.js (v16 or higher)
* MySQL Server
* npm

---

### 2. Backend Setup
1.  Navigate to the backend folder:
    ```bash
    cd ecomm-backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Configure Database Credentials:
    * Open config/config.json.
    * Update the username and password fields with your local MySQL credentials.
4.  Initialize Database and Data:
    Run the following command to automatically create the database, run migrations (tables), and seed initial data (products and test user):
    ```bash
    npm run setup
    ```
5.  Start the Server:
    ```bash
    npm start
    ```

---

### 3. Frontend Setup
1.  Navigate to the frontend folder:
    ```bash
    cd ecomm
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the Application:
    ```bash
    npm start
    ```
    The app should now be running at http://localhost:3000.

---

## Database Management (Sequelize)

If you need to perform manual database operations, use these commands in the ecomm-backend folder:

* Create Database: npx sequelize-cli db:create
* Run Migrations: npx sequelize-cli db:migrate
* Run Seeders: npx sequelize-cli db:seed:all
* Reset Everything: npx sequelize-cli db:migrate:undo:all && npm run setup

---

## Test Credentials
Once you have run the seeder, you can log in with the following account:
* Email: admin@example.com
* Password: password123

---

## Project Structure
* /ecomm: React Frontend application.
* /ecomm-backend: Node.js server with Sequelize ORM.
    * /migrations: SQL table definitions.
    * /seeders: Initial data for products and users.
    * products.json: Source data for product seeding.