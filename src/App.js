import React, { useState, useEffect } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';

import './App.css';

function App() {

  const [test, setTest] = useState([]);
  const [car, setCar] = useState('');
  const [selectedcar, setSelectedCar] = useState('...');
  const [isAboutVisible, setVisible] = useState(false
  );

  const fetchTestData = () => {
    fetch('https://carstockrest.herokuapp.com/cars').then(async response => {

      try {
        const data = await response.json()
        let array = []
        array.push(data._embedded.cars[0])
        array.push(data._embedded.cars[3])
        array.push(data._embedded.cars[4])
        setTest(array);
      } catch (error) {
        console.error(error)
      }
    })

  }

  useEffect(() => {
    fetchTestData();
  }, []);

  const testInput = (event) => {
    setSelectedCar(car);
    setVisible(true);

    fetch('https://carstockrest.herokuapp.com/cars', { method: 'POST', headers: { 'Content-type': 'application/json' }, body: JSON.stringify({brand: car, model: "fav", color: "", year: "", fuel: "", price: ""}) })
      .catch(error => console.error(error))
  }

  const handleChange = (event) => {
    setVisible(false);
    setCar(event.target.value);
  };

  return (

    <div className="App" style={{ marginTop: 100 }}>
      <h2>Survey demo 0.1 Front End</h2>
      <p>(Source: HTTP GET from /cars)</p>
      <FormControl component="fieldset">
        <FormLabel component="legend">Favorite car</FormLabel>
        <RadioGroup
          aria-label="car"
          name="controlled-radio-buttons-group"
          value={car}
          onChange={handleChange}
        >
          {test.map((item, key) => (
            <FormControlLabel key={item.brand} value={item.brand} control={<Radio />} label={item.brand} />
          ))}
          <Button variant="contained" onClick={testInput}>Submit</Button>
        </RadioGroup>
      </FormControl>
      <h5>Based on our survey, your favorite car is: {selectedcar}</h5>
      {isAboutVisible ? <i>POST sended.</i> : null}
    </div>
  );
}

export default App;