# Vue and Node.js Application with PostgreSQL Database

## Overview
This project is a full-stack web application built with Vue.js for the frontend, Node.js for the backend, and PostgreSQL for the database. This README will guide you through setting up the project and understanding its structure.

## Features
- Vue.js frontend with components for a responsive and interactive user interface.
- Node.js backend providing RESTful APIs to interact with the database.
- PostgreSQL database for storing and managing application data.
- User authentication and authorization using jwt tokens
- CRUD operations for managing resources


## Prerequisites
- Node.js and npm installed on your system.
- PostgreSQL database installed and running.

## Setup
1. **Clone the repository:**
   ```bash
   git clone ....
   cd your-project
   ```

2. **Install dependencies:**
   ```bash
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Database setup:**
    - Create a PostgreSQL database and note down the connection details.
    - Configure the database connection in the backend. You can find the database configuration file in `backend/database.js`.

4. **Start the backend server:**
   ```bash
   # From the root directory of the project
   cd backend
   node express
   ```

5. **Start the frontend development server:**
   ```bash
   # From the root directory of the project
   cd frontend
   npm run serve
   ```

6. **Access the application:**
   Open your web browser and navigate to `http://localhost:8080` to access the application.

## Project Structure
- **backend**: Contains the Node.js backend code.
    - **database.js**: Database connection configuration, checks if required tables exist in db and if not, creates them
    - **express.js**: Rbackend API for user authentication, post creation, retrieval, update, and deletion, utilizing JSON Web Tokens (JWTs) for authentication and authorization, and interacts with a PostgreSQL database for data storage and retrieval.

- **frontend**: Contains the Vue.js frontend code.
    - **public**: Static assets and index.html.
    - **src**: Vue.js application source code.
        - **assets**: Images, styles, and other static assets.
        - **components**: Reusable Vue components.
        - **router**: Vue Router configuration.
        - **store**: Vuex store configuration.
        - **views**: Vue components for different pages.

    
## Contact
For any questions feel free to contact [mattias.kimst@mail.ee](mailto:mattias.kimst@mail.ee).
