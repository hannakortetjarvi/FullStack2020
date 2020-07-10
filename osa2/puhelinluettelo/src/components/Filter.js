import React from 'react';

/**
 * Collects user's input, that will be used as a filter
 */
const Filter = (props) => <p> filter shown with <input value={props.input} onChange={props.onChange}/> </p>

export default Filter