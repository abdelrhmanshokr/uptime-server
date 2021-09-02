const swaggerJsDoc = require('swagger-jsdoc');


// swagger options
const swaggerOptions = {
    definition: {
        openapi: '3.0.n',
        info: {
            title: "uptime monitor",
            description: "RESTful apis to monitor a given URL whether if's up or down",
            contact: {
                name: "uptime server"
            },
            servers: ["http://localhost:5000"]
        },
        components: {
            securitySchemes: {
              jwtAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT'
              },
            }
        },
    },
    apis: ['./routes/*.js']
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);


module.exports = swaggerDocs;