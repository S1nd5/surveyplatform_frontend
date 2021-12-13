import React, { useState, useEffect } from 'react';
import { BarChart, XAxis, YAxis, Bar, Tooltip, Cell } from 'recharts';
import calc from 'lodash';
import Button from '@mui/material/Button';

import '../css/bootstrap.min.css';
import 'react-table-6/react-table.css';

function Statistics() {

    const [statistics, setStatistics] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [respondents, setRespondents] = useState([]);
    const [title, setTitle] = useState("Select something");

    let statisticsData = [];
    let respondentData = [];
    let questionData = [];

    // Fetch answer data

    const fetchStatisticsData = (value) => {

        fetch('https://json.awsproject.link/answers').then(async response => {

            try {

                const data = await response.json()

                data.forEach(answer => {

                    if (!respondentData.includes("Respondent " + answer.respondent.r_id + " : " + answer.respondent.firstname + " " + answer.respondent.lastname)) {

                        respondentData.push("Respondent " + answer.respondent.r_id + " : " + answer.respondent.firstname + " " + answer.respondent.lastname);
                    }

                    if (!questionData.includes(answer.survey.questions[0].question)) {

                        questionData.push(answer.survey.questions[0].question);
                    }
                })

                setRespondents(respondentData);
                setQuestions(questionData);

                if (value !== "Initialize") {

                    data.forEach(answer => {

                        if (answer.survey.questions[0].q_type !== "Open Question") {

                            if (answer.respondent.r_id.toString() === value.split(" ")[1].toString()) {

                                const answerData = { answer: answer.answer1, incidence: 1 };
                                statisticsData.push(answerData);

                            } else if (value === answer.survey.questions[0].question) {

                                const answerData = { answer: answer.answer1, incidence: 1 };
                                statisticsData.push(answerData);
                            }
                        }
                    })

                    const results = calc(statisticsData)
                        .groupBy("answer")
                        .map((answer, id) => ({
                            answer: id,
                            incidence: calc.sumBy(answer, 'incidence'),
                        }))
                        .value()
                    setStatistics(results);
                }
            } catch (error) {
                console.log(error);
            }
        })
    }

    useEffect(() => {

        fetchStatisticsData("Initialize");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Random colors for BarChart Cells

    statisticsData.length = 0;

    for (let i = 0; i < statistics.length; i++) {
        const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
        statisticsData.push({ color: randomColor })
    }

    // React to changes in select menu

    const inputChanged = e => {

        if (e.target.value === "Question statistics" || e.target.value === "Respondent statistics") {

            setTitle("Select something");
        } else {

            setTitle(e.target.value);
        }

        fetchStatisticsData(e.target.value);
    }

    // Rendering BarChart

    return (
        <div>
            <div style={{ backgroundColor: 'white', width: 600, margin: 'auto', marginTop: 100, borderRadius: 20 }}>
                <h1>{title}</h1>
                <Button variant="contained" style={{ margin: 'auto', marginRight: 10, width: 100, height: '60%', fontSize: 15, borderRadius: 50 }} class="btn btn-primary" href="/">Home</Button>
                <Button variant="contained" style={{ margin: 'auto', marginRight: 10, width: 100, height: '60%', fontSize: 15, borderRadius: 50 }} class="btn btn-secondary" href="/surveys">Surveys</Button>
                <Button variant="contained" style={{ margin: 'auto', marginRight: 10, width: 100, height: '60%', fontSize: 15, borderRadius: 50 }} class="btn btn-info" href="/questions">Questions</Button>
                <br />
                <br />
                <select id="qs_id" name="qs_id" variant="standard" class="form-select" onChange={inputChanged}>
                    <option defaultValue>Question statistics</option>
                    {questions.map((item, key) => (
                        <option value={item} key={key}>{item}</option>
                    ))}
                </select>
                <br />
                <select id="rs_id" name="rs_id" variant="standard" class="form-select" onChange={inputChanged}>
                    <option defaultValue>Respondent statistics</option>
                    {respondents.map((item, key) => (
                        <option value={item} key={key}>{item}</option>
                    ))}
                </select>
                <br />
                <BarChart width={600} height={300} data={statistics}>
                    <XAxis dataKey="answer" />
                    <YAxis dataKey="incidence" />
                    <Tooltip />
                    <Bar dataKey="incidence" fill="#8A2BE2">
                        {statisticsData.map((entry, index) => (
                            <Cell fill={statisticsData[index].color} />
                        ))}
                    </Bar>
                </BarChart>
            </div>
        </div>
    );
}

export default Statistics;
