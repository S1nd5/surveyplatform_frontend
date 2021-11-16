import React, { useState, useEffect } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';

function Survey() {

    const [ques, setQues] = useState([]);
    const [ans, setAns] = useState([]);

    const [surveyId, setSurveyId] = useState();
    const [questionId, setquestionId] = useState();

    const [selectedAns, setSelectedAns] = useState('');

    const [isVisible, setVisible] = useState(false);
    const [error, setError] = useState(false);

    let quesArray = []
    let ansArray = []

    const fetchTestData = () => {
        fetch('https://json.awsproject.link/surveys').then(async response => {

            try {
                const data = await response.json()

                for (let i = 0; i < data.length; i++) {

                    quesArray.push(data[i].questions[0].question);

                }

                console.log(data[0].questions[0].question);

                setQues(quesArray);

                setSurveyId(data[0].questions[0].q_id.toString());
                setquestionId(data[0].questions[0].q_id.toString());

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

    const postData = () => {
        if (selectedAns !== '') {
            setVisible(true);

            fetch('https://json.awsproject.link/answers', { method: 'POST', headers: { 'Content-type': 'application/json' }, body: JSON.stringify({ survey: surveyId, question: questionId, answer1: selectedAns }) })
                .catch(error => console.error(error))

        } else {
            setError(true);
        }
    }

    const handleChange = (event) => {

        //console.log(ques.indexOf(event.target.name));

        setVisible(false);
        setError(false);
        setSelectedAns(event.target.value);
    };

    return (

        <div>
            <h2>Survey demo 1.0.0 Front End</h2>
            <p>(Source: HTTP GET from /surveys)</p>
            {ques.map((item, key) => (
                <div style={{ marginTop: 30 }}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">{item}</FormLabel>
                        <RadioGroup
                            aria-label="car"
                            name={item}
                            onChange={handleChange}

                        >

                            {ans.map((item, key) => (

                                <FormControlLabel key={key} value={item} control={<Radio />} label={item} />
                            ))}
                            <Button variant="contained" onClick={postData}>Submit</Button>
                        </RadioGroup>
                    </FormControl>
                </div>
            ))}

            <div style={{ marginTop: 20 }}>{isVisible ? <i>POST sended.</i> : null}</div>
            <div style={{ marginTop: 20, color: "red" }}>{error ? <b>Error</b> : null}</div>
        </div>
    );
}

export default Survey;
