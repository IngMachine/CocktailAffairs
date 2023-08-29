import {Components} from "swagger-jsdoc";
import {MessageErrorsEnum} from "../constant/messageOfErrors";

export const bartenderSchema: Components = {
    'Bartender Created': {
        type: 'object',
        required: ['age', 'specialties', 'professionalDescription'],
        properties: {
            age: { type: 'string' },
            specialties: {
                type: 'array',
                items: {
                    type: 'string'
                }
            },
            professionalDescription: { type: 'string' },
            isAvailable: { type: 'boolean' },
            image: { type: 'string', format: 'base64' }
        }
    },
    'Bartender Created Admin': {
        type: 'object',
        required: ['user', 'age', 'specialties', 'professionalDescription'],
        properties: {
            user: { type: 'string' },
            age: { type: 'string' },
            specialties: {
                type: 'array',
                items: {
                    type: 'string'
                }
            },
            professionalDescription: { type: 'string' },
            isAvailable: { type: 'boolean' },
            image: { type: 'string', format: 'base64' }
        }
    },
    'Bartender Updated': {
        type: 'object',
        required: ['user'],
        properties: {
            user: {type: 'string', format: 'id-mongo'},
            age: { type: 'string' },
            specialties: {
                type: 'array',
                items: {
                    type: 'string'
                }
            },
            professionalDescription: { type: 'string' },
            isAvailable: { type: 'boolean' },
            image: { type: 'string', format: 'base64' }
        }
    },
    'List Bartenders': {
        type: 'array',
        items: {
            type: 'object',
            properties: {
                user: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string', format: 'id-mongo'},
                        name: { type: 'string' },
                        email: { type: 'string' },
                        description: { type: 'string' }
                    }
                },
                age: { type: 'number' },
                specialties: {
                    type: 'array',
                    items: {
                        type: 'string'
                    }
                },
                professionalDescription: {type: 'string'},
                isAvailable: { type: 'boolean' },
                imageUrl: { type: 'string' },
                public_id: { type: 'string' },
                createdAt: { type: 'string', format: 'date-time' },
                updatedAt: { type: 'string', format: 'date-time' },
                id: { type: 'string', format: 'id-mongo' }
            }
        }
    },
    Bartender: {
        type: 'object',
        properties: {
            user: { type: 'string' },
            age: { type: 'number' },
            specialties: {
                type: 'array',
                items: {
                    type: 'string'
                }
            },
            professionalDescription: {type: 'string'},
            isAvailable: { type: 'boolean' },
            imageUrl: { type: 'string' },
            public_id: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
            id: { type: 'string', format: 'id-mongo' }
        }
    }
}

export const bartenderExample: Components = {
    'List Bartenders': {
        summary: 'List Bartenders',
        value: [
            {
                "user": {
                    "_id": "64cced3a34bbf194975cf7bd",
                    "name": "Example Modify Admin the a customer",
                    "email": "example1@google.com",
                    "description": "update to user test"
                },
                "age": 18,
                "specialties": [
                    "prueba",
                    "prueba b"
                ],
                "professionalDescription": "prueba description",
                "isAvailable": true,
                "imageUrl": "https://res.cloudinary.com/journal-app-react-2023/image/upload/v1691190597/bartenders/example-18.png",
                "public_id": "bartenders/example-18",
                "createdAt": "2023-08-04T23:09:57.959Z",
                "updatedAt": "2023-08-04T23:09:57.959Z",
                "id": "64cd854577c2c8ecf765aff2"
            },
            {
                "user": {
                    "_id": "64cda70d96ebd9c92ab5216a",
                    "name": "example",
                    "email": "bartender@google.com",
                    "description": "New description"
                },
                "age": 24,
                "specialties": [
                    "prueba"
                ],
                "professionalDescription": "prueba",
                "isAvailable": true,
                "imageUrl": "https://res.cloudinary.com/journal-app-react-2023/image/upload/v1691189634/nophoto.jpg",
                "public_id": "no_image",
                "createdAt": "2023-08-05T10:26:47.324Z",
                "updatedAt": "2023-08-05T15:05:03.560Z",
                "id": "64ce23e7729a8bcc4f311b60"
            }
        ]
    },
    'Bartender Created': {
        summary: 'Bartender Created',
        value: {
            "user": "64d62f16eef56ce329ecaa97",
            "age": 20,
            "specialties": [
                "prueba",
                "prueba b"
            ],
            "professionalDescription": "Creado desde bartender",
            "isAvailable": true,
            "imageUrl": "https://res.cloudinary.com/journal-app-react-2023/image/upload/v1691189634/nophoto.jpg",
            "public_id": "no_image",
            "createdAt": "2023-08-11T14:05:15.418Z",
            "updatedAt": "2023-08-11T14:05:15.418Z",
            "id": "64d6401b3c2b89b15c402507"
        }
    },
    'Errors Field Bartender': {
        summary: 'Errors Field Bartender',
        value: {
            "ok": false,
            "errors": {
                "_original": {
                    "age": "20",
                    "specialties": [
                        "prueba",
                        "prueba b"
                    ]
                },
                "details": [
                    {
                        "message": "\"professionalDescription\" is required",
                        "path": [
                            "professionalDescription"
                        ],
                        "type": "any.required",
                        "context": {
                            "label": "professionalDescription",
                            "key": "professionalDescription"
                        }
                    }
                ]
            }
        }
    },
    'Error no authorized created bartender': {
        summary: 'Error no authorized created bartender',
        value: {
            "ok": false,
            "msg": MessageErrorsEnum.NoAuthorizedForCreateBartender
        }
    }
}