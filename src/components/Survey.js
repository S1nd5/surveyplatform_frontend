import React, { useState, useEffect } from 'react';
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import SubmitButton from "./SubmitButton.js";
import NextButton from "./NextButton.js";
import Statistics from './Statistics.js';
import QuestionGenerator from './QuestionGenerator';

import '../css/bootstrap.min.css';

function Survey(props) {

    // eslint-disable-next-line
    const [surveyId, setSurveyId] = useState(props.match.params.surveyId);

    const [currentQuestionId, setCurrentQuestionId] = useState(0);
    const [questions, setQuestions] = useState([]);

    const [feedBackVisible, setFeedBackVisible] = useState(false);
    const [isAppReady, setIsAppReady] = useState(false);

    const [progressValue, setProgressValue] = useState(0);
    // eslint-disable-next-line
    const [selectedAnswer, setSelectedAnswer] = useState(1);

    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [lastAnswer, setLastAnswer] = useState("");

    let filteredData = [];
    let questionsData = [];
    let sliderValue = ["Täysin samaa mieltä", "Lähes samaa mieltä", "En osaa sanoa", "Lähes eri mieltä", "Täysin eri mieltä"];

    async function fetchData() {

        //Fetch data related to survey

        try {

            const response = await fetch('https://json.awsproject.link/surveys');

            const data = await response.json();

            for (let a = 0; a < data.length; a++) {

                let b = 0;
                for (b = 0; b < data[a].questions.length; b++) {

                    if (data[a].s_id === data[surveyId - 1].s_id) {

                        questionsData.push({
                            name: data[a].name,
                            q_id: data[a].questions[b].q_id, q_type: data[a].questions[b].q_type, question: data[a].questions[b].question, options: [
                                data[a].questions[b].opt1, data[a].questions[b].opt2, data[a].questions[b].opt3, data[a].questions[b].opt4]
                        });
                    }
                }
            }

            setQuestions(questionsData);

            setIsAppReady(true);

        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {

        fetchData();
        // eslint-disable-next-line
    }, []);

    //Change to next question

    const nextQuestion = () => {

        if (lastAnswer !== "") {

            if (questions.length > (currentQuestionId + 1)) {

                setCurrentQuestionId(currentQuestionId + 1);
            }

            if (questions.length === (currentQuestionId + 1)) {

                setIsAppReady(false);
            }

            setLastAnswer("");
            setSelectedAnswer(0);
        } else {

            window.alert("Fill the answer before moving on.");
        }
    }

    //Send post request via rest

    const postData = () => {

        //Answers in reverse order, so we get the latest choices

        let chars = [];
        selectedAnswers.reverse();

        for (let i = 0; i < selectedAnswers.length; i++) {

            //One answer per question, unless the question type is Checkbox

            if (!chars.includes(JSON.stringify(selectedAnswers[i]).split('"')[1]) || JSON.stringify(selectedAnswers[i]).split(' ')[1].includes("Checkbox")) {

                filteredData.push(selectedAnswers[i]);
                chars.push(JSON.stringify(selectedAnswers[i]).split('"')[1]);
            }
        }

        let data = [];

        filteredData.reverse();

        //Let's assemble data needed for post

        for (let i = 0; i < filteredData.length; i++) {

            if ((JSON.stringify(filteredData[i]).toString()).split(" ")[1] === "Scope") {

                let value = (JSON.stringify(filteredData[i]).toString()).split('":"')[1].split('"}')[0].split(" ")[0];

                data.push({
                    survey: { s_id: surveyId.toString() }, question: { q_id: (JSON.stringify(filteredData[i]).toString()).split("Q")[1].split("")[0] },
                    answer1: sliderValue[value - 1], answer2: "", answer3: "", answer4: ""
                });
            } else {

                data.push({
                    survey: { s_id: surveyId.toString() }, question: { q_id: (JSON.stringify(filteredData[i]).toString()).split("Q")[1].split("")[0] },
                    answer1: (JSON.stringify(filteredData[i]).toString()).split('":"')[1].split('"}')[0].split(" ")[0], answer2: "", answer3: "", answer4: ""
                });
            }
        }

        fetch('https://json.awsproject.link/answers', { method: 'POST', headers: { 'Content-type': 'application/json' }, body: JSON.stringify({ answers: { respondent: "Matti Testaaja", survey: "2", data: data } }) })
            .catch(error => console.error(error))

        setSelectedAnswers(filteredData);
        setFeedBackVisible(true);
    }

    //React to changes in answer element data

    const handleChange = (event, newValue) => {

        let usedValue = "";

        setSelectedAnswer(newValue);

        if (newValue === undefined) {

            usedValue = event.target.value;
        } else {

            usedValue = newValue;
        }

        let answer = JSON.parse('{"Q' + questions[currentQuestionId].q_id + '":"' + usedValue + " " + questions[currentQuestionId].q_type + '"}');

        setSelectedAnswers(oldArray => [...oldArray, answer]);

        // Remove unchecked Checkbox answers

        for (let i = 0; i < selectedAnswers.length; i++) {

            if (JSON.stringify(selectedAnswers[i]) === JSON.stringify(answer)) {

                let frontPart = selectedAnswers.slice(0, i);
                let lastPart = selectedAnswers.slice(i + 1);

                setSelectedAnswers([...frontPart, ...lastPart]);
            }
        }

        setLastAnswer(usedValue);

        if (progressValue !== (100 / questions.length * (currentQuestionId + 1)) && progressValue <= 100)

            valueAdder();
    }

    //Change progress bar %

    const valueAdder = (value) => {

        if (value !== 100) {

            setProgressValue(progressValue + 100 / questions.length);
        }
    }

    //Progress bar

    function LinearProgressWithLabel(props) {
        return (
                <Box style={{ width: '100%', margin: 'auto' }}>
                    <LinearProgress variant="determinate" {...props} />
                    <Typography variant="body2" color="text.secondary">{`${Math.round(
                        props.value
                    )}%`}</Typography>
                </Box>
        );
    }

    LinearProgressWithLabel.propTypes = {

        value: PropTypes.number.isRequired
    };

    return (

        <div style={{ fontFamily: 'Courier New', paddingBottom: 50  }}>
            <LinearProgressWithLabel value={progressValue} />
            <img src="https://i.ibb.co/Npb79BV/logo-2.png" alt="logo" ></img>
            <div style={{ backgroundColor: 'white', maxWidth: 620, margin: 'auto', borderRadius: 40 }}>

                {feedBackVisible ? <div style={{ color: "green", fontSize: 20 }}><i>Success</i><br />{Statistics(selectedAnswers)}</div> :
                    <div>
                        {isAppReady ?
                            <div style={{ marginTop: 30 }}>
                                <h1>{questions[currentQuestionId].name}</h1>
                                <QuestionGenerator currentId={currentQuestionId} passValue={questions} handleChange={handleChange} />

                                <NextButton nextQuestion={nextQuestion} />
                            </div>
                            : <div><h2>Ready to submit.</h2><SubmitButton postData={postData} /></div>}
                    </div>}

                <Link style={{ color: 'white' }} to="/"><button variant="contained" style={{ margin: '10px', width: 150, height: 50, fontSize: 20, paddingTop: 5, borderRadius: 10 }} className="btn btn-primary">Home</button></Link>
            </div>

        </div>
    );
}

export default Survey;
