# node-express-mysql-crud

This project demonstrates the usage of MySql in node js through CRUD operations that are performed on a table storing details about books. The project goes one step further by automatically creating the database and tables on first starting the server.

The project provides additional functionality to the WHERE and SORT clause by allowing these values to be received from the client in the form of json that can be embedded in the request query. This allows developers to minimize repetitive code in the case of specific filtering of records. This idea extends to the limit and offset that is used in the SELECT sql clause, however these values will be received as strings that then gets validated and converted to integers.

The project also includes a custom validation utility function that uses express validator middleware to easily perform validations on all incoming requests.

### Features include:

- auto create database on first start
- auto create tables on first start
- books crud api
- common utilities
- dev and production npm scripts
- env variable management
- route management
- shutdown middleware
- validation

### Requirements:

- node js v12 (current version: 12.18.0)

### Usage:

- clone repository or download source code
- create .env file in config dir and add environment variables (see: /config/.env.example)
- open project directory in terminal
- npm install
- npm run dev

### Production:

To start the server in production mode run `npm run start`. Note that the environment variables are setup for the development environment and will not be available in production mode. In production, environment variables should be configured on the host server.

### Available scripts:

In the project directory, you can run:

### `npm run start`

Starts the server in production mode

### `npm run dev`

Starts the server in development mode
