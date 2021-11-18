import { Box, FormControl, FormLabel } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import '../css/App.css';
import '../css/bootstrap.min.css';

function Home() {

  const [dataComponent, setDataComponent] = useState([]);

  let dataArray = []

  const fetchData = () => {

    fetch('https://json.awsproject.link/surveys').then(async response => {

      try {
        const data = await response.json()

        for (let i = 0; i < data.length; i++) {

          dataArray.push("Survey " + (i + 1).toString());
        }

        setDataComponent(dataArray);

      } catch (error) {

        console.error(error)
      }
    })
  }

  useEffect(() => {

    fetchData();
    // eslint-disable-next-line
  }, []);

  return (

    <div>
      <h1>Welcome to SurveyHub!</h1>
      <Box>
        <FormControl component="fieldset" margin='dense'>
          <FormLabel
            component="legend">Surveys
          </FormLabel>
          {dataComponent.map((item, key) => (
            <Link style={{ color: 'white' }} to={item} key={key}><button style={{ marginTop: '10px', marginBottom: '10px', width: 100 }} class="btn btn-primary">{item}</button></Link>
          ))}
        </FormControl>
      </Box>
    </div>
  );
}

export default Home;
