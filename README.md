Add files via upload
USER REGISTRATION SYSTEM --
A simple application for managing user registration with CRUD operations.

#FEATURES--
1. create new user registrations
2. view all registered users
3. update existing users
4. delete users
5. form validations
6. responsive design

#TECHNOLOGIES--

Back end--
->node.js
->mySql
->RestAPI

Front end--
->html
->css
->js

#Setup Instructions
->node.js
->mysql
->web browser

#Backend setup
1. navigate to the backend directory:
'''bash
cd backend
2. install dependencies:
bash
npm install
3. create a mysql database:
sql
CREATE DATABASE registration_db;
4. create the registration table by running the sql script provided in the backend section.
5. update the database credentials in backend/config/db.js with your mysql username and password.
6. start the back end server:
bash
->npm start

#Frontend setup
1. open the frontend/index.html file in your web browser.
2. the frontend will automatically connect to the backend at http://localhost:5000.

API Endpoints --
1->GET /api/registrations-get all registrations.
2->POST /api/registrations-create a new registration.
3->PUT /api/registrations/:id-update a registration.
4->DELETE /api/registrations/:id-delete a registration.

USAGE:
1.->click "Add new user" to create a new registration
2.->fill in the form with user details
3.->click "save" to submit
4.->use the edit/delete buttons in the table to modify
