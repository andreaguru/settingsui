import {UiSchema} from "@rjsf/utils";

export const uiSchema: UiSchema = {
    "ui:globalOptions": {
        "addable": false,
        "orderable": false,
        "removable": false,
    },
    "links": {
        "items": {
            "classNames": "formArrayItem",
            "ui:options": {
                "label": false,
            },
        },
    },
    "actionLinks": {
        "items": {
            "ui:order": [
                "elementType",
                "url",
                "linkName",
                "modifierClassExtension",
            ],
            "classNames": "formArrayItem",
            "ui:options": {
                "label": false,
            },
        },
    },
    "featuredLinks": {
        "items": {
            "classNames": "formArrayItem",
            "ui:options": {
                "label": false,
            },
            "ui:order": [
                "elementType",
                "url",
                "linkName",
                "modifierClassExtension",
            ],
        },
    },
};
