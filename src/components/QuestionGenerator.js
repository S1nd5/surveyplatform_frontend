import React, { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Slider from '@material-ui/core/Slider';
import _ from 'lodash';

import '../css/bootstrap.min.css';

function QuestionGenerator(props) {

    // eslint-disable-next-line
    const [value, setValue] = useState(props.passValue);

    let options = [];

    const passValue = () => {

        const marks = [
            {
                value: 1,
                label: 'Täysin samaa mieltä'
            },
            {
                value: 2,
                label: 'Lähes samaa mieltä'
            },
            {
                value: 3,
                label: 'En osaa sanoa'
            },
            {
                value: 4,
                label: 'Lähes eri mieltä'
            },
            {
                value: 5,
                label: 'Täysin eri mieltä',
            },
        ];

        _.times(value.length, (i) => {

            if (value[i].q_type === "Radio") {

                options.push(<div>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">{value[i].question}</FormLabel>
                        <RadioGroup
                            aria-label="quiz"
                            name="Radio"
                            onChange={props.handleChange}
                            value={props.usedAnswer}
                        >

                            {value[i].options.map((item, key) => {
                                return item !== "" ?
                                    <FormControlLabel key={key} value={item} control={<Radio />} label={item} />
                                    :
                                    null
                            })}

                        </RadioGroup>
                    </FormControl>
                </div>
                )
            } else if (value[i].q_type === "Checkbox") {

                options.push(<div>
                    <label>{value[i].question}</label>

                    {value[i].options.map((item, key) => {
                        return item !== "" ?
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id={key} name="Checkbox" value={item}
                                    onChange={props.handleChange} />
                                <label className="form-check-label">{item}</label>
                            </div>
                            :
                            null
                    })}

                </div>
                )
            } else if (value[i].q_type === "Scope 1 to 5") {

                options.push(<div style={{ width: 600, margin: 'auto' }}>
                    <label>{value[i].question}</label><br />
                    <Slider defaultValue={3} step={1} marks={marks} min={1} max={5} name="Scope" onChange={props.handleChange} />
                </div>
                )
            } else {
                options.push(<div><label>{value[i].question}</label><br /><TextField
                    margin="dense"
                    id="Open"
                    name="Open"
                    onChange={props.handleChange}
                    variant="standard"
                    required
                /></div>
                )
            }
        });
    }

    passValue();

    return (
        <div>
            {options[props.currentId]}
        </div>
    );
}

export default QuestionGenerator;