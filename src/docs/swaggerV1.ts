import swaggerJsDocs, { OAS3Definition, OAS3Options } from 'swagger-jsdoc';

import {bartenderExample, bartenderSchema} from "./bartender";
import {bookingExample, bookingSchema} from "./booking";
import {cocktailsExample, cocktailsSchema} from "./cocktails";
import {customerExamples, customerSchema} from "./customer";
import {errorsGeneralExample, errorsGeneralSchema} from "./errorsGeneral";
import {imageCocktailsSchema, imagesCocktailsExamples} from "./image-cocktails";
import {orderExample, orderSchema} from "./order";
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
            ...bookingSchema,
            ...cocktailsSchema,
            ...customerSchema,
            ...imageCocktailsSchema,
            ...errorsGeneralSchema,
            ...orderSchema,
            ...rolesSchemas,
            ...userSchemas,
        },
        examples: {
            ...bartenderExample,
            ...bookingExample,
            ...cocktailsExample,
            ...customerExamples,
            ...errorsGeneralExample,
            ...imagesCocktailsExamples,
            ...orderExample,
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

