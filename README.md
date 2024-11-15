# Smart-Quiz-App

Demo Video:-
https://drive.google.com/file/d/1bDHmhyjFDIhARgyenqpwPYZ7th6BqGhu/view?usp=sharing

Quiz Application
A comprehensive Full Stack Quiz Application built using Spring Boot for the backend and HTML, CSS, and JavaScript for the frontend. This application supports quizzes in multiple modules, including Java, Python, and JavaScript, with features for adding, storing, and managing questions, options, and answers.
-------------------------------------
-------------------------------------

**Features**

Frontend :-

->Built with HTML, CSS, and JavaScript for a responsive and user-friendly interface.
->Dynamic quiz rendering with real-time progress tracking.
->Timer-based quiz functionality with score calculation.
->Modular quiz categories: Java, Python, and JavaScript.

Backend :-

->Developed using Spring Boot to handle RESTful API requests.
->CORS configuration for secure communication between frontend and backend.
->Modularized services for managing quiz categories (Java, Python, JavaScript).

Database :-

->Data is stored using MySQL.
->Questions, options, and correct answers are structured in a relational format with Hibernate/JPA.

Data Input:-
->Quiz data (questions, options, correct answers) is added via Postman in JSON format.
->Stored persistently in the MySQL database.

**Tech Stack**

Frontend
   -> HTML
   -> CSS
   -> JavaScript

Backend
    -> Spring Boot
    -> Java
    -> Database
    -> MySQL

**Setup Instructions**

Configure the Database:-

    Install and set up MySQL.
    Create a database for the application:
    CREATE DATABASE QuizApp;

Update the database configuration in the application.properties file:
    spring.application.name=QuizApp
    spring.jpa.hibernate.ddl-auto=update
    spring.datasource.url=jdbc:mysql://localhost:3306/QuizApp
    spring.datasource.username=your_name
    spring.datasource.password=password
    spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
    spring.jpa.show-sql=true
    spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect


Run the Backend
  Ensure you have Java 17+ and Maven installed.
  Build and run the Spring Boot application

Add Quiz Data
  Use Postman to send POST requests to add quiz data.
  Example JSON payload for adding a question:
    json
    Copy code
      {
        "questionText": "What is the output of 2 + 2 in Java?",
        "correctAnswer": "4",
        "options": ["2", "3", "4", "5"]
      }


Launch the Frontend:-

  Open the index.html file in your browser.
  Select the desired quiz module and start the quiz.


API Endpoints

  ->Java Quiz
      GET Questions: GET /api/java/questions
      POST Question: POST /api/java/save
  ->Python Quiz
      GET Questions: GET /api/python/questions
      POST Question: POST /api/python/save
  ->JavaScript Quiz
      GET Questions: GET /api/javascript/questions
      POST Question: POST /api/javascript/save
