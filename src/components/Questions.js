import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table-6';
import Button from '@mui/material/Button';

import AddQuestion from './AddQuestion';

import '../css/bootstrap.min.css';
import 'react-table-6/react-table.css';

function Questions() {

    const [questions, setQuestions] = useState([]);

    let dataArray = [];

    // Reactable columns

    const columns = [
        {
            Header: 'Survey name',
            maxWidth: '110',
            accessor: 'name'
        },
        {
            Header: 'Survey Id',
            maxWidth: '80',
            accessor: 's_id'
        },
        {
            Header: 'Question',
            maxWidth: '200',
            accessor: 'question'
        },
        {
            Header: 'Question Id',
            maxWidth: '100',
            accessor: 'q_id'
        },
        {
            Header: 'Question type',
            maxWidth: '115',
            accessor: 'q_type'
        },
        {
            Header: 'Option 1',
            maxWidth: '75',
            accessor: 'opt1'
        },
        {
            Header: 'Option 2',
            maxWidth: '75',
            accessor: 'opt2'
        },
        {
            Header: 'Option 3',
            maxWidth: '75',
            accessor: 'opt3'
        },
        {
            Header: 'Option 4',
            maxWidth: '75',
            accessor: 'opt4'
        },
        {
            Header: 'Option 5',
            maxWidth: '75',
            accessor: 'opt5'
        },
        {
            filterable: false,
            sortable: false,
            maxWidth: '100',
            Cell: row => (<Button style={{ margin: '10px', width: 85, height: 45, fontSize: 20, paddingTop: 5, borderRadius: 10 }} variant="contained" onClick={() => deleteQuestion("https://json.awsproject.link/questions/" + row.original.q_id)} class="btn btn-danger">Delete</Button>)
        }
    ]

    // Data for the table

    const fetchData = () => {
        fetch('https://json.awsproject.link/surveys').then(async response => {

            try {

                const data = await response.json()

                let b = 0;

                for (let a = 0; a < data.length; a++) {

                    b = 0;

                    while (b < data[a].questions.length) {

                        dataArray.push({ "name": data[a].name, "q_type": data[a].questions[b].q_type, "question": data[a].questions[b].question, "opt1": data[a].questions[b].opt1, "opt2": data[a].questions[b].opt2, "opt3": data[a].questions[b].opt3, "opt4": data[a].questions[b].opt4, "q_id": data[a].questions[b].q_id, "s_id": data[a].s_id });
                        b++;
                    }
                }

                setQuestions(dataArray);

            } catch (error) {
                console.error(error)
            }
        })
    }

    useEffect(() => {

        fetchData();
        // eslint-disable-next-line
    }, []);

    // Add or delete survey from table

    const addQuestion = question => {

        fetch('https://json.awsproject.link/questions',
            {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(question)
            }
        )
            .then(response => fetchData())
            .catch(error => console.error(error))
    }

    const deleteQuestion = (value) => {

        if (window.confirm("Do you really want to delete this question?")) {

            fetch(value, { method: 'DELETE' })
                .then(response => fetchData())
                .catch(error => console.error(error))
        }
    }

    // Rendering table

    return (
        <div>
            <div style={{ backgroundColor: 'white', width: 1100, margin: 'auto', marginTop: 25, borderRadius: 20  }}>
                <h1 style={{ margin: 10 }}>Questions</h1>
                <Button variant="contained" style={{ margin: 'auto', marginRight: 10, width: 100, height: '60%', fontSize: 15, borderRadius: 50, color: 'white' }} class="btn btn-primary" href="/">Home</Button>
                <Button variant="contained" style={{ margin: 'auto', marginRight: 10, width: 100, height: '60%', fontSize: 15, borderRadius: 50, color: 'white' }} class="btn btn-secondary" href="/surveys">Surveys</Button>
                <Button variant="contained" style={{ margin: 'auto', marginRight: 5, width: 100, height: '60%', fontSize: 15, borderRadius: 50, color: 'white' }} class="btn btn-info" href="/statistics">Statistics</Button>
                <Button><AddQuestion addQuestion={addQuestion} /></Button>
                <ReactTable filterable={true} defaultPageSize={10}
                    data={questions} columns={columns} />
            </div>
        </div>
    );
}

export default Questions;
