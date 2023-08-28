import swaggerJsDocs, { OAS3Definition, OAS3Options } from 'swagger-jsdoc';
import {userExamples, userSchemas} from "./user";
import {errorsGeneralExample, errorsGeneralSchema} from "./errorsGeneral";
import {rolesExamples, rolesSchemas} from "./roles";
import {imageCocktailsSchema, imagesCocktailsExamples} from "./image-cocktails";
import {cocktailsExample, cocktailsSchema} from "./cocktails";

const swaggerDefinition: OAS3Definition = {
    openapi: '3.0.3',
    info: {
        title: 'Cocktail API Documentation',
        version: '1.0.0'
    },
    servers: [
        {
            url: `http://localhost:3002`,
            description: 'Route de development'
        },
        {
            url: `https://cocktailaffairs-production.up.railway.app`,
            description: 'Route of production'
        }
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer'
            }
        },
        schemas: {
            ...cocktailsSchema,
            ...imageCocktailsSchema,
            ...errorsGeneralSchema,
            ...rolesSchemas,
            ...userSchemas,
        },
        examples: {
            ...cocktailsExample,
            ...errorsGeneralExample,
            ...imagesCocktailsExamples,
            ...rolesExamples,
            ...userExamples,
        }
    }
}

const swaggerOptions: OAS3Options = {
    swaggerDefinition,
    apis: ['./src/V1/routes/*.ts']
}

export default swaggerJsDocs(swaggerOptions);

