import swaggerJsDocs, { OAS3Definition, OAS3Options } from 'swagger-jsdoc';

import {bartenderExample, bartenderSchema} from "./bartender";
import {cocktailsExample, cocktailsSchema} from "./cocktails";
import {imageCocktailsSchema, imagesCocktailsExamples} from "./image-cocktails";
import {errorsGeneralExample, errorsGeneralSchema} from "./errorsGeneral";
import {rolesExamples, rolesSchemas} from "./roles";
import {userExamples, userSchemas} from "./user";

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
            ...bartenderSchema,
            ...cocktailsSchema,
            ...imageCocktailsSchema,
            ...errorsGeneralSchema,
            ...rolesSchemas,
            ...userSchemas,
        },
        examples: {
            ...bartenderExample,
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

