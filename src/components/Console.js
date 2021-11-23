import React, { useState, useEffect } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';

import Questions from './Questions';

import '../css/bootstrap.min.css';

function Console() {

    return (
        <div>
            <Questions/>
        </div>
    );
}

export default Console;
