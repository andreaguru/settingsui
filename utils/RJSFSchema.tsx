import {RJSFSchema, UiSchema} from "@rjsf/utils";

export const schemaArray: RJSFSchema = {
    "title": "Header",
    "description": "Header schema",
    "type": "object",
    "properties": {
        "logo": {
            "type": "object",
            "title": "Logo",
            "properties": {
                "name": {type: "string", title: "Name"},
                "links": {
                    "type": "array",
                    "title": "Links",
                    "items": {
                        "type": "object",
                        "properties": {
                            "url": {"type": "string", "title": "url"},
                            "name": {"type": "string", "title": "name"},
                        },
                    },
                },
            },
        },
        "featured": {
            "type": "object",
            "title": "Featured",
            "properties": {
                "name": {type: "string", title: "Name"},
                "links": {
                    "type": "array",
                    "title": "Links",
                    "items": {
                        "type": "object",
                        "properties": {
                            "elementType": {"type": "string", "title": "Element Type"},
                            "url": {"type": "string", "title": "url"},
                            "name": {"type": "string", "title": "name"},
                            "modifierClassExtension": {"type": "string", "title": "Modifier Class Extension"},
                        },
                    },
                },
            },
        },
        "actions": {
            "type": "object",
            "title": "Actions",
            "properties": {
                "name": {type: "string", title: "Name"},
                "links": {
                    "type": "array",
                    "title": "Links",
                    "items": {
                        "type": "object",
                        "properties": {
                            "elementType": {"type": "string", "title": "Element Type"},
                            "url": {"type": "string", "title": "url"},
                            "name": {"type": "string", "title": "name"},
                            "modifierClassExtension": {"type": "string", "title": "Modifier Class Extension"},
                        },
                    },
                },
            },
        },
    },
};

export const schemaObject: RJSFSchema = {
    "title": "A registration form",
    "description": "A simple form example.",
    "type": "object",
    "required": [
        "firstName",
        "lastName",
    ],
    "properties": {
        "firstName": {
            "type": "string",
            "title": "First name",
        },
        "lastName": {
            "type": "string",
            "title": "Last name",
        },
        "age": {
            "type": "integer",
            "title": "Age",
        },
        "bio": {
            "type": "string",
            "title": "Bio",
        },
        "password": {
            "type": "string",
            "title": "Password",
            "minLength": 3,
        },
        "telephone": {
            "type": "string",
            "title": "Telephone",
            "minLength": 10,
        },
    },
};


export const uiSchema: UiSchema = {
    items: {
        "name": {
            "ui:autofocus": true,
            "ui:emptyValue": "",
            "ui:placeholder": "ui:emptyValue causes this field to always be valid despite being required",
            "ui:enableMarkdownInDescription": true,
            "ui:description": "Make text **bold** or *italic*.",
        },
        "value": {
            "ui:enableMarkdownInDescription": true,
            "ui:description": "Make things **bold** or *italic*.",
        },
    },
};
