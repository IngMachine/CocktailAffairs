import {Components} from "swagger-jsdoc";
import {MessageErrorsEnum} from "../constant/messageOfErrors";

export const userSchemas: Components = {
    User: {
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
    'User Login': {
        type: 'object',
        required: ['email', 'password'],
        properties: {
            email: {
                type: 'string',
                description: 'Email of the user'
            },
            password: {
                type: 'string',
                format: 'password',
                description: 'Password of the user'
            }
        }
    },
    'User View': {
        type: 'object',
        properties: {
            name: {
                type: 'string'
            },
            email: {
                type: 'string'
            },
            description: {
                type: 'string'
            },
            role: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        _id: {
                            type: 'string',
                            format: 'mongo-id'
                        },
                        name: {
                            type: 'string'
                        }
                    }
                }
            },
            createdAt: {
                type: 'string',
                format: 'date-time'
            },
            updatedAt: {
                type: 'string',
                format: 'date-time'
            },
            id: {
                type: 'string',
                format: 'mongo-id'
            }
        }
    },
    'User Created': {
        type: 'object',
        properties: {
            ok: {
                type: 'boolean'
            },
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
    'List Users': {
        type: 'array',
        items: {
            type: 'object',
            properties: {
                name: {
                    type: 'string'
                },
                email: {
                    type: 'string'
                },
                description: {
                    type: 'string'
                },
                role: {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string'
                        },
                        description: {
                            type: 'string'
                        }
                    }
                }
            }
        }

    },
    'Delete User': {
        type: 'object',
        properties: {
            name: {
                type: 'string'
            },
            email: {
                type: 'string'
            },
            password: {
                type: 'string'
            },
            description: {
                type: 'string'
            },
            role: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        _id: {
                            type: 'string',
                            format: 'mongo-id'
                        },
                        name: {
                            type: 'string'
                        }
                    }
                }
            },
            createdAt: {
                type: 'string',
                format: 'date-time'
            },
            updatedAt: {
                type: 'string',
                format: 'date-time'
            },
            id: {
                type: 'string',
                format: 'mongo-id'
            }
        }
    }
}

