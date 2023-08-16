import swaggerJsDocs, { OAS3Definition, OAS3Options } from 'swagger-jsdoc';

const swaggerDefinition: OAS3Definition = {
    openapi: '3.0.3',
    info: {
        title: 'Cocktail API Documentation',
        version: '1.0.0'
    },
    servers: [
        {
            url: "http://localhost:3200"
        }
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer'
            }
        }
    }
}

const swaggerOptions: OAS3Options = {
    swaggerDefinition,
    apis: ['./src/V1/routes/*.ts']
}

export default swaggerJsDocs(swaggerOptions);

