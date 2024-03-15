<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    <h1>StarMobile Customer Portal</h1>
    <p>Welcome to StarMobile, the customer portal for managing your telecommunications services! This application allows users to create and manage their accounts with ease. Whether you need to add or remove phone plans, manage devices, or view your monthly bill breakdown, StarMobile has got you covered.</p>
  <h2>Functional Requirements</h2>
    <ul>
        <li>Users can add and remove phone plans from their account.</li>
        <li>At least three different plans are available, each with unique features.</li>
        <li>Users can have multiple plans on their account.</li>
        <li>Plans have different device limits, prices, and names.</li>
        <li>Users can add and remove devices from their account.</li>
        <li>Devices should have a unique phone number, and users can assign any phone number to any device.</li>
        <li>Users can see a breakdown of their monthly bill based on their plans.</li>
        <li>Users can sign into their account and only manage their own account.</li>
        <li>User A cannot view/edit user B’s account.</li>
    </ul>

  <h2>Technologies Used</h2>
    <p>StarMobile is built using the following technologies:</p>
    <ul>
        <li>Frontend: Angular 17</li>
        <li>Backend: Java 17 Spring Boot</li>
        <li>Database: MySQL Workbench</li>
        <li>Java Maven</li>
        <li>HTML 5</li>
        <li>CSS 3</li>
        <li>JavaScript</li>
    </ul>

  <h2>Bonus Features</h2>
    <ul>
        <li>Once packaged, application can be deployed to AWS.</li>
        <li>CI/CD pipeline set up and used with GitHub.</li>
    </ul>

  <h2>Non-Functional Requirements</h2>
    <ul>
        <li>Code is well-commented.</li>
        <li>Code follows appropriate coding conventions.</li>
        <li>Code is easy to read, navigate, and maintain.</li>
        <li>Exception handling is implemented effectively.</li>
        <li>Code is designed for easy testing.</li>
        <li>All Java code console prints are handled by a logger.</li>
    </ul>

  <h2>Development Requirements</h2>
    <ul>
        <li>Version control using GitHub with an effective branching strategy.</li>
        <li>README.md available on GitHub.</li>
        <li>Java code tested using JUnit and Mockito for database and backend functionality.</li>
        <li>Testing completed for code coverage of at least 70% for all classes containing business logic.</li>
    </ul>

  <h2>UI/UX Requirements</h2>
    <ul>
        <li>Professional-looking website design.</li>
        <li>Intuitive navigation.</li>
        <li>Clear communication of errors and success messages to the user.</li>
    </ul>

  <h2>Getting Started</h2>
    <ol>
        <li>Clone the repository: <code>git clone https://github.com/nasser3003/StarMobile.git</code></li>
        <li>Navigate to the project directory.</li>
        <li>Start MySQL and run the 'db_base_schema_creation.sql' from the starmobile/src/main/resources folder.</li>
        <li>Run the com.starmoble backend app from the Spring Boot Dashboard.</li>
        <li>Run ng serve --open from the StarMobile\application-frontend> directory.</li>
        <li>The application will automatically open the default browser and run from http://localhost:4200</li>
    </ol>

  <h2>Project Team</h2>
    <p>StarMobile is developed by a 4-member student developer team:</p>
    <ul>
        <li>Team Lead: Josh Holland</li>
        <li>Frontend Developer: Hunter Halstead</li>
        <li>Backend Developer: Abdelnasser Abdrabbo</li>
        <li>Database Developer: Rod Palmer</li>
    </ul>

  <h2>License</h2>
    <p>This project is licensed under the General Organization of Software Technicians (GOST).</p>
</body>
</html>
