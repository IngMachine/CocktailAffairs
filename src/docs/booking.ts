import {Components} from "swagger-jsdoc";
import {MessageErrorsEnum} from "../constant/messageOfErrors";

export const bookingSchema: Components = {
    'Booking Created Admin': {
        type: 'object',
        properties: {
            user: {
                type: 'string',
                format: 'id-mongo'
            },
            bartenders: {
                type: 'array',
                items: {
                    type: 'string',
                    format: 'id-mongo'
                }
            },
            eventDate: {
                type: 'string',
                format: 'date-time'
            },
            eventTime: {
                type: 'string',
                format: 'date-time'
            },
            duration: {
                type: 'number'
            },
            location: {
                type: 'string'
            },
            guestCount: {
                type: 'number'
            },
            specialRequests: {
                type: 'string'
            }
        }
    },
    'Booking Created Bartender': {
        type: 'object',
        properties: {
            bartenders: {
                type: 'array',
                items: {
                    type: 'string',
                    format: 'id-mongo'
                }
            },
            eventDate: {
                type: 'string',
                format: 'date-time'
            },
            eventTime: {
                type: 'string',
                format: 'date-time'
            },
            duration: {
                type: 'number'
            },
            location: {
                type: 'string'
            },
            guestCount: {
                type: 'number'
            },
            specialRequests: {
                type: 'string'
            }
        }
    },
    Booking: {
        type: 'object',
        properties: {
            user: {
                type: 'string',
                format: 'id-mongo'
            },
            bartenders: {
                type: 'array',
                items: {
                    type: 'string',
                    format: 'id-mongo'
                }
            },
            eventDate: {
                type: 'string',
                format: 'date-time'
            },
            eventTime: {
                type: 'string',
                format: 'date-time'
            },
            duration: { type: 'number' },
            location: { type: 'string' },
            guestCount: { type: 'number' },
            specialRequests: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
            id: { type: 'string', format: 'id-mongo' }
        }
    },
    'List Bookings': {
        type: 'array',
        items: {
            type: 'object',
            properties: {
                user: {
                    type: 'string',
                    format: 'id-mongo'
                },
                bartenders: {
                    type: 'array',
                    items: {
                        type: 'string',
                        format: 'id-mongo'
                    }
                },
                eventDate: {
                    type: 'string',
                    format: 'date-time'
                },
                eventTime: {
                    type: 'string',
                    format: 'date-time'
                },
                duration: { type: 'number' },
                location: { type: 'string' },
                guestCount: { type: 'number' },
                specialRequests: { type: 'string' },
                createdAt: { type: 'string', format: 'date-time' },
                updatedAt: { type: 'string', format: 'date-time' },
                id: { type: 'string', format: 'id-mongo' }
            }
        }
    }
}

export const bookingExample: Components = {
    'Booking Created Admin': {
        summary: 'Booking Created Admin',
        value: {
            "user": "64d053a31e3be46662a6954a",
            "bartenders": ["64cd854577c2c8ecf765aff2"],
            "eventDate": "2023-08-13T03:41:05.244Z",
            "eventTime": "2023-08-13T03:41:05.244Z",
            "duration": 5,
            "location": "Los Cocos",
            "guestCount": 5,
            "specialRequests": "Testing"
        }
    },
    'Booking Created Bartender': {
        summary: 'Booking Created Bartender',
        value: {
            "bartenders": ["64cd854577c2c8ecf765aff2"],
            "eventDate": "2023-08-13T03:41:05.244Z",
            "eventTime": "2023-08-13T03:41:05.244Z",
            "duration": 5,
            "location": "Los Cocos",
            "guestCount": 5,
            "specialRequests": "Testing"
        }
    },
    'Booking Created': {
        summary: 'Booking Created',
        value: {
            "user": "64d053a31e3be46662a6954a",
            "bartenders": [
                "64cd854577c2c8ecf765aff2"
            ],
            "eventDate": "2023-08-13T03:41:05.244Z",
            "eventTime": "2023-08-13T03:41:05.244Z",
            "duration": 5,
            "location": "Los Cocos",
            "guestCount": 5,
            "specialRequests": "Testing",
            "createdAt": "2023-08-29T15:16:03.924Z",
            "updatedAt": "2023-08-29T15:16:03.924Z",
            "id": "64ee0bb38d451a14fdc258a8"
        }
    },
    'Booking fields errors': {
        summary: 'Booking fields errors',
        value: {
            "ok": false,
            "errors": {
                "eventDate": {
                    "type": "field",
                    "msg": "The event date is required",
                    "path": "eventDate",
                    "location": "body"
                },
                "eventTime": {
                    "type": "field",
                    "msg": "The event time is required",
                    "path": "eventTime",
                    "location": "body"
                },
                "duration": {
                    "type": "field",
                    "msg": "The duration is required",
                    "path": "duration",
                    "location": "body"
                },
                "guestCount": {
                    "type": "field",
                    "msg": "The guest count is required",
                    "path": "guestCount",
                    "location": "body"
                }
            }
        }
    },
    'Error no authorized created booking': {
        summary: 'Error no authorized created booking',
        value: {
            "ok": false,
            "msg": MessageErrorsEnum.NoAuthorizedForCreateBooking
        }
    },
    'Error not booking': {
        summary: 'Error not booking',
        value: {
            ok: false,
            msg: MessageErrorsEnum.BookingNotFound
        }
    },
    'List Bookings': {
        summary: 'List Booking',
        value: [
            {
                "user": "64cc5ca0d5f3bcf7410371db",
                "bartender": [
                    "64cd854577c2c8ecf765aff2"
                ],
                "eventDate": "2023-08-06T19:03:18.488Z",
                "eventTime": "2023-08-06T19:03:18.488Z",
                "duration": 5,
                "location": "Los cocos",
                "guestCount": 5,
                "specialRequests": "Hola",
                "createdAt": "2023-08-05T19:03:45.951Z",
                "updatedAt": "2023-08-05T19:03:45.951Z",
                "id": "64ce9d11c4b5212be939406b"
            },
            {
                "user": "64cc5ca0d5f3bcf7410371db",
                "bartender": [
                    "64cd854577c2c8ecf765aff2"
                ],
                "eventDate": "2023-08-06T19:03:46.064Z",
                "eventTime": "2023-08-06T19:03:46.064Z",
                "duration": 5,
                "location": "Los cocos",
                "guestCount": 5,
                "specialRequests": "Hola",
                "createdAt": "2023-08-05T19:03:56.030Z",
                "updatedAt": "2023-08-05T19:03:56.030Z",
                "id": "64ce9d1cc4b5212be939406f"
            },
            {
                "user": "64d053a31e3be46662a6954a",
                "bartender": [
                    "64cd854577c2c8ecf765aff2"
                ],
                "eventDate": "2023-08-09T18:58:32.479Z",
                "eventTime": "2023-08-09T18:58:32.479Z",
                "duration": 5,
                "location": "Los cocos",
                "guestCount": 5,
                "specialRequests": "Hola",
                "createdAt": "2023-08-08T19:22:03.584Z",
                "updatedAt": "2023-08-08T19:22:03.584Z",
                "id": "64d295db97291c8b4ff0db5b"
            }
        ]
    }
}