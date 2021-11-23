import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table-6';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';

import '../css/bootstrap.min.css';
import 'react-table-6/react-table.css';

function Questions() {

    const [questions, setQuestions] = useState([]);

    let output = "";

    const columns = [
        {
            Header: 'Survey name',
            accessor: 'name'
        },
        {
            Header: 'Questions',
            Cell: row => (<div>{questions.map((item, key) => (
                <p key={key}>{console.log(item)}</p>

            ))}</div>)
        }
    ]

    const fetchData = () => {
        fetch('https://json.awsproject.link/surveys').then(async response => {

            try {
                const data = await response.json()

                setQuestions(data);

            } catch (error) {
                console.error(error)
            }
        })
    }

    useEffect(() => {
        fetchData();
    }, []);

    const postData = () => {

        /*           fetch('https://json.awsproject.link/answers', { method: 'POST', headers: { 'Content-type': 'application/json' }, body: JSON.stringify({ survey: surveyId, question: questionId, answer1: selectedAns }) })
                       .catch(error => console.error(error))
       
             */
    }

    return (

        <div>
            <h1>Admin console</h1>
            <ReactTable filterable={true} defaultPageSize={10}
                data={questions} columns={columns} />
        </div>
    );
}

export default Questions;
