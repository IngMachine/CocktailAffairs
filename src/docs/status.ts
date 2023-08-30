import {Components} from "swagger-jsdoc";
import {MessageErrorsEnum} from "../constant/messageOfErrors";

export const statusSchema: Components = {
    'List Status': {
        type: 'array',
        items: {
            type: 'object',
            properties: {
                name: { type: 'string' },
                description: { type: 'string' },
                id: { type: 'string', format: 'id-mongo' }
            }
        }
    },
    'Status Request': {
        type: 'object',
        properties: {
            name: { type: 'string' },
            description: { type: 'string' }
        }
    },
    Status: {
        type: 'object',
        properties: {
            name: { type: 'string' },
            description: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time'},
            updateAt: { type: 'string', format: 'date-time'},
            id: { type: 'string', format: 'id-mongo' }
        }
    }
}

export const statusExample: Components = {
    'List Status': {
        summary: 'List Status',
        value: [
            {
                "name": "PENDING",
                "description": "The item is pending or waiting for further action.",
                "id": "64d10e62f018b7bbf58d545d"
            },
            {
                "name": "IN PROGRESS",
                "description": "The item is in progress or being processed.",
                "id": "64d10e6df018b7bbf58d5461"
            },
            {
                "name": "COMPLETED",
                "description": "The item has been successfully completed.",
                "id": "64d10e72f018b7bbf58d5465"
            },
            {
                "name": "CANCELLED",
                "description": "The item has been cancelled and will not be continued.",
                "id": "64d10e79f018b7bbf58d5469"
            }
        ]
    },
    'Status Request': {
        summary: 'Status Request',
        value: {
            "name": "Test",
            "description": "The item has been cancelled and will not be continued."
        }
    },
    Status: {
        summary: 'Status',
        value: {
            "name": "TEST",
            "description": "The item has been cancelled and will not be continued.",
            "createdAt": "2023-08-14T20:40:08.246Z",
            "updatedAt": "2023-08-14T20:40:08.246Z",
            "id": "64da9128bc781283e5bbb8c4"
        }
    },
    'Status Not Found': {
        summary: 'Status not found',
        value: {
            ok: false,
            msg:MessageErrorsEnum.StatusNotFound
        }
    }
}