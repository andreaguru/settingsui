import React, { useState } from "react";
import { ArrayFieldItemButtonsTemplateProps, ArrayFieldItemTemplateProps } from "@rjsf/utils";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@mui/material/styles";

export default function ArrayFieldItemTemplate(props: ArrayFieldItemTemplateProps) {
    const [triggerRender, setTriggerRender] = useState<boolean>(false);
    const [focusedItemIndex, setFocusedItemIndex] = useState<number>();
    const theme = useTheme();
    const { buttonsProps, children, index } = props;

    /**
     * Returns the class name for a given index.
     * @return {string} - The class "highlight" if the focusedItemIndex is equal to the given index.
     */
    function getHighlightClassName(index: number) {
        return focusedItemIndex === index ? "highlight" : "";
    }

    /**
     * Moves the specified array element to a new index in the array.
     *
     * @return {void}
     */
    function moveArrayElement(element: ArrayFieldItemButtonsTemplateProps, newIndex: number) {
        setFocusedItemIndex(newIndex);
        setTriggerRender(prev => !prev);
        if (element.index < newIndex) {
            element.onMoveDownItem();
        } else {
            element.onMoveUpItem();
        }
    }
    
    return (<Paper
        key={`${index}-${triggerRender}`} // we use it to force React to render the component
        // every time triggerRender changes, so that the CSS animation become visible
        className={getHighlightClassName(index)}
        sx={{ p: theme.spacing(1), mb: theme.spacing(2) }}
    >
        {children}
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            {buttonsProps.hasMoveUp && (
                <IconButton onClick={() => moveArrayElement(buttonsProps, buttonsProps.index - 1)}>
                    <ArrowUpwardIcon color="id_mediumGray" />
                </IconButton>
            )}
            {buttonsProps.hasMoveDown && (
                <IconButton onClick={() => moveArrayElement(buttonsProps, buttonsProps.index + 1)}>
                    <ArrowDownwardIcon color="id_mediumGray" />
                </IconButton>
            )}
            {buttonsProps.hasRemove && (
                <IconButton
                    onClick={() => {
                        setFocusedItemIndex(buttonsProps.index);
                        buttonsProps.onRemoveItem();
                    }}
                >
                    <DeleteIcon color="id_mediumGray" />
                </IconButton>
            )}
        </Box>
    </Paper>);
}
