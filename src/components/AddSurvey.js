import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

function AddSurvey(props) {

    // Dialog, which is used to add new survey to database

    const [open, setOpen] = React.useState(false);
    const [survey, setSurvey] = React.useState({ name: "" });

    const handleClickOpen = () => {

        setOpen(true);
    };

    const handleClose = () => {

        setOpen(false);
    };

    const handleSave = () => {

        if (JSON.stringify(survey).toString() === '{"name":""}') {

            window.alert("Fill the required field.");

        } else {

            props.addSurvey(survey);
            handleClose();
        }
    }

    const inputChanged = e => {

        setSurvey({ ...survey, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <Button variant="contained" style={{ margin: 'auto', width: 100, height: '60%', fontSize: 15, borderRadius: 50 }} class="btn btn-success" onClick={handleClickOpen}>
                Add
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add survey</DialogTitle>
                <DialogContent>
                    <TextField
                        required
                        autoFocus
                        margin="dense"
                        id="name"
                        name="name"
                        onChange={inputChanged}
                        label="Survey name"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" style={{ margin: '10px', width: 85, height: 45, fontSize: 20, paddingTop: 5, borderRadius: 10 }} class="btn btn-success" onClick={handleSave}>Add</Button>
                    <Button variant="contained" style={{ margin: '10px', width: 85, height: 45, fontSize: 20, paddingTop: 5, borderRadius: 10 }} class="btn btn-warning" onClick={handleClose}>Back</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AddSurvey;