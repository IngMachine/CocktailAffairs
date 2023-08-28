import {Components} from "swagger-jsdoc";
import {MessageErrorsEnum} from "../constant/messageOfErrors";

export const cocktailsSchema: Components = {
    'List Cocktails': {
        type: 'array',
        items: {
            type: 'object',
            properties: {
                name: {type: 'string'},
                description: {type: 'string'},
                size: {type: 'string'},
                preparation: {type: 'string'},
                glassType: {type: 'string'},
                ingredients: {
                    type: 'array',
                    items: {
                        type: 'string'
                    }
                },
                alcoholic: {type: 'boolean'},
                price: {type: 'number'},
                imageCocktail: {type: 'string'},
                user: {
                    type: 'object',
                    properties: {
                        name: {type: 'string'},
                        email: {type: 'string'},
                        description: {type: 'string'},
                        role: {
                            type: 'array',
                            items: {
                                type: 'string',
                                format: 'id-mongo'
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
                            format: 'id-mongo'
                        }
                    }
                }

            }
        }
    },
    'Cocktail': {
        type: 'object',
        properties: {
            name: {type: 'string'},
            description: {type: 'string'},
            size: {type: 'string'},
            preparation: {type: 'string'},
            glassType: {type: 'string'},
            ingredients: {
                type: 'array',
                items: {
                    type: 'string'
                }
            },
            alcoholic: {type: 'boolean'},
            price: {type: 'number'},
            imageCocktail: {type: 'string'},
            user: {
                type: 'object',
                properties: {
                    name: {type: 'string'},
                    email: {type: 'string'},
                    description: {type: 'string'},
                    role: {
                        type: 'array',
                        items: {
                            type: 'string',
                            format: 'id-mongo'
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
                        format: 'id-mongo'
                    }
                }
            }

        }
    },
    'Cocktail Created': {
        type: 'object',
        properties: {
            name: {type: 'string'},
            description: {type: 'string'},
            size: {type: 'string'},
            preparation: {type: 'string'},
            glassType: {type: 'string'},
            ingredients: {
                type: 'array',
                items: {
                    type: 'string'
                }
            },
            alcoholic: {type: 'boolean'},
            price: {type: 'number'},
            imageCocktail: {type: 'string'},
        }
    }
}

export const cocktailsExample: Components = {
    'List Cocktails': {
        summary: 'List Cocktails',
        value: [
            {
                "name": "Margarita",
                "description": "A classic tequila-based cocktail with a tangy lime flavor.",
                "size": "Medium",
                "preparation": "1. Rim the glass with salt. 2. Shake tequila, triple sec, and lime juice with ice. 3. Strain into the glass. 4. Garnish with a lime wedge.",
                "glassType": "Margarita Glass",
                "ingredients": [
                    "Tequila",
                    "Triple Sec",
                    "Lime Juice",
                    "Salt"
                ],
                "alcoholic": true,
                "price": 8.5,
                "imageCocktail": null,
                "user": {
                    "name": "Test update from account test",
                    "email": "example@google.com",
                    "description": "update to user test!",
                    "role": [
                        "64cbd63ea0ebec5e5af4f5bf",
                        "64cbd66da0ebec5e5af4f5c3",
                        "64cbd74fa0ebec5e5af4f5c9"
                    ]
                },
                "createdAt": "2023-08-11T04:25:32.344Z",
                "updatedAt": "2023-08-11T04:25:32.344Z",
                "id": "64d5b83cc7e66d565a77ff65"
            },
            {
                "name": "Margarita",
                "description": "A classic tequila-based cocktail with a tangy lime flavor.",
                "size": "Medium",
                "preparation": "1. Rim the glass with salt. 2. Shake tequila, triple sec, and lime juice with ice. 3. Strain into the glass. 4. Garnish with a lime wedge.",
                "glassType": "Margarita Glass",
                "ingredients": [
                    "Tequila",
                    "Triple Sec",
                    "Lime Juice",
                    "Salt"
                ],
                "alcoholic": true,
                "price": 8.5,
                "imageCocktail": null,
                "user": {
                    "name": "Test update from account test",
                    "email": "example@google.com",
                    "description": "update to user test!",
                    "role": [
                        "64cbd63ea0ebec5e5af4f5bf",
                        "64cbd66da0ebec5e5af4f5c3",
                        "64cbd74fa0ebec5e5af4f5c9"
                    ]
                },
                "createdAt": "2023-08-11T04:43:18.213Z",
                "updatedAt": "2023-08-11T04:43:18.213Z",
                "id": "64d5bc66c7e66d565a77ff6f"
            },
            {
                "name": "Testing",
                "description": "A classic tequila-based cocktail with a tangy lime flavor.",
                "size": "Medium",
                "preparation": "1. Rim the glass with salt. 2. Shake tequila, triple sec, and lime juice with ice. 3. Strain into the glass. 4. Garnish with a lime wedge.",
                "glassType": "Margarita Glass",
                "ingredients": [
                    "Tequila",
                    "Triple Sec",
                    "Lime Juice",
                    "Salt"
                ],
                "alcoholic": true,
                "price": 8.5,
                "imageCocktail": null,
                "user": {
                    "name": "Test update from account test",
                    "email": "example@google.com",
                    "description": "update to user test!",
                    "role": [
                        "64cbd63ea0ebec5e5af4f5bf",
                        "64cbd66da0ebec5e5af4f5c3",
                        "64cbd74fa0ebec5e5af4f5c9"
                    ]
                },
                "createdAt": "2023-08-11T04:45:14.021Z",
                "updatedAt": "2023-08-11T04:45:14.021Z",
                "id": "64d5bcda370cc10cdc3c5e72"
            }
        ]
    },
    'Cocktail': {
        summary: 'Cocktail',
        value: {
            "name": "Testing",
            "description": "A classic tequila-based cocktail with a tangy lime flavor.",
            "size": "Medium",
            "preparation": "1. Rim the glass with salt. 2. Shake tequila, triple sec, and lime juice with ice. 3. Strain into the glass. 4. Garnish with a lime wedge.",
            "glassType": "Margarita Glass",
            "ingredients": [
                "Tequila",
                "Triple Sec",
                "Lime Juice",
                "Salt"
            ],
            "alcoholic": true,
            "price": 8.5,
            "imageCocktail": null,
            "user": {
                "name": "Test update from account test",
                "email": "example@google.com",
                "description": "update to user test!",
                "role": [
                    "64cbd63ea0ebec5e5af4f5bf",
                    "64cbd66da0ebec5e5af4f5c3",
                    "64cbd74fa0ebec5e5af4f5c9"
                ]
            },
            "createdAt": "2023-08-11T04:45:14.021Z",
            "updatedAt": "2023-08-11T04:45:14.021Z",
            "id": "64d5bcda370cc10cdc3c5e72"
        }
    },
    'Cocktail Created': {
        summary: 'Cocktail Created',
        value: {
            "name": "Margarita",
            "description": "A classic tequila-based cocktail with a tangy lime flavor.",
            "size": "Medium",
            "preparation": "1. Rim the glass with salt. 2. Shake tequila, triple sec, and lime juice with ice. 3. Strain into the glass. 4. Garnish with a lime wedge.",
            "glassType": "Margarita Glass",
            "ingredients": ["Tequila", "Triple Sec", "Lime Juice", "Salt"],
            "alcoholic": true,
            "price": 8.5,
            "imageCocktail": "64d5b1c456f28072e11770e5"
        }
    },
    'Cocktail Update': {
        summary: 'Cocktail Update',
        value: {
            "name": "Margarita update",
            "description": "A classic tequila-based cocktail with a tangy lime flavor.",
            "size": "Medium",
            "preparation": "1. Rim the glass with salt. 2. Shake tequila, triple sec, and lime juice with ice. 3. Strain into the glass. 4. Garnish with a lime wedge.",
            "glassType": "Margarita Glass",
            "ingredients": [
                "Tequila",
                "Triple Sec",
                "Lime Juice",
                "Salt"
            ],
            "alcoholic": true,
            "price": 8.5,
            "imageCocktail": "64d5b1c456f28072e11770e5",
            "user": "64cc5ca0d5f3bcf7410371db",
            "createdAt": "2023-08-11T04:50:05.505Z",
            "updatedAt": "2023-08-11T05:00:49.816Z",
            "id": "64d5bdfd370cc10cdc3c5e7a"
        }
    },
    'Cocktail Delete': {
        summary: 'Cocktail Delete',
        value: {
            "name": "Margarita update",
            "description": "A classic tequila-based cocktail with a tangy lime flavor.",
            "size": "Medium",
            "preparation": "1. Rim the glass with salt. 2. Shake tequila, triple sec, and lime juice with ice. 3. Strain into the glass. 4. Garnish with a lime wedge.",
            "glassType": "Margarita Glass",
            "ingredients": [
                "Tequila",
                "Triple Sec",
                "Lime Juice",
                "Salt"
            ],
            "alcoholic": true,
            "price": 8.5,
            "imageCocktail": "64d5b1c456f28072e11770e5",
            "user": "64cc5ca0d5f3bcf7410371db",
            "createdAt": "2023-08-11T04:50:05.505Z",
            "updatedAt": "2023-08-11T05:00:49.816Z",
            "id": "64d5bdfd370cc10cdc3c5e7a"
        }
    },
    'Errors Fields Cocktails': {
        summary: 'Errors Fields Cocktails',
        value: {
            "ok": false,
            "errors": {
                "name": {
                    "type": "field",
                    "msg": MessageErrorsEnum.NameCocktailRequired,
                    "path": "name",
                    "location": "body"
                },
                "description": {
                    "type": "field",
                    "msg": MessageErrorsEnum.DescriptionCocktailRequired,
                    "path": "description",
                    "location": "body"
                },
                "size": {
                    "type": "field",
                    "msg": "The value must be one of the following: Small, Medium, Large.",
                    "path": "size",
                    "location": "body"
                },
                "preparation": {
                    "type": "field",
                    "msg": MessageErrorsEnum.PreparationRequired,
                    "path": "preparation",
                    "location": "body"
                },
                "glassType": {
                    "type": "field",
                    "msg": "The value must be one of the following: Martini Glass, Margarita Glass, Wine Glass, Old Fashioned Glass, Highball Glass, Collins Glass, Cocktail Glass, Tiki Glass, Hurricane Glass, Shot Glass.",
                    "path": "glassType",
                    "location": "body"
                },
                "ingredients": {
                    "type": "field",
                    "msg": MessageErrorsEnum.IngredientMinimumOne,
                    "path": "ingredients",
                    "location": "body"
                },
                "alcoholic": {
                    "type": "field",
                    "msg": MessageErrorsEnum.IsAlcoholicRequired,
                    "path": "alcoholic",
                    "location": "body"
                },
                "price": {
                    "type": "field",
                    "msg": MessageErrorsEnum.PriceIsRequired,
                    "path": "price",
                    "location": "body"
                },
                "imageCocktail": {
                    "type": "field",
                    "msg": MessageErrorsEnum.IdImageCocktailRequired,
                    "path": "imageCocktail",
                    "location": "body"
                }
            }
        }
    },
    'Errors Cocktail No Exist': {
        summary: 'Errors Cocktail No Exist',
        value: {
            "ok": false,
            "msg": MessageErrorsEnum.CocktailNotFound
        }
    }
}