export const userExamples: Components = {
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
            'ok': true,
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
            'ok':true,
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
            'ok':true,
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
                    'msg': MessageErrorsEnum.NameIsRequired,
                    'path': 'name',
                    'location': 'body'
                },
                'password': {
                    'type': 'field',
                    'msg': MessageErrorsEnum.PasswordIsRequired,
                    'path': 'password',
                    'location': 'body'
                },
                'email': {
                    'type': 'field',
                    'msg': MessageErrorsEnum.EmailIsRequired,
                    'path': 'email',
                    'location': 'body'
                },
                'role': {
                    'type': 'field',
                    'value': [
                        '64d4464d4ba556be73480a5ac'
                    ],
                    'msg': MessageErrorsEnum.InvalidObjectId,
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
                    'msg': MessageErrorsEnum.EmailNotFormatValid,
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
            'msg': MessageErrorsEnum.UserAlReadyExist
        }
    },
    userAdmin: {
        summary: 'User admin',
        value: {
            'email': 'example@google.com',
            'password': '123456'
        }
    },
    userTest: {
        summary: 'User test',
        value: {
            'email': 'test@google.com',
            'password': '123456'
        }
    },
    failedEmail: {
        summary: 'Failed email user not found',
        value: {
            'email': '1example@google.com',
            'password': '123456'
        }
    },
    failedPassword: {
        summary: 'Failed password user not correct',
        value: {
            'email': 'example@google.com',
            'password': '1234561'
        }
    },
    userLoginFieldFailed: {
        summary: 'user without properties',
        value: {}
    },
    userLoginEmailFailed: {
        summary: 'user with email not correct',
        value: {
            'email': 'emailgoogle.com',
            'password': '1234567'
        }
    },
    userAdminResponse: {
        summary: 'user admin login',
        value: {
            'ok': true,
            'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Y2M1Y2EwZDVmM2JjZjc0MTAzNzFkYiIsImlhdCI6MTY5MTYzODA5NiwiZXhwIjoxNjkxNjQ1Mjk2fQ.Hes_cfriNS1OdawU7E1BX0kl1wqwdjZ87CjTpP4owJg',
            'user': {
                'name': 'example',
                'email': 'example@google.com',
                'password': '$2a$08$GbYgQspo4HkZRSTo3foPS.fqppJJgdYw0Li3tNWWbv2jjmZj026lO',
                'description': 'New description',
                'role': [
                    '64cbd63ea0ebec5e5af4f5bf',
                    '64cbd66da0ebec5e5af4f5c3',
                    '64cbd74fa0ebec5e5af4f5c9'
                ],
                'createdAt': '2023-08-04T02:04:16.351Z',
                'updatedAt': '2023-08-07T03:19:52.256Z',
                'id': '64cc5ca0d5f3bcf7410371db'
            }
        }
    },
    userTestResponse: {
        summary: 'User test login',
        value: {
            'ok': true,
            'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZDA1M2EzMWUzYmU0NjY2MmE2OTU0YSIsImlhdCI6MTY5MTYzOTA1MywiZXhwIjoxNjkxNjQ2MjUzfQ.ue_D-reYwhYM9VKy0O4ldG7nNEHs599RaZWJ3R92u5Y',
            'user': {
                'name': 'test',
                'email': 'test@google.com',
                'password': '$2a$08$f0xackA2CInRBK2aKXDgBu1WvjdBj55A3noCc.H.jhBlDKshPawVu',
                'description': 'New description',
                'role': [
                    '64cbd75fa0ebec5e5af4f5cb',
                    '64cbd74fa0ebec5e5af4f5c9'
                ],
                'createdAt': '2023-08-07T02:14:59.850Z',
                'updatedAt': '2023-08-08T18:19:34.473Z',
                'id': '64d053a31e3be46662a6954a'
            }
        }
    },
    userLoginErrorField: {
        summary: 'Errors in field',
        value: {
            'ok': false,
            'errors': {
                'email': {
                    'type': 'field',
                    'msg': MessageErrorsEnum.EmailIsRequired,
                    'path': 'email',
                    'location': 'body'
                },
                'password': {
                    'type': 'field',
                    'msg': MessageErrorsEnum.PasswordIsRequired,
                    'path': 'password',
                    'location': 'body'
                }
            }
        }
    },
    userLoginErrorEmail: {
        summary: 'Error in field format email',
        value: {
            'ok': false,
            'errors': {
                'email': {
                    'type': 'field',
                    'value': 'emailgoogle.com',
                    'msg': MessageErrorsEnum.EmailNotFormatValid,
                    'path': 'email',
                    'location': 'body'
                }
            }
        }
    },
    userFailedEmailOrPassword: {
        summary: 'Error in the email or password',
        value: {
            'ok': false,
            'msg': MessageErrorsEnum.EmailOrPasswordIncorrect
        }
    },
    userViewResponse: {
        summary: 'User view response',
        value: {
            'name': 'test',
            'email': 'test@google.com',
            'description': 'New description',
            'role': [
                {
                    '_id': '64cbd75fa0ebec5e5af4f5cb',
                    'name': 'VISITOR'
                },
                {
                    '_id': '64cbd74fa0ebec5e5af4f5c9',
                    'name': 'CUSTOMER'
                }
            ],
            'createdAt': '2023-08-07T02:14:59.850Z',
            'updatedAt': '2023-08-08T18:19:34.473Z',
            'id': '64d053a31e3be46662a6954a'
        }
    },
    userViewErrorId: {
        summary: 'id not correct for user',
        value: {
            'ok': false,
            'errors': {
                'id': {
                    'type': 'field',
                    'value': 'asw',
                    'msg': MessageErrorsEnum.InvalidObjectId,
                    'path': 'id',
                    'location': 'params'
                }
            }
        }
    },
    userUpdateErrorId: {
        summary: 'Error in fields of updates',
        value: {
            "ok": false,
            "errors": {
                ":id": {
                    "type": "field",
                    "msg": MessageErrorsEnum.InvalidObjectId,
                    "path": "id",
                    "location": "params"
                },
                "name": {
                    "type": "field",
                    "msg": MessageErrorsEnum.NameIsRequired,
                    "path": "name",
                    "location": "body"
                },
                "description": {
                    "type": "field",
                    "msg": MessageErrorsEnum.DescriptionIsTooShort,
                    "path": "description",
                    "location": "body"
                }
            }
        }
    },
    listUsersResponse: {
        summary: 'List users registered',
        value: [
            {
                "name": "example",
                "email": "example@google.com",
                "description": "New description",
                "role": [
                    {
                        "name": "ADMIN",
                        "description": "Administrator role with full privileges and complete access to the system. Responsible for managing and supervising all operations of the system, including the management of cocktails, bartenders, bookings, and other users."
                    },
                    {
                        "name": "BARTENDER",
                        "description": "Role for professional bartenders. Bartenders have access to functions required to manage their profile, view assigned bookings, and update their availability for events."
                    },
                    {
                        "name": "CUSTOMER",
                        "description": "Role for registered users who can make bookings for bartender services and explore available cocktails on the platform. They can view and manage their own bookings and profiles."
                    }
                ]
            },
            {
                "name": "example",
                "email": "example1@google.com",
                "description": "New description",
                "role": [
                    {
                        "name": "DATA ANALYST",
                        "description": "Role for users responsible for analyzing data generated by the system. They have access to reports and statistics to gain insights into booking trends, cocktail preferences, among others."
                    },
                    {
                        "name": "ADMIN",
                        "description": "Administrator role with full privileges and complete access to the system. Responsible for managing and supervising all operations of the system, including the management of cocktails, bartenders, bookings, and other users."
                    },
                    {
                        "name": "MARKETING",
                        "description": "Role for users in charge of marketing and promotional strategies. They have access to featured cocktail lists and can coordinate marketing campaigns to increase the website's visibility."
                    }
                ]
            }
        ]
    },
    deleteUserResponse: {
        summary: 'Delete a user successfully',
        value: {
            "name": "Example Customer y Visitor",
            "email": "exampleVisitor@google.com",
            "password": "$2a$08$HRX610eY9RZ70rA4Rs29ou4nq7rRAlR5OEjIbGnHfh4OKJTTlHD2y",
            "description": "update description customer and visitor",
            "role": [
                "64cbd75fa0ebec5e5af4f5cb"
            ],
            "createdAt": "2023-08-10T00:01:36.493Z",
            "updatedAt": "2023-08-10T00:02:02.287Z",
            "id": "64d428e071fc85bedefc33b6"
        }
    },
    userNotFound: {
        summary: 'User does not exist',
        value: {
            ok: false,
            msg: MessageErrorsEnum.UserNotFound
        }
    }
}