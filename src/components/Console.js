import React from 'react';
import Button from '@mui/material/Button';

import '../css/bootstrap.min.css';

function Console() {

    // Home page 

    return (
        <div>
            <div style={{ backgroundColor: 'white', width: 400, height: '50%', margin: 'auto', marginTop: 200, borderRadius: 40 }}>
                <h1 style={{ paddingTop: 10 }}>Admin Console</h1>
                <Button variant="contained" style={{ margin: 'auto', width: 300, height: '60%', fontSize: 30, borderRadius: 50 }} class="btn btn-info" href="/surveys" >Surveys</Button>
                <br />
                <br />
                <Button variant="contained" style={{ margin: 'auto', width: 300, height: '60%', fontSize: 30, borderRadius: 50 }} class="btn btn-info" href="/questions">Questions</Button>
                <br />
                <br />
                <Button variant="contained" style={{ margin: 'auto', width: 300, height: '60%', fontSize: 30, borderRadius: 50 }} class="btn btn-info" href="/statistics">Statistics</Button>
                <br />
                <br />
            </div>
        </div>
    );
}

export default Console;
