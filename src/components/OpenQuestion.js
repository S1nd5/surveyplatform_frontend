import React from 'react';

function OpenQuestion(props) {

    //Open question e.g. name

    return (
        <div>
            <label>Do you like peas?
            <input style={{ margin: 10 }}  type="text" id="name" name="name" placeholder="E.g. John Smith" onChange={props.handleRespondent} />
            </label>
        </div>
    );
}

export default OpenQuestion;
