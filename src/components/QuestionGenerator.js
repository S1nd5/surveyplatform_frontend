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
                label: '1'
            },
            {
                value: 2,
                label: '2'
            },
            {
                value: 3,
                label: '3'
            },
            {
                value: 4,
                label: '4'
            },
            {
                value: 5,
                label: '5',
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

                options.push(<div style={{ maxWidth: 400, margin: 'auto' }}>
                    <label>{value[i].question}</label><br />
                    <Slider defaultValue={3} step={1} marks={marks} min={1} max={5} name="Scope" onChange={props.handleChange} />
                    <p>1 = Täysin samaa mieltä <br /> 2 = Lähes samaa mieltä <br /> 3 = En osaa sanoa <br /> 4 = Lähes eri mieltä <br /> 5 = Täysin eri mieltä</p>
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