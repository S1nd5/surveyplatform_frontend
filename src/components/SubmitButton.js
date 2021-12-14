import Button from '@mui/material/Button';
import React from 'react';

function SubmitButton(props) {

    //Submit button and name field show come visible on the last question

    return (
        <div>
            <Button variant="contained" style={{ margin: '10px', width: 150, height: 50, fontSize: 20, paddingTop: 5, borderRadius: 10, fontFamily: 'Courier New' }}
                class="btn btn-info" onClick={props.postData}>Submit</Button>
        </div>
    );
}

export default SubmitButton;
