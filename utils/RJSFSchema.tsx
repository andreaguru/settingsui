import {RJSFSchema, UiSchema} from "@rjsf/utils";

export const schemaArray: RJSFSchema = {
    "type": "object",
    "required": [
        "gtmContainerId",
        "customVendorId",
    ],
    "properties": {
        "gtmContainerId": {
            "type": "string",
            "title": "Container ID",
        },
        "forceConsent": {
            "type": "boolean",
            "title": "Nach Zustimmung über CMP laden",
            "default": true,
        },
        "customVendorId": {
            "type": "string",
            "title": "Custom Vendor ID",
            "default": "850",
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
