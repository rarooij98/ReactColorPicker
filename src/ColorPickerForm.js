import React, { useState, useEffect } from "react";
import { ChromePicker } from "react-color";
import "./styles/ColorPickerForm.css";
// MUI
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Button from "@mui/material/Button";

export default function ColorPickerForm(props) {
// Displays a form to create a new color palette
    
    const { paletteIsFull, colors } = props;
    const [currentColor, setCurrentColor] = useState("#EF5959");
    const [newColorName, setNewColorName] = useState("");
    
    // Validate if the palette and color names are unique
    useEffect(() => {
        ValidatorForm.addValidationRule("isColorNameUnique", (value) => {
            return colors.every(
                ({ name }) => name.toLowerCase() !== value.toLowerCase()
            );
        });
        ValidatorForm.addValidationRule("isColorUnique", () => {
            return colors.every(
                ({ color }) =>
                    color.toLowerCase() !== currentColor.toLowerCase()
            );
        });
    });

    // Updates the color picker state
    const updateCurrentColor = (color) => setCurrentColor(color.hex);
    
    // Updates the color name state
    const handleChange = (e) => {
        setNewColorName(e.target.value);
    };
    
    // Submits the new color to the new palette
    const handleSubmit = () => {
        const newColor = {
            color: currentColor,
            name: newColorName,
        };
        props.addNewColor(newColor);
        setNewColorName("");
    };

    // Renders a form with a color picker, text field for the color name, and submit button
    return (
        <div>
            <ChromePicker
                className="CPF-picker"
                color={currentColor}
                onChangeComplete={updateCurrentColor}
            />
            <ValidatorForm
                autoComplete="off"
                onSubmit={handleSubmit}
                instantValidate={false}
            >
                <TextValidator
                    id="filled-error-helper-text"
                    label="Color Name"
                    placeholder="Color Name"
                    value={newColorName}
                    className="CPF-colorNameInput"
                    name="newColorName"
                    variant="filled"
                    margin="normal"
                    onChange={handleChange}
                    validators={[
                        "required",
                        "isColorNameUnique",
                        "isColorUnique",
                    ]}
                    errorMessages={[
                        "Color name is required",
                        "Name must be unique",
                        "You already used this color",
                    ]}
                />
                <Button
                    variant="contained"
                    color="primary"
                    className="CPF-addColor"
                    type="submit"
                    disabled={paletteIsFull}
                    style={{
                        backgroundColor: paletteIsFull ? "grey" : currentColor,
                    }}
                >
                    {paletteIsFull ? "Palette Full" : "Add Color"}
                </Button>
            </ValidatorForm>
        </div>
    );
}