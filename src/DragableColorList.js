import React from "react";
import DragableColorBox from "./DragableColorBox";
import { ReactSortable } from "react-sortablejs";
 
export default function DragableColorList(props) {
// Creates a list of all draggable color boxes that are displayed while creating a new palette,
// this will be displayed in the new palette form

    const { colors, setColors, removeColor } = props;
    return (
        <ReactSortable
            tag="div"
            list={colors}
            setList={setColors}
            style={{ height: "100%" }}
        >
            {colors.map((color, i) => (
                <DragableColorBox
                    index={i}
                    key={color.name}
                    color={color.color}
                    name={color.name}
                    handleClick={() => removeColor(color.name)}
                />
            ))}
        </ReactSortable>
    );
}