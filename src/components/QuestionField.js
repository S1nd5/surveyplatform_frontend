import React from 'react';
import TextField from '@mui/material/TextField';

function QuestionField(props) {

    // One QuestionField for questions, which already have standard answers

    return (
        <div>
            <TextField
                margin="dense"
                autoFocus
                id="question"
                name="question"
                onChange={props.inputChanged}
                label="Question"
                fullWidth
                variant="standard"
                required
            />
        </div>
    );
}

export default QuestionField;
