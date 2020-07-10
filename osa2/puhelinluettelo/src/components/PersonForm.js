import React from 'react';

/**
* Renders a form that asks person's name and number
*/
const PersonForm = (props) => {
    return (
        <form>
            <p> name: <input value={props.newName} onChange={props.handleNameChange}/> </p>
            <p> number: <input value={props.newNumber} onChange={props.handleNumberChange}/> </p>
            <button onClick={props.addPerson}>add</button>
         </form>
    )
}

export default PersonForm