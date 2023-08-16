import swaggerJsDocs, { OAS3Definition, OAS3Options } from 'swagger-jsdoc';
import {MessageErrorsEnum} from "../constant/messageOfErrors";

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
            user: {
                type: 'object',
                required: ['name', 'email', 'password'],
                properties: {
                    name: {
                        type: 'string',
                        description: 'Name of the user'
                    },
                    email: {
                        type: 'string',
                        description: 'Email of the user'
                    },
                    password: {
                        type: 'string',
                        format: 'password',
                        description: 'Password of the user'
                    },
                    role: {
                        type: 'array',
                        items: {
                            type: 'string',
                            format: 'mongo-id'
                        }
                    },
                    description: {
                        type: 'string',
                        description: 'Description of the user'
                    }
                }
            },
            userCreated: {
                type: 'object',
                properties: {
                    token: {
                        type: 'string',
                        format: 'jwt'
                    },
                    user: {
                        type: 'object',
                        properties: {
                            name: {
                                type: 'string',
                                description: 'Name of the user'
                            },
                            email: {
                                type: 'string',
                                description: 'Email of the user'
                            },
                            password: {
                                type: 'string',
                                format: 'password',
                                description: 'Password of the user'
                            },
                            role: {
                                type: 'array',
                                items: {
                                    type: 'string',
                                    format: 'mongo-id'
                                }
                            },
                            description: {
                                type: 'string',
                                description: 'Description of the user'
                            },
                            createdAt:{
                                type: 'string',
                                format: 'date-time'
                            },
                            updatedAt:{
                                type: 'string',
                                format: 'date-time'
                            }
                        }
                    },
                }
            },
            errorsField: {
                type: 'object',
                properties: {
                    ok: {
                        type: 'boolean',
                        default: false
                    },
                    errors: {
                        type: 'object',
                        properties: {
                            nameField: {
                                type: 'object',
                                properties: {
                                    type: {
                                        type: 'string'
                                    },
                                    msg: {
                                        type: 'string'
                                    },
                                    path: {
                                        type: 'string'
                                    },
                                    location: {
                                        type: 'string'
                                    }
                                }
                            }
                        }
                    }
                }
            },
            errorResponse: {
                type: 'object',
                properties: {
                    ok: {
                        type: 'boolean',
                        default: false
                    },
                    msg: {
                        type: 'string',
                    }
                }
            }
        },
        examples: {
            createUserBasic: {
                summary: 'Create a user basic',
                value: {
                    name: 'basic',
                    email: 'basic@google.com',
                    password: '123456'
                }
            },
            createUserWithDescription: {
                summary: 'Create user with description',
                value: {
                    'name': 'basic + description',
                    'email': 'basicdescription@google.com',
                    'password': '123456',
                    'description': 'description add'
                }
            },
            createUserWithRole: {
                summary: 'Create user with role',
                value: {
                    'name': 'user with role customer',
                    'email': 'customer@google.com',
                    'password': '123456',
                    'description': 'description add',
                    'role': ['64cbd74fa0ebec5e5af4f5c9']
                }
            },
            userAlreadyExist: {
                summary: 'User registered previously',
                value: {
                    'name': 'basic',
                    'email': 'basic@google.com',
                    'password': '123456'
                }
            },
            userErrorInField: {
                summary: 'User errors in fields',
                value: {
                    'role': ['64d4464d4ba556be73480a5ac']
                }
            },
            userErrorInEmailFormat: {
                summary: 'User errors in email format',
                value: {
                    'name': 'basic',
                    'email': 'testinggoogle.com',
                    'password': '123456',
                    'role': ['64d4464d4ba556be73480a5c', '64d4464d4ba556be73480a5c']
                }
            },
            userBasicCreated: {
                summary: 'User basic created',
                value: {
                    'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZDQ0YzMwNGJhNTU2YmU3MzQ4MGE1ZiIsImlhdCI6MTY5MTYzNDczNiwiZXhwIjoxNjkxNjQxOTM2fQ.NaF7C3ak9iU68ohLWbXrN4Xgi3MDzmnMe0L9p_Wh2aQ',
                    'user': {
                        'name': 'basic',
                        'email': 'basic@google.com',
                        'password': '$2a$08$njM.RzoHDmKYjmbuHEODZOEDcHhZdWGuf9.R4Rffiwzt6EIdMg19a',
                        'description': 'Description for default',
                        'role': [
                            '64cbd75fa0ebec5e5af4f5cb'
                        ],
                        'createdAt': '2023-08-10T02:32:16.387Z',
                        'updatedAt': '2023-08-10T02:32:16.387Z',
                        'id': '64d44c304ba556be73480a5f'
                    }
                }
            },
            userWithDescription: {
                summary: 'User with description',
                value: {
                    'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZDQ0YzZkNGJhNTU2YmU3MzQ4MGE2MyIsImlhdCI6MTY5MTYzNDc5NywiZXhwIjoxNjkxNjQxOTk3fQ.OavdkD-iXOjSQCAsLsesMEEnMvyeHbRF2dnPoOIw2Pg',
                    'user': {
                        'name': 'basic + description',
                        'email': 'basicdescription@google.com',
                        'password': '$2a$08$7zLXpf2.4agXYqB7mcLHUO5Geszmt3e3/TiyVRrCZwggCMhYFMM/G',
                        'description': 'description add',
                        'role': [
                            '64cbd75fa0ebec5e5af4f5cb'
                        ],
                        'createdAt': '2023-08-10T02:33:17.722Z',
                        'updatedAt': '2023-08-10T02:33:17.722Z',
                        'id': '64d44c6d4ba556be73480a63'
                    }
                }
            },
            userWithRole: {
                summary: 'User with role',
                value: {
                    'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZDQ0Y2M1NGJhNTU2YmU3MzQ4MGE2NyIsImlhdCI6MTY5MTYzNDg4NSwiZXhwIjoxNjkxNjQyMDg1fQ.XdQ6-hyZP_Lo-fzm6aAngyhtM5VQ6RGxkLaKuqXVE4Q',
                    'user': {
                        'name': 'user with role customer',
                        'email': 'customer@google.com',
                        'password': '$2a$08$EHHvCwH.ARJPaBRQbTAokOu6W3zudyyDZ5/fgssP24t36giZ4Ee1i',
                        'description': 'description add',
                        'role': [
                            '64cbd74fa0ebec5e5af4f5c9'
                        ],
                        'createdAt': '2023-08-10T02:34:45.434Z',
                        'updatedAt': '2023-08-10T02:34:45.434Z',
                        'id': '64d44cc54ba556be73480a67'
                    }
                }
            },
            userErrorsInFieldResponse: {
                summary: 'Errors in fields of creating a user',
                value: {
                    'ok': false,
                    'errors': {
                        'name': {
                            'type': 'field',
                            'msg': 'The name is required',
                            'path': 'name',
                            'location': 'body'
                        },
                        'password': {
                            'type': 'field',
                            'msg': 'The password is required',
                            'path': 'password',
                            'location': 'body'
                        },
                        'email': {
                            'type': 'field',
                            'msg': 'The email is required',
                            'path': 'email',
                            'location': 'body'
                        },
                        'role': {
                            'type': 'field',
                            'value': [
                                '64d4464d4ba556be73480a5ac'
                            ],
                            'msg': 'Invalid ObjectId',
                            'path': 'role',
                            'location': 'body'
                        }
                    }
                }
            },
            userErrorInEmailFormatResponse: {
                summary: 'Errors in email format',
                value: {
                    'ok': false,
                    'errors': {
                        'email': {
                            'type': 'field',
                            'value': 'testinggoogle.com',
                            'msg': 'The email not valid format',
                            'path': 'email',
                            'location': 'body'
                        }
                    }
                }
            },
            userAlreadyExistsResponse: {
                summary: 'User already exists',
                value: {
                    'ok': false,
                    'msg': MessageErrorsEnum.userAlReadyExist
                }
            }
        }
    }
}

const swaggerOptions: OAS3Options = {
    swaggerDefinition,
    apis: ['./src/V1/routes/*.ts']
}

export default swaggerJsDocs(swaggerOptions);

