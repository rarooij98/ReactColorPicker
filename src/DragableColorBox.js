import React from "react";
import { withStyles } from "@mui/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./styles/DraggableColorBoxStyles"

function DraggableColorBox(props) {
// Creates a draggable color box with the color name and a delete icon,
// the color box will be displayed while creating a new palette,
// the draggable color box will be displayed in the new palette form as a draggable color list

  const { classes, handleClick, name, color } = props;
  return (
    <div className={classes.root} style={{ backgroundColor: color }}>
      <div className={classes.boxContent}>
        <span>{name}</span>
        <DeleteIcon className={classes.deleteIcon} onClick={handleClick} />
      </div>
    </div>
  );
};

export default withStyles(styles)(DraggableColorBox);