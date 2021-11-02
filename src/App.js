import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';

function App() {

  const [test, setTest] = useState([]);
  const [car, setCar] = useState('...');

  const fetchTestData = () => {
    fetch('https://carstockrest.herokuapp.com/cars').then(async response => {

      try {
        const data = await response.json()
        setTest(data._embedded.cars);
        console.log(data._embedded.cars);
      } catch (error) {
        console.error(error)
      }
    })

  }

  useEffect(() => {
    fetchTestData();
  }, []);

  const printTest = (event) => {

    console.log(car);

  }

  const handleChange = (event) => {
    console.log(event.target.value);
    setCar(event.target.value);
  };

  return (
    <div className="App" style={{ marginTop: 100 }}>
      <FormControl component="fieldset">
      <FormLabel component="legend">Car</FormLabel>
      <RadioGroup
        aria-label="car"
        name="controlled-radio-buttons-group"
        value={car}
        onChange={handleChange}
      >
        <FormControlLabel value={test[0].brand} control={<Radio />} label={test[0].brand} />
        <FormControlLabel value={test[3].brand} control={<Radio />} label={test[3].brand} />
        <FormControlLabel value={test[4].brand} control={<Radio />} label={test[4].brand} />
        <Button variant="contained" onClick={printTest}>Submit</Button>
        </RadioGroup>
    </FormControl>
      <h6>Based on our survey, your favorite car is: {car}</h6>
    </div>
  );
}

export default App;
