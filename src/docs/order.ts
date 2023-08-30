import {Components} from "swagger-jsdoc";
import {MessageErrorsEnum} from "../constant/messageOfErrors";

export const orderSchema: Components = {
    Order: {
        type: 'object',
        properties: {
            booking: { type: 'string', format: 'id-mongo' },
            customer: { type: 'string', format: 'id-mongo' },
            totalAmount: { type: 'number' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
            status: { type: 'string', format: 'id-mongo' },
            id: { type: 'string', format: 'id-mongo' },
        }
    },
    'List Orders': {
        type: 'array',
        items: {
            type: 'object',
            properties: {
                booking: { type: 'string', format: 'id-mongo' },
                customer: { type: 'string', format: 'id-mongo' },
                totalAmount: { type: 'number' },
                createdAt: { type: 'string', format: 'date-time' },
                updatedAt: { type: 'string', format: 'date-time' },
                status: { type: 'string', format: 'id-mongo' },
                id: { type: 'string', format: 'id-mongo' },
            }
        }
    },
    'Order Created Customer': {
        booking: { type: 'string', format: 'id-mongo' },
        totalAmount: { type: 'number' }
    },
    'Order Created Admin': {
        user: { type: 'string', format: 'id-mongo' },
        booking: { type: 'string', format: 'id-mongo' },
        totalAmount: { type: 'number' }
    }
}

export const orderExample: Components = {
    'Order View': {
        summary: 'Order View',
        value: {
            "booking": "64d295db97291c8b4ff0db5b",
            "customer": "64da490388917e8e78ec5ac4",
            "totalAmount": 2500,
            "createdAt": "2023-08-14T16:07:00.289Z",
            "updatedAt": "2023-08-14T16:07:00.289Z",
            "status": "64d10e62f018b7bbf58d545d",
            "id": "64da51247a596965ff209791"
        }
    },
    'Errors Order Not Found': {
        summary: 'Errors Order Not Found',
        value: {
            ok: false,
            msg: MessageErrorsEnum.OrderNotFound
        }
    },
    'List Orders': {
        summary: 'List Orders',
        value: [
            {
                "booking": "64d295db97291c8b4ff0db5b",
                "customer": "64da490388917e8e78ec5ac4",
                "totalAmount": 2500,
                "createdAt": "2023-08-14T16:07:00.289Z",
                "updatedAt": "2023-08-14T16:07:00.289Z",
                "status": "64d10e62f018b7bbf58d545d",
                "id": "64da51247a596965ff209791"
            }
        ]
    },
    'Order Created Customer': {
        summary: 'Order Created Customer',
        value: {
            "booking": "64d295db97291c8b4ff0db5b",
            "totalAmount": 1000
        }
    },
    'Order Created Admin': {
        summary: 'Order Created Admin',
        value: {
            "user": "64cc5ca0d5f3bcf7410371db",
            "booking": "64d295db97291c8b4ff0db5b",
            "totalAmount": 1000
        }
    },
    'Errors Fields Order': {
        summary: 'Errors fields orders',
        value: {
            "ok": false,
            "errors": {
                "customer": {
                    "type": "field",
                    "value": "64da490388917e8e78eac5ac4",
                    "msg": "The customer not is valid",
                    "path": "customer",
                    "location": "body"
                },
                "booking": {
                    "type": "field",
                    "value": "64d295db97291c8b4ff0dba5b",
                    "msg": "The booking not is valid",
                    "path": "booking",
                    "location": "body"
                },
                "totalAmount": {
                    "type": "field",
                    "value": "1a000",
                    "msg": "The totalAmount not is valid",
                    "path": "totalAmount",
                    "location": "body"
                }
            }
        }
    },
    'Customer not found for the order': {
        summary: 'Customer not found for the order',
        value: {
            ok: false,
            msg: MessageErrorsEnum.CustomerNotFound
        }
    },
    'Booking already with order': {
        summary: 'Booking already with order',
        value: {
            ok: false,
            msg: MessageErrorsEnum.BookingAlreadyInOrders
        }
    },
    'The Booking does not belong to this user id': {
        summary: 'The Booking does not belong to this user id',
        value: {
            ok: false,
            msg: MessageErrorsEnum.TheBookingDoesNotBelongToThisUserId
        }
    }
}