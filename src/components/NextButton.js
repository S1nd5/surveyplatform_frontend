import Button from '@mui/material/Button';
import React from 'react';

function NextButton(props) {

    //Go to the next question
    
    return (
        <div>
            <Button variant="contained" style={{ margin: '10px', width: 150, height: 50, fontSize: 20, paddingTop: 5, borderRadius: 10, fontFamily: 'Courier New' }}
                class="btn btn-secondary" onClick={props.nextQuestion}>Next</Button>
        </div>
    );
}

export default NextButton;
