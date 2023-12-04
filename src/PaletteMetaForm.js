import React, { useEffect, useState } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
// MUI
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function PaletteMetaForm(props) {
// Dial that let's the user choose a name and emoji for the new palette
    
    const { newPaletteName, setNewPaletteName, handleSubmit, hideForm, palettes } = props;
    const [stage, setStage] = useState("form");

    // The name of the new palette has to be unique
    useEffect(() => {
        ValidatorForm.addValidationRule("isPaletteNameUnique", (value) => {
            return palettes.every(
                ({ paletteName }) =>
                    paletteName.toLowerCase() !== value.toLowerCase()
            );
        });
    });

    // Keeps track of changes in the name and emoji imputs
    const handleChange = (e) => {
        setNewPaletteName(e.target.value);
    };
    const showEmojiPicker = () => {
        setStage("emoji");
    };
    
    // Calls the handleSubmit function to save the new palette
    const submitPalette = (emoji) => {
        const newPalette = {
          paletteName: newPaletteName,
          emoji: emoji.native,
        };
        handleSubmit(newPalette);
        setStage("");
      };
    
    return (
        <div>
            <Dialog open={stage === "emoji"} onClose={hideForm}>
                <DialogTitle>Choose a Palette Emoji</DialogTitle>
                <Picker data={data} onEmojiSelect={submitPalette} theme="light" />
            </Dialog>

            <Dialog open={stage === "form"} onClose={hideForm}>
                <DialogTitle>Choose a Palette Name</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter a name for your beautiful palette. Make
                        sure it's unique!
                    </DialogContentText>

                    <ValidatorForm
                        autoComplete="off"
                        onSubmit={showEmojiPicker}
                    >
                        <TextValidator
                            label="Palette Name"
                            value={newPaletteName}
                            name="newPaletteName"
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            validators={["required", "isPaletteNameUnique"]}
                            errorMessages={[
                                "Enter a Palette Name",
                                "Name is already taken",
                            ]}
                        />
                        <DialogActions>
                            <Button onClick={hideForm}>Cancel</Button>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                            >
                                Save Palette
                            </Button>
                        </DialogActions>
                    </ValidatorForm>
                </DialogContent>
            </Dialog>
        </div>
    );
}