CRUD Application

This is a simple CRUD (Create, Read, Update, Delete) application built using Node.js, Express, and MongoDB. The application allows users to interact with a MongoDB database, performing CRUD operations through a web interface.

https://cscloud6-188.lnu.se/snippetapp/

Features

	•	User Management: Supports user sessions, authentication, and persistent user data.
	•	CRUD Operations: Provides routes to create, read, update, and delete records in the MongoDB database.
	•	Secure: Utilizes Helmet.js for setting secure HTTP headers, with a content security policy configured to trust specific external resources.
	•	Session Handling: Express session middleware is used to handle user sessions, with flash messages for user feedback.
	•	Logging: Uses Morgan for HTTP request logging.
	•	Error Handling: Custom error handling for common HTTP errors (404, 403, 500) and other application errors.
	•	View Engine: EJS is used as the template engine for rendering dynamic views.

Prerequisites

To run this application, you will need:

	•	Node.js
	•	MongoDB
	•	A .env file with the following environment variables:
	•	DB_CONNECTION_STRING: Your MongoDB connection string.
	•	PORT: The port on which the application should run.
	•	NODE_ENV: Set to production for production environments or development for development.

Installation

  1. Clone the repository:
  git clone https://github.com/haochen8/crud.git
  2. Navigate to the project directory:
  cd crud
  3. npm install
  4.	Set up your .env file with the required environment variables.
	5.	Start the application: 
  npm start
6.	The application will be accessible at http://localhost:<PORT>.

File Structure

	•	/config: Contains configuration files for database and session options.
	•	/models: Defines the MongoDB models, including the UserModel.
	•	/routes: Handles route definitions for the application.
	•	/views: Contains EJS view templates for rendering HTML pages.
	•	/public: Contains static files such as CSS and JavaScript.

Usage

	1.	User Registration and Login: Users can register and log in to manage their own data.
	2.	CRUD Operations: Once logged in, users can create, view, update, and delete records in the database.
	3.	Sessions: User sessions are maintained across page loads, with flash messages providing feedback for actions.

Security

	•	Helmet.js: Enhances security by setting various HTTP headers.
	•	Session Management: Uses secure session cookies with session options tailored for production.

Error Handling

The application handles common HTTP errors:

	•	404 Not Found: Displays a custom 404 page when a route is not found.
	•	403 Forbidden: Handles forbidden access attempts.
	•	500 Internal Server Error: Displays a generic error page in production environments, while providing detailed error information in development.

Author

	•	Hao Chen
	•	Version: 1.0.0
	•	Contact: hc222ig@student.lnu.se

License

This project is licensed under the MIT License.

Contributions

Feel free to fork the repository and submit pull requests if you’d like to contribute.
