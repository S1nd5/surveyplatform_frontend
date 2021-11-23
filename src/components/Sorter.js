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

function Console() {

    const [questions, setQuestions] = useState([]);

    let output = [];

    const columns = [
        {
            Header: 'Survey name',
            accessor: 'name'
        },
        {
            Header: 'Questions',
            id: 'Questions',
            accessor: 'questions',
            render: (questions) => {
                return (
                    <span>
                        {questions.value.map(questions => (<span>{questions.question}</span>))}
                    </span>
                )
            }
        },
        {
            Header: 'Street address',
            accessor: 'streetaddress'
        },
        {
            Header: 'Postcode',
            accessor: 'postcode'
        },
        {
            Header: 'City',
            accessor: 'city'
        },
        {
            Header: 'Email',
            accessor: 'email'
        },
        {
            Header: 'Phone',
            accessor: 'phone'
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

export default Console;
