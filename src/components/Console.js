import React, { useState, useEffect } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';

function Console() {

    const [admin, setAdmin] = useState([]);

    const fetchTestData = () => {
        fetch('https://json.awsproject.link/surveys').then(async response => {

            try {
                const data = await response.json()

                console.log(data);

            } catch (error) {
                console.error(error)
            }
        })
    }

    useEffect(() => {
        fetchTestData();
    }, []);

    const postData = () => {

        /*           fetch('https://json.awsproject.link/answers', { method: 'POST', headers: { 'Content-type': 'application/json' }, body: JSON.stringify({ survey: surveyId, question: questionId, answer1: selectedAns }) })
                       .catch(error => console.error(error))
       
             */
    }

    return (

        <div>
            <h1>Admin console</h1>
        </div>
    );
}

export default Console;
