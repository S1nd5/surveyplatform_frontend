import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import _ from 'lodash';

function MultipleChoicesQuestion(props) {

    const [amount, setAmount] = useState(0);

    const inputChanged = e => {

        setAmount(e.target.value);
    }

    // How many answer choices there are to the question

    let options = [];
    _.times(amount, (i) => {
        options.push(<div><TextField
            margin="dense"
            id={"opt" + (i + 1)}
            name={"opt" + (i + 1)}
            onChange={props.inputChanged}
            label={"Option " + (i + 1)}
            fullWidth
            variant="standard"
            required
        />
            <br /></div>
        );
    });

    return (
        <div>
            <br />
            <select id="amount" name="amount" variant="standard" class="form-select" onChange={inputChanged}>
                <option defaultValue>Choose amount of choices</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
            </select>
            <TextField
                margin="dense"
                id="question"
                name="question"
                onChange={props.inputChanged}
                label="Question"
                fullWidth
                variant="standard"
                required
            />
            {options}
        </div>
    );
}

export default MultipleChoicesQuestion;
