import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table-6';
import Button from '@mui/material/Button';

import AddSurvey from './AddSurvey';

import '../css/bootstrap.min.css';
import 'react-table-6/react-table.css';


function Surveys() {

    const [surveys, setSurveys] = useState([]);

    let dataArray = [];

    // Reactable columns

    const columns = [
        {
            Header: 'Survey name',
            maxWidth: '400',
            accessor: 'name'
        },
        {
            Header: 'Survey Id',
            maxWidth: '80',
            accessor: 's_id'
        },
        {
            filterable: false,
            sortable: false,
            maxWidth: '100',
            Cell: row => (<Button style={{ margin: '10px', width: 85, height: 45, fontSize: 20, paddingTop: 5, borderRadius: 10 }} variant="contained" onClick={() => deleteSurvey("https://json.awsproject.link/surveys/" + row.original.s_id)} class="btn btn-danger">Delete</Button>)
        }
    ]

    // Data for the table

    const fetchData = () => {
        fetch('https://json.awsproject.link/surveys').then(async response => {

            try {

                const data = await response.json()

                for (let a = 0; a < data.length; a++) {

                    dataArray.push({ "name": data[a].name, "s_id": data[a].s_id });
                }

                setSurveys(dataArray);

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

    const addSurvey = survey => {
        fetch('https://json.awsproject.link/surveys',
            {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(survey)
            }
        )
            .then(response => fetchData())
            .catch(error => console.error(error))
    }

    const deleteSurvey = (value) => {

        if (window.confirm("Do you really want to delete this survey? All the related data will be deleted.")) {

            fetch(value, { method: 'DELETE' })
                .then(response => fetchData())
                .catch(error => console.error(error))
        }
    }

    // Rendering table

    return (
        <div>
            <div style={{ width: 600, height: 120, margin: 'auto', marginTop: 50, borderRadius: 10}}>
                <Button variant="contained" style={{ margin: '10px', width: 200, height: 100, fontSize: 30, paddingTop: 20, borderRadius: 10 }} class="btn btn-primary" href="/">Home</Button>
                <Button variant="contained" style={{ margin: '10px', width: 200, height: 100, fontSize: 30, paddingTop: 20, borderRadius: 10 }} class="btn btn-secondary" href="/questions">Questions</Button>
            </div>

            <div style={{ backgroundColor: 'white', width: 600, marginLeft: 'auto', marginRight: 'auto', borderRadius: 10 }}>
                <h1 style={{ margin: 10 }}>Surveys</h1>
                <AddSurvey addSurvey={addSurvey} />
                <ReactTable filterable={true} defaultPageSize={10}
                    data={surveys} columns={columns} />
            </div>
        </div>
    );
}

export default Surveys;
