import {UiSchema} from "@rjsf/utils";
import {edidTheme} from "../themes/edid";

export const uiSchema: UiSchema = {
    "actionLinks": {
        "ui:options": {
            "addable": false,
            "orderable": false,
            "removable": false,
        },
        "items": {
            "ui:options": {
                "label": false,
            },
            "ui:style": {
                "paddingLeft": edidTheme.spacing(2),
            },
        },
    },
    "featuredLinks": {
        "ui:options": {
            "addable": false,
            "orderable": false,
            "removable": false,
        },
        "items": {
            "ui:options": {
                "label": false,
            },
            "ui:style": {
                "paddingLeft": edidTheme.spacing(2),
            },
        },
    },
};
