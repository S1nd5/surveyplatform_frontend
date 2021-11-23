import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

function AddQuestion(props) {

    // Dialog, which is used to add new question to database

    const [open, setOpen] = React.useState(false);
    const [question, setQuestion] = React.useState({ s_id: "", opt1: "", opt2: "", opt3: "", opt4: "Ehkä", question: "" });

    const handleClickOpen = () => {

        setOpen(true);
    };

    const handleClose = () => {

        setOpen(false);
    };

    const handleSave = () => {

        if (question.s_id === "" || question.opt1 === "" || question.opt2 === "" || question.opt3 === "" || question === "") {

            window.alert("Fill the required field(s).");

        } else {

console.log({ survey: { s_id: question.s_id }, opt1: question.opt1, opt2: question.opt2, opt3: question.opt3, opt4: question.opt4, question: question.question });

            props.addQuestion({ survey: { s_id: question.s_id }, opt1: question.opt1, opt2: question.opt2, opt3: question.opt3, opt4: question.opt4, question: question.question });
            handleClose();
        }
    }

    const inputChanged = e => {

        setQuestion({ ...question, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <Button variant="contained" style={{ margin: '10px', width: 150, height: 50, fontSize: 20, paddingTop: 5, borderRadius: 10 }} class="btn btn-info" onClick={handleClickOpen}>
                Add question
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add question</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="s_id"
                        name="s_id"
                        onChange={inputChanged}
                        label="Survey Id"
                        fullWidth
                        variant="standard"
                        required
                    />
                    <TextField
                        margin="dense"
                        id="question"
                        name="question"
                        onChange={inputChanged}
                        label="Question"
                        fullWidth
                        variant="standard"
                        required
                    />
                    <TextField
                        margin="dense"
                        id="op1"
                        name="opt1"
                        onChange={inputChanged}
                        label="Option 1"
                        fullWidth
                        variant="standard"
                        required
                    />
                    <TextField
                        margin="dense"
                        id="op2"
                        name="opt2"
                        onChange={inputChanged}
                        label="Option 2"
                        fullWidth
                        variant="standard"
                        required
                    />
                    <TextField
                        margin="dense"
                        id="op3"
                        name="opt3"
                        onChange={inputChanged}
                        label="Option 3"
                        fullWidth
                        variant="standard"
                        required
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

export default AddQuestion;