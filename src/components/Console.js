import React from 'react';
import Button from '@mui/material/Button';

import '../css/bootstrap.min.css';
import '../css/App.css';

function Console() {

    // Home page 

    return (
        <div className="App">
            <div style={{ backgroundColor: 'white', width: 600, height: 700, margin: 'auto', marginTop: 100, borderRadius: 10 }}>
                <h1 style={{ paddingTop: 50 }}>Admin Console</h1>
                <Button variant="contained" style={{ margin: '10px', width: '60%', height: '20%', fontSize: 50, paddingTop: 30, borderRadius: 10 }} class="btn btn-info" href="/surveys" >Surveys</Button>
                <br />
                <Button variant="contained" style={{ margin: '10px', width: '60%', height: '20%', fontSize: 50, paddingTop: 30, borderRadius: 10 }} class="btn btn-info" href="/questions">Questions</Button>
                <br />
                <Button variant="contained" style={{ margin: '10px', width: '60%', height: '20%', fontSize: 50, paddingTop: 30, borderRadius: 10 }} class="btn btn-info" href="/statistics">Statistics</Button>
            </div>
        </div>
    );
}

export default Console;
