import {UiSchema} from "@rjsf/utils";

export const uiSchema: UiSchema = {
    "ui:globalOptions": {
        "addable": false,
        "orderable": false,
        "removable": false,
    },
    "actionLinks": {
        "items": {
            "ui:order": [
                "elementType",
                "linkName",
                "url",
                "modifierClassExtension",
            ],
        },
    },
    "featuredLinks": {
        "items": {
            "ui:order": [
                "elementType",
                "linkName",
                "url",
                "modifierClassExtension",
            ],
        },
    },
};
