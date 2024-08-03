export const getUserIdSchema = {
    "type": "object",
    "properties": {
        "userId": {
            "type": "string"
        },
        "username": {
            "type": "string"
        },
        "books": {
            "type": "array",
            "items": {}
        }
    },
    "required": [
        "userId",
        "username",
        "books"
    ]
};