import React, { useState, useEffect } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';

import './App.css';

function App() {

  const [ques, setQues] = useState([]);
  const [ans, setAns] = useState([]);
  const [selectedAns, setSelectedAns] = useState('');
  const [isVisible, setVisible] = useState(false);
  const [error, setError] = useState(false);

  const fetchTestData = () => {
    fetch('http://surveybackend-env.eba-8pzkmxef.eu-central-1.elasticbeanstalk.com/surveys').then(async response => {

      try {
        const data = await response.json()
        let quesArray = []
        let ansArray = []

        quesArray.push(data[0].questions[0].question);
        setQues(quesArray);

        ansArray.push(data[0].questions[0].opt1)
        ansArray.push(data[0].questions[0].opt2)
        ansArray.push(data[0].questions[0].opt3)
        setAns(ansArray);

      } catch (error) {
        console.error(error)
      }
    })

  }

  useEffect(() => {
    fetchTestData();
  }, []);

  const postData = (event) => {
    if (selectedAns != '...') {
      setVisible(true);
    } else {
      setError(true);
    }

    /*fetch('http://surveybackend-env.eba-8pzkmxef.eu-central-1.elasticbeanstalk.com/answer', { method: 'POST', headers: { 'Content-type': 'application/json' }, body: JSON.stringify(SISÄLTÖ) })
      .catch(error => console.error(error))*/
  }

  const handleChange = (event) => {
    setVisible(false);
    setError(false);
    setSelectedAns(event.target.value);
  };

  return (

    <div className="App" style={{ marginTop: 100 }}>
      <h2>Survey demo 0.2 Front End</h2>
      <p>(Source: HTTP GET from /surveys)</p>
      <FormControl component="fieldset">
        <FormLabel component="legend">{ques}</FormLabel>
        <RadioGroup
          aria-label="car"
          name="controlled-radio-buttons-group"
          onChange={handleChange}

        >
          {ans.map((item, key) => (

            <FormControlLabel key={key} value={item} control={<Radio />} label={item} />
          ))}
          <Button variant="contained" onClick={postData}>Submit</Button>
        </RadioGroup>
      </FormControl>
      <div style={{ marginTop: 20 }}>{isVisible ? <i>POST sended.</i> : null}</div>
      <div style={{ marginTop: 20, color: "red" }}>{error ? <b>Error</b> : null}</div>
    </div>
  );
}

export default App;
