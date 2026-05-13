import React from "react";
import { ArrayFieldTemplateProps } from "@rjsf/utils";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";

/**
 * Renders an array field template.
 *
 * @return {JSX.Element} The rendered array field template.
 */
export default function ArrayFieldTemplate(props: ArrayFieldTemplateProps) {
    const { canAdd, className, items, onAddClick, title } = props;

    return (
        /* We generate a new key in order to always trigger
        a re-render of the element and therefore show the highlight animation */
        <div className={className} data-testid="templateArray">
            <h2>{title}</h2>
            {items}

            {canAdd && (
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <IconButton
                        onClick={() => {
                            // setFocusedItemIndex(items.length);
                            onAddClick();
                        }}
                    >
                        <AddIcon color="primary" />
                    </IconButton>
                </Box>
            )}
        </div>
    );
}
