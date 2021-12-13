import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import MultipleChoicesQuestion from './MultipleChoicesQuestion';
import QuestionField from './QuestionField';

function AddQuestion(props) {

    // Dialog, which is used to add new question to database

    const [open, setOpen] = useState(false);
    const [question, setQuestion] = useState({ s_id: "", opt1: "", opt2: "", opt3: "", opt4: "", q_type: "", question: "" });
    const [choices, setChoices] = useState([]);

    const [radioVisible, setRadioVisible] = useState(false);
    const [openQuestionVisible, setOpenQuestionVisible] = useState(false);
    const [scope1to5Visible, setScope1to5Visible] = useState(false);
    const [checkboxVisible, setCheckboxVisible] = useState(false);

    let dataArray = [];

    const handleClickOpen = () => {

        setOpen(true);
    };

    const handleClose = () => {

        setOpen(false);
    };

    const handleSave = () => {

        console.log(question);

        if (question.s_id !== "" && question.opt1 !== "" && question.question !== "" && question.q_type !== "") {

            props.addQuestion({ survey: { s_id: question.s_id }, opt1: question.opt1, opt2: question.opt2, opt3: question.opt3, opt4: question.opt4, q_type: question.q_type, question: question.question });
            handleClose();
   
        } else {

            window.alert("Fill the required field(s).");
        }
    }

    const inputChanged = e => {

        if (e.target.name === "s_id") {

            setQuestion({ ...question, [e.target.name]: e.target.value.toString().split("(")[1].split(")")[0] })

        } else if (e.target.name === "q_type") {

            setRadioVisible(false);
            setOpenQuestionVisible(false);
            setScope1to5Visible(false);
            setCheckboxVisible(false);
            // eslint-disable-next-line
            eval("set" + e.target.value.replace(/\s/g, '') + "Visible(true);");
            setQuestion({ ...question, [e.target.name]: e.target.value })
        } else {

            setQuestion({ ...question, [e.target.name]: e.target.value })
        }
    }

    // Data for the select element

    const fetchData = () => {

        fetch('https://json.awsproject.link/surveys').then(async response => {

            try {

                const data = await response.json()

                for (let i = 0; i < data.length; i++) {

                    dataArray.push(data[i].name + " (" + data[i].s_id + ")");
                }

                setChoices(dataArray);
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
            <Button variant="contained" style={{ margin: 'auto', width: 100, height: '60%', fontSize: 15, borderRadius: 50, color: 'white' }} class="btn btn-success" onClick={handleClickOpen}>
                Add
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add question</DialogTitle>
                <DialogContent>
                    <select id="s_id" name="s_id" variant="standard" class="form-select" onChange={inputChanged} autoFocus>
                        <option defaultValue>Survey name</option>
                        {choices.map((item, key) => (
                            <option value={item} key={key}>{item}</option>
                        ))}
                    </select>
                    <br />
                    <select id="q_type" name="q_type" variant="standard" class="form-select" onChange={inputChanged}>
                        <option defaultValue>Question type</option>
                        <option>Radio</option>
                        <option>Open Question</option>
                        <option>Checkbox</option>
                        <option>Scope 1 to 5</option>
                    </select>
                    {radioVisible ? <MultipleChoicesQuestion inputChanged={inputChanged} /> : null}
                    {openQuestionVisible ? <QuestionField inputChanged={inputChanged} /> : null}
                    {scope1to5Visible ? <QuestionField inputChanged={inputChanged} /> : null}
                    {checkboxVisible ? <MultipleChoicesQuestion inputChanged={inputChanged} /> : null}
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" style={{ margin: '10px', width: 85, height: 45, fontSize: 20, paddingTop: 5, borderRadius: 10 }} class="btn btn-success" onClick={handleSave}>Add</Button>
                    <Button variant="contained" style={{ margin: '10px', width: 85, height: 45, fontSize: 20, paddingTop: 5, borderRadius: 10 }} class="btn btn-warning" onClick={handleClose}>Back</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AddQuestion;
