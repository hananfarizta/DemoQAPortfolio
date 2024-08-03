export const getBooksSchema = {
    "type": "object",
    "properties": {
        "books": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "isbn": {
                        "type": "string"
                    },
                    "title": {
                        "type": "string"
                    },
                    "subTitle": {
                        "type": "string"
                    },
                    "author": {
                        "type": "string"
                    },
                    "publish_date": {
                        "type": "string"
                    },
                    "publisher": {
                        "type": "string"
                    },
                    "pages": {
                        "type": "number"
                    },
                    "description": {
                        "type": "string"
                    },
                    "website": {
                        "type": "string"
                    }
                },
                "required": [
                    "isbn",
                    "title",
                    "subTitle",
                    "author",
                    "publish_date",
                    "publisher",
                    "pages",
                    "description",
                    "website"
                ]
            }
        }
    },
    "required": [
        "books"
    ]
};