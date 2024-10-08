export const loginSchema = {
    "type": "object",
    "properties": {
        "userId": {
            "type": "string"
        },
        "username": {
            "type": "string"
        },
        "password": {
            "type": "string"
        },
        "token": {
            "type": "string"
        },
        "expires": {
            "type": "string"
        },
        "created_date": {
            "type": "string"
        },
        "isActive": {
            "type": "boolean"
        }
    },
    "required": [
        "userId",
        "username",
        "password",
        "token",
        "expires",
        "created_date",
        "isActive"
    ]
}