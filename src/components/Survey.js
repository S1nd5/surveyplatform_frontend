import React, { useState, useEffect } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import '../css/bootstrap.min.css';

function Survey(props) {

    const [respondent, setRespondent] = useState("");
    const [questions, setQuestions] = useState([]);

    const [surveyId, setSurveyId] = useState(props.match.params.surveyId);
    const [ansNeeded, setAnsNeeded] = useState(0);
    const [surveyLength, setSurveyLength] = useState();

    const [ansMap, setAnsMap] = useState([]);
    const [selectedAns, setSelectedAns] = useState([]);

    const [isVisible, setVisible] = useState(false);
    const [progValue, setProgValue] = useState(0);

    const [usedAnswer, setUsedAnswer] = useState([]);

    let ansArray = [];
    let quesArray = [];
    let filteredData = [];

    const fetchData = () => {

        fetch('https://json.awsproject.link/surveys').then(async response => {

            try {

                //Whole survey data
                const data = await response.json()

                //How many questions there is in this survey
                setSurveyLength(data[surveyId - 1].questions.length);

                //Saving surveyId
                setSurveyId(data[surveyId - 1].s_id);

                //Radiobutton values
                ansArray.push(data[0].questions[0].opt1)
                ansArray.push(data[0].questions[0].opt2)
                ansArray.push(data[0].questions[0].opt3)

                setAnsMap(ansArray);

                //Question values
                for (let i = 0; i < data[surveyId - 1].questions.length; i++) {

                    quesArray.push(data[surveyId - 1].questions[i].question);
                }

                setQuestions(quesArray);

            } catch (error) {
                console.error(error)
            }
        })
    }

    useEffect(() => {

        fetchData();
        // eslint-disable-next-line
    }, []);

    //Change to next survey
    const nextPage = () => {

        const id = parseInt(props.match.params.surveyId) + 1;

        if (surveyLength > surveyId) {

            window.location.href = "https://dev.awsproject.link/Survey%20" + id;

        } else {

            window.alert("This is the last survey.");
        }
    }

    //Send post request via rest
    const postData = () => {

        //Does the answer include everything?
        if (ansNeeded >= surveyLength) {
            if (respondent.toString().includes(" ") && respondent.toString().split(" ")[1] !== "") {

                //Answers in reverse order, so we get the latest choices
                let chars = [];
                selectedAns.reverse();

                for (let i = 0; i < selectedAns.length; i++) {

                    if (!chars.includes(JSON.stringify(selectedAns[i]).split('"')[1])) {

                        filteredData.push(selectedAns[i]);
                        chars.push(JSON.stringify(selectedAns[i]).split('"')[1]);
                    }
                }

                let data = [];

                filteredData.reverse();

                //Let's assemble data needed for post

                for (let i = 0; i < filteredData.length; i++) {

                    let char = "Q" + (i + 1).toString();
                    data.push({ survey: { s_id: surveyId.toString() }, question: { q_id: (char.split("Q")[1]).toString() }, answer1: filteredData[i][char], answer2: "", answer3: "", answer4: "" });
                }

                fetch('https://json.awsproject.link/answers', { method: 'POST', headers: { 'Content-type': 'application/json' }, body: JSON.stringify({ answers: { respondent: respondent, survey: surveyId.toString(), data: data } }) })
                    .catch(error => console.error(error))

                setVisible(true);

            } else {
                window.alert("Name has a wrong format.");
            }

        } else {
            window.alert("Answer to all the questions.");
        }
    }

    //React (pun intended) to changes in radiobutton data

    const handleChange = (event) => {

        valueAdder(event.target.name);

        setAnsNeeded(ansNeeded + 1);

        let answer = JSON.parse('{"Q' + (questions.indexOf(event.target.name) + 1).toString() + '":"' + event.target.value + '"}');

        setSelectedAns(oldArray => [...oldArray, answer]);
    }

    //Change progress bar %

    const valueAdder = (value) => {

        if (value === 100 / (surveyLength + 1)) {

            setProgValue(progValue - value);

        } else {

            const even = (element) => element === value;

            setUsedAnswer(oldArray => [...oldArray, value])

            if (usedAnswer.some(even) === false && progValue !== 100) {

                setProgValue(progValue + 100 / (surveyLength + 1));
            }
        }
    }

    //React to changes in respondent data

    const handleRespondent = (event) => {

        setRespondent(event.target.value)

        if (event.target.value.split(" ")[1] !== "" && event.target.value.toString().length > 2) {
            // eslint-disable-next-line
            if (respondent !== "" && respondent.includes(" ") && 100 / (surveyLength + 1) + progValue === 100 || progValue === 0 && progValue < 100 / (surveyLength + 1) && respondent !== "" && respondent.includes(" ")) {

                valueAdder(event.target.value);
            }
            // eslint-disable-next-line
            if (!event.target.value.includes(" ") && progValue == 100 || !event.target.value.includes(" ") && progValue == 100 / (surveyLength + 1)) {

                valueAdder(100 / (surveyLength + 1));
            }
        }
    };

    //Progress bar

    function LinearProgressWithLabel(props) {
        return (
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={{ width: "100%", mr: 1 }}>
                    <LinearProgress variant="determinate" {...props} />
                </Box>
                <Box sx={{ minWidth: 35 }}>
                    <Typography variant="body2" color="text.secondary">{`${Math.round(
                        props.value
                    )}%`}</Typography>
                </Box>
            </Box>
        );
    }

    LinearProgressWithLabel.propTypes = {

        value: PropTypes.number.isRequired
    };

    return (

        <div>
            <LinearProgressWithLabel value={progValue} />
            <h1>Survey {surveyId}</h1>
            <h2>Demo 1.0.0</h2>
            <Link style={{ color: 'white' }} to="/"><button variant="contained" style={{ margin: '10px' }} class="btn btn-primary">Home</button></Link>
            <Button variant="contained" style={{ margin: '10px' }} class="btn btn-primary" onClick={nextPage}>Next</Button>
            {questions.map((item, key) => (
                <div style={{ marginTop: 30 }}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend" key={key}>{item}</FormLabel>
                        <RadioGroup
                            aria-label="quiz"
                            name={item}
                            onChange={handleChange}

                        >

                            {ansMap.map((item, key) => (

                                <FormControlLabel key={key} value={item} control={<Radio />} label={item} />
                            ))}

                        </RadioGroup>

                    </FormControl>

                </div>
            ))}
            <form>
                <input type="text" id="name" name="name" placeholder="E.g. John Smith" onChange={handleRespondent} />
            </form>

            <Button variant="contained" style={{ margin: '10px' }} class="btn btn-primary" onClick={postData}>Submit</Button>

            <div style={{ marginTop: 20, color: "green" }}>{isVisible ? <i>Success</i> : null}</div>

        </div>
    );
}

export default Survey;
