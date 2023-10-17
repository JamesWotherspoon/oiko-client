# SmartSaver.uk
# Full Stack Node Express Server and React Frontend

This is the smartsaver.uk project. A full stack web applications using Node.js, Express.js, mySQL, and React. It follows a client-server architecture where the frontend and backend communicate through APIs.

Server:

- File structure with directories Middleware, Routes, Controller, and Models, providing a separation of concerns.
- Implemented generic middleware for basic security measures:
  - Content Security Policy (CSP) to set restrictions on resource loading and prevent cross-site scripting attacks.
  - Rate limiter to protect against abuse.
  - Failsafe error handler to catch and handle any unhandled errors.
- Basic server setup with necessary dependencies and configuration.
  
Client:

- Initialized with create-react-app.
- React Router setup for client-side routing, including a redirect logic for authentication pages (which can be easily modified or removed).
- Basic API services for making server requests.
