import app from "./app.js";

const PORT = process.env.PORT || 3001;  
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
// This is the entry point for the report service.
// It imports the app from app.js and starts the server on the specified port.
// The server listens for incoming requests and logs the port it's running on.
// The PORT is set to an environment variable or defaults to 3000 if not specified.
// This allows the report service to be easily configured and run in different environments.
// The app is expected to handle routes and middleware as defined in app.js, including error handling
// and JSON parsing.
// The server will respond to requests for generating reports, such as CSV or JSON formats,
// based on the routes defined in the report service.

// This setup allows for a modular and maintainable architecture, where the report service can be