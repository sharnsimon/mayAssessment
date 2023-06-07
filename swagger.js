var swagger = require('swagger-ui-express');
var swaggerJSDoc = require('swagger-jsdoc');
const swaggerOptions = {
    swaggerDefinition: {
        "securityDefinitions": {
            "basicAuth": {
                "description": '',
                "type": 'basic',
                "name": 'Authorization',
                "in": 'header',
            },
            "Bearer Authorization": {
                "description": 'Enter JWT Bearer token **_only_**',
                "type": 'apiKey',
                "name": 'Authorization',
                "in": 'header',
            }
        },
        "info": {
            "title": "Zenbasket API",
            "description": "This is a sample Zenbasket API.The Zenbasket API is organized around REST. Our API has predictable resource-oriented URLs, accepts JSON-encoded request bodies, returns JSON-encoded responses, and uses standard HTTP response codes, authentication, and verbs.",
            // "termsOfService": "http://swagger.io/terms/",
            "contact": {
                "email": "admin@centizen.com"
            },
            // "license": {
            //     "name": "Apache 2.0",
            //     "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
            // },
            "consumes": [
                "application/json"
            ],
            "produces": [
                "application/json"
            ],
            "version": "1.0.0",

            // "components": {
            //   "securitySchemes": {
            //     "bearerAuth": {
            //       "type": "http",
            //       "scheme": "bearer",
            //       "bearerFormat": "JWT"
            //     },
            //     "basicAuth": {
            //       "type": "http",
            //       "scheme": "basic",
            //     },
            //   }
            // },
        },
        // "security": [
        //   {
        //     "Bearer Authorization": []
        //   }
        // ]
        // servers: [{ url: 'http://localhost:4900' }]
    },
    //apis: ['./controllers/v1/products/product.controller.js']
    // apis: ['./swaggerDoc/*.yaml'],
    apis:['./swaggerDoc/addEmployee.controller.yaml']
}
const swaggerDoc = swaggerJSDoc(swaggerOptions);
app.use('/phase2/swagger', swagger.serve, swagger.setup(swaggerDoc));
