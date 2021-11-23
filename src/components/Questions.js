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
            maxWidth: '200',
            accessor: 'name'
        },
        {
            Header: 'Survey Id',
            maxWidth: '80',
            accessor: 's_id'
        },
        {
            Header: 'Question',
            maxWidth: '400',
            accessor: 'question'
        },
        {
            Header: 'Question Id',
            maxWidth: '100',
            accessor: 'q_id'
        },
        {
            Header: 'Option 1',
            maxWidth: '100',
            accessor: 'opt1'
        },
        {
            Header: 'Option 2',
            maxWidth: '100',
            accessor: 'opt2'
        },
        {
            Header: 'Option 3',
            maxWidth: '100',
            accessor: 'opt3'
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

                        dataArray.push({ "name": data[a].name, "question": data[a].questions[b].question, "opt1": data[a].questions[b].opt1, "opt2": data[a].questions[b].opt2, "opt3": data[a].questions[b].opt3, "opt4": data[a].questions[b].opt4, "q_id": data[a].questions[b].q_id, "s_id": data[a].s_id });
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

        if (window.confirm("Do you really want to delete this survey? All the related data will be deleted.")) {

            fetch(value, { method: 'DELETE' })
                .then(response => fetchData())
                .catch(error => console.error(error))
        }
    }

    // Rendering table

    return (
        <div>
            <div style={{ width: 600, height: 120, margin: 'auto', marginTop: 50, borderRadius: 10 }}>
                <Button variant="contained" style={{ margin: '10px', width: 200, height: 100, fontSize: 30, paddingTop: 20, borderRadius: 10 }} class="btn btn-primary" href="/">Home</Button>
                <Button variant="contained" style={{ margin: '10px', width: 200, height: 100, fontSize: 30, paddingTop: 20, borderRadius: 10 }} class="btn btn-secondary" href="/surveys">Surveys</Button>
            </div>
            <div style={{ backgroundColor: 'white', width: 1200, marginLeft: 'auto', marginRight: 'auto', borderRadius: 10 }}>
                <h1 style={{ margin: 10 }}>Questions</h1>
                <AddQuestion addQuestion={addQuestion} />
                <ReactTable filterable={true} defaultPageSize={10}
                    data={questions} columns={columns} />
            </div>
        </div>
    );
}

export default Questions;
