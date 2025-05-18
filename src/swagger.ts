import swaggerAutogen from "swagger-autogen";

const doc = {
    info: {
        title: "My API",
        description: "Description",
    },
    host: "localhost:3333",
    tags: [
        {
            description: "Rotas do CRUD de usuários",
            name: "User",
        },
    ],
};

const outputFile = "./docs.json";
const routes = ["./index.ts"];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen({ openapi: "3.0.0" })(outputFile, routes, doc);
