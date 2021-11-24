import { Box, FormControl, FormLabel } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import Animation from './Animation';

import '../css/bootstrap.min.css';
import '../css/App.css';

function Home() {

  const [dataComponent, setDataComponent] = useState([]);

  let dataArray = [];

  //Fetching the data needed for Survey buttons on Home page, putting it to useState Hook and mapping it to page later on

  const fetchData = () => {

    fetch('https://json.awsproject.link/surveys').then(async response => {

      try {
        const data = await response.json()

        for (let i = 0; i < data.length; i++) {

          dataArray.push({ addres: "Survey " + (i + 1).toString(), label: data[i].name });
          //labelArray.push(data[i].name);
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

    <div style={{ fontFamily: 'Courier New' }}>
      <div><Animation /></div>
      <div style={{ backgroundColor: 'white', width: 600, height: 'auto', margin: 'auto', marginTop: 50, borderRadius: 10 }}>
        <Box>
          <FormControl component="fieldset" margin='dense'>
            <FormLabel
              component="legend" style={{ fontSize: 40, color: 'black', fontFamily: 'Courier New' }}>Surveys
            </FormLabel>
            {dataComponent.map((item, key) => (
              <Link style={{ color: 'white' }} to={item.addres} key={key}><button style={{ marginTop: '10px', marginBottom: '10px', width: 'auto', height: 'auto', minHeight: 50, minWidth: 120 }} class="btn btn-primary">{item.label}</button></Link>
            ))}
          </FormControl>
        </Box>
      </div>
      <img src="https://i.ibb.co/Npb79BV/logo-2.png" alt="logo" style={{ marginTop: 350 }}></img>
    </div>

  );
}

export default Home;
