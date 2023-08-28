import {Components} from 'swagger-jsdoc';
import {MessageErrorsEnum} from "../constant/messageOfErrors";

export const imageCocktailsSchema: Components = {
    'Image Cocktail': {
        type: 'object',
        properties: {
            name: { type: 'string' },
            image: { type: 'string', format: 'base64' }
        }
    },
    'Image Cocktails': {
        type: 'object',
        properties: {
            name: { type: 'string' },
            secure_url: { type: 'string' },
            public_id: { type: 'string' },
            createdAt: {
                type: 'string',
                format: 'date'
            },
            updatedAt: {
                type: 'string',
                format: 'date'
            },
            id: {
                type: 'string',
                format: 'id-mongo'
            }
        }
    },
    'Image Cocktails Created': {
        type: 'object',
        properties: {
            ok: { type: 'boolean' },
            msg: {
                type: 'object',
                properties: {
                    name: { type: 'string' },
                    secure_url: { type: 'string' },
                    public_id: { type: 'string' },
                    createdAt: {
                        type: 'string',
                        format: 'date'
                    },
                    updatedAt: {
                        type: 'string',
                        format: 'date'
                    },
                    id: { type: 'string', format: 'id-mongo'}
                }
            }
        }
    },
    'List Image Cocktail': {
        type: 'array',
        minItems: 0,
        items:  {
            type: 'object',
            properties: {
                name: { type: 'string' },
                secure_url: { type: 'string' },
                public_id: { type: 'string' },
                createdAt: {
                    type: 'string',
                    format: 'date'
                },
                updatedAt: {
                    type: 'string',
                    format: 'date'
                },
                id: { type: 'string', format: 'id-mongo'}
            }
        }
    },
}

export const imagesCocktailsExamples: Components = {
    'List Images Cocktails': {
        summary: 'Example of list images cocktails',
        value: [
            {
                name: 'Margarita cocktail 12',
                secure_url: 'https://res.cloudinary.com/journal-app-react-2023/image/upload/v1691695172/cocktails/Margarita%20cocktail%2012.png',
                public_id: 'cocktails/Margarita cocktail 12',
                createdAt: '2023-08-10T19:19:33.242Z',
                updatedAt: '2023-08-10T19:19:33.242Z',
                id: '64d538456189a90448da839d'
            },
            {
                name: 'Margarita Cocktasil 12',
                secure_url: 'https://res.cloudinary.com/journal-app-react-2023/image/upload/v1691699381/cocktails/Margarita_Cocktasil_12.png',
                public_id: 'cocktails/Margarita_Cocktasil_12',
                createdAt: '2023-08-10T20:29:41.428Z',
                updatedAt: '2023-08-10T20:29:41.428Z',
                id: '64d548b5700f6ee9ba79397e'
            }
        ]
    },
    'Image Cocktail Created Example': {
        summary: 'Image Cocktail Created',
        value: {
            ok: true,
            msg: {
                name: 'Margarita cocktail 12',
                secure_url: 'https://res.cloudinary.com/journal-app-react-2023/image/upload/v1691695172/cocktails/Margarita%20cocktail%2012.png',
                public_id: 'cocktails/Margarita cocktail 12',
                createdAt: '2023-08-10T19:19:33.242Z',
                updatedAt: '2023-08-10T19:19:33.242Z',
                id: '64d538456189a90448da839d'
            }
        }
    },
    'Errors Field Name': {
        summary: 'Errors Field Name',
        value: {
            "ok": false,
            "errors": {
                "_original": {
                    "name": ""
                },
                "details": [
                    {
                        "message": "\"name\" is not allowed to be empty",
                        "path": [
                            "name"
                        ],
                        "type": "string.empty",
                        "context": {
                            "label": "name",
                            "value": "",
                            "key": "name"
                        }
                    }
                ]
            }
        }
    },
    'Errors Field Name Short': {
        summary: 'Errors Field Name Short',
        value: {
            "ok": false,
            "errors": {
                "_original": {
                    "name": "tes"
                },
                "details": [
                    {
                        "message": "\"name\" length must be at least 5 characters long",
                        "path": [
                            "name"
                        ],
                        "type": "string.min",
                        "context": {
                            "limit": 5,
                            "value": "tes",
                            "label": "name",
                            "key": "name"
                        }
                    }
                ]
            }
        }
    },
    'Errors Fields Image Cocktail': {
        summary: 'Errors Fields Image Cocktail',
        value: {
            "ok": false,
            "errors": {
                "_original": {
                    "name": "Fredttt",
                    "image": ""
                },
                "details": [
                    {
                        "message": "\"image\" is not allowed",
                        "path": [
                            "image"
                        ],
                        "type": "object.unknown",
                        "context": {
                            "child": "image",
                            "label": "image",
                            "value": "",
                            "key": "image"
                        }
                    }
                ]
            }
        }
    },
    'Errors Image Same Name': {
        summary: 'Errors Image Same Name',
        value: {
            ok: false,
            msg: MessageErrorsEnum.AImageExistWithSameName
        }
    },
    'Errors Image No Add': {
        summary: 'Errors Image No Add',
        value: {
            ok: false,
            msg: MessageErrorsEnum.NoImageAdd
        }
    },
    'Errors Image No Exist': {
        summary: 'Errors image no exist with that id',
        value: {
            ok: false,
            msg: MessageErrorsEnum.ImageNotExistWithThatId
        }
    },
    'Errors No image or name for update': {
        summary: 'Errors image or name for update',
        value: {
            ok: false,
            msg: MessageErrorsEnum.NoImageOrNameForUpdate
        }
    }
}