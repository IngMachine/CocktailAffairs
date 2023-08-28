import {Components} from "swagger-jsdoc";
import {MessageErrorsEnum} from "../constant/messageOfErrors";

export const errorsGeneralSchema: Components = {
    'Errors Field': {
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
    'Errors Field JOI': {
        type: 'object',
        properties: {
            ok: {
                type: 'boolean',
                default: false
            },
            errors: {
                type: 'object',
                properties: {
                    _original: {
                        type: 'object',
                        properties: {
                            nameField: { type: 'string' }
                        }
                    },
                    details: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                message: { type: 'string' },
                                path: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            name: { type: 'string' }
                                        }
                                    }
                                },
                                type: { type: 'string' },
                                context: {
                                    type: 'object',
                                    properties: {
                                        label: { type: 'string'},
                                        value: { type: 'string'},
                                        key: { type: 'string' }
                                    }
                                }
                            }

                        }
                    }
                }
            }
        }
    },
    'Error Response': {
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
    },
    'Error Database': {
        type: 'object',
        properties: {
            error: {
                type: 'string',
            }
        }
    }
}

export const errorsGeneralExample: Components = {
    errorAuthorizationResponse: {
        summary: 'Error in authorization',
        value: {
            'ok': false,
            'msg': MessageErrorsEnum.UserNotPermitted
        }
    },
    errorInIdParam: {
        summary: 'Error in id param',
        value: {
            "ok": false,
            "errors": {
                ":id": {
                    "type": "field",
                    "msg": MessageErrorsEnum.InvalidObjectId,
                    "path": "id",
                    "location": "params"
                }
            }
        }
    },
    userNoSession: {
        summary: 'Error no session',
        value: {
            'ok': false,
            'msg': MessageErrorsEnum.SessionNoValid
        }
    },
    errorFieldBody: {
        summary: 'Error field body (no fields)',
        value: {
        }
    }
}