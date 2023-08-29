import {Components} from "swagger-jsdoc";
import {MessageErrorsEnum} from "../constant/messageOfErrors";

export const customerSchema: Components = {
    'Customer Visitor': {
        type: 'object',
        properties: {
            phoneNumber: { type: 'string' },
            shippingAddress: { type: 'string' }
        }
    },
    'Customer Updated Customer': {
        type: 'object',
        properties: {
            phoneNumber: { type: 'string' },
            shippingAddress: { type: 'string' }
        }
    },
    'Customer Updated Admin': {
        type: 'object',
        properties: {
            user: { type: 'string', format: 'id-mongo' },
            phoneNumber: { type: 'string' },
            shippingAddress: { type: 'string' }
        }
    },
    Customer: {
        type: 'object',
        properties: {
            user: { type: 'string', format: 'id-mongo' },
            phoneNumber: { type: 'string' },
            shippingAddress: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
            id: { type: 'string', format: 'id-mongo' }
        }
    },
    'List Customer': {
        type: 'array',
        items: {
            type: 'object',
            properties: {
                user: { type: 'string', format: 'id-mongo' },
                phoneNumber: { type: 'string' },
                shippingAddress: { type: 'string' },
                createdAt: { type: 'string', format: 'date-time' },
                updatedAt: { type: 'string', format: 'date-time' },
                id: { type: 'string', format: 'id-mongo' }
            }
        }
    },
    'Customer View': {
        type: 'object',
        properties: {
            user: {
                type: 'object',
                properties: {
                    _id: {type: 'string', format: 'id-mongo'},
                    name: {type: 'string'},
                    email: {type: 'string'},
                    description: {type: 'string'}
                }
            },
            phoneNumber: {
                type: 'string'
            },
            shippingAddress: {
                type: 'string'
            },
            id: {
                type: 'string',
                format: 'id-mongo'
            }
        }
    }
}

export const customerExamples: Components = {
    'Customer Visitor': {
        summary: 'Customer Visitor',
        value: {
            "phoneNumber": "+573043631172",
            "shippingAddress": "Calle 29 1 # 21C-59"
        }
    },
    'Customer Created': {
        summary: 'Customer Created',
        value:  {
            "user": "64d44c6d4ba556be73480a63",
            "phoneNumber": "+573043631172",
            "shippingAddress": "Calle 29 1 # 21C-59",
            "createdAt": "2023-08-12T11:00:58.376Z",
            "updatedAt": "2023-08-12T11:00:58.376Z",
            "id": "64d7666a8b2690cd815b651e"
        }
    },
    'Customer Updated Admin': {
        summary: 'Customer Updated Admin',
        value: {
            "user": "64cd994f22b99d455143da15",
            "phoneNumber": "+Prueba",
            "shippingAddress": "Calle 29 D1 # 21C-59"
        }
    },
    'Error customer created with this user': {
        summary: 'Error customer created with this user',
        value: {
            ok: false,
            msg: MessageErrorsEnum.CustomerCreatedWithThisUser
        }
    },
    'Error Fields Customer': {
        summary: 'Error Fields Customer',
        value: {
            "ok": false,
            "errors": {
                "phoneNumber": {
                    "type": "field",
                    "msg": "The phone number is required",
                    "path": "phoneNumber",
                    "location": "body"
                },
                "shippingAddress": {
                    "type": "field",
                    "msg": "The shipping address is required",
                    "path": "shippingAddress",
                    "location": "body"
                }
            }
        }
    },
    'Customer View': {
        summary: 'Customer View',
        value: {
            "user": {
                "_id": "64d053a31e3be46662a6954a",
                "name": "Test update from account test",
                "email": "test@google.com",
                "description": "update to user test!"
            },
            "phoneNumber": "+573043631172",
            "shippingAddress": "Calle 29 1 # 21C-59",
            "id": "64d28736aea579539bb55724"
        }
    },
    'Error customer not found': {
        summary: 'Error customer not found',
        value: {
            ok: false,
            msg: MessageErrorsEnum.CustomerNotFound
        }
    },
    'List Customer': {
        summary: 'List Customer',
        value: [
            {
                "user": "64cd994f22b99d455143da15",
                "phoneNumber": "+Prueba",
                "shippingAddress": "Calle 29 D1 # 21C-59",
                "createdAt": "2023-08-07T02:12:33.044Z",
                "updatedAt": "2023-08-07T12:52:32.521Z",
                "id": "64d053111e3be46662a69547"
            },
            {
                "user": "64cc5ca0d5f3bcf7410371db",
                "phoneNumber": "+3043631171",
                "shippingAddress": "Calle 29 D1 # 21C-59",
                "createdAt": "2023-08-07T03:19:52.448Z",
                "updatedAt": "2023-08-12T19:51:14.501Z",
                "id": "64d062d8bc7ae3e8f2b4e660"
            },
            {
                "user": "64d053a31e3be46662a6954a",
                "phoneNumber": "+573043631172",
                "shippingAddress": "Calle 29 1 # 21C-59",
                "createdAt": "2023-08-08T18:19:34.668Z",
                "updatedAt": "2023-08-08T18:19:34.668Z",
                "id": "64d28736aea579539bb55724"
            },
            {
                "user": "64d44c6d4ba556be73480a63",
                "phoneNumber": "+3043631171",
                "shippingAddress": "Calle 29 D1 # 21C-59",
                "createdAt": "2023-08-12T11:00:58.376Z",
                "updatedAt": "2023-08-12T19:06:43.541Z",
                "id": "64d7666a8b2690cd815b651e"
            },
            {
                "user": "64d5a236264ea7693d18ca30",
                "phoneNumber": "+3043631171",
                "shippingAddress": "Calle 29 D1 # 21C-59",
                "createdAt": "2023-08-12T11:13:17.458Z",
                "updatedAt": "2023-08-12T19:52:26.168Z",
                "id": "64d7694d8b2690cd815b6532"
            }
        ]
    }
}