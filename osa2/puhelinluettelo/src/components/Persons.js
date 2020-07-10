import React from 'react'

/**
* Renders person's information
*/
const Content = ({person, deletePerson}) => {
    return (
      <li>
        {person.name} {person.number} <button onClick={() => deletePerson(person)}>delete</button>
      </li>
    )
  }

/**
* Filters persons and one by one renders them through Content-component
*/
const Persons = (props) => {
  const shownPersons = props.persons.filter(person => person.name.toLowerCase().includes(props.filterInput.toLowerCase()))
  return (
    <>
    {shownPersons.map(person => 
      <Content key={person.name} person={person} deletePerson={props.deletePerson}/>
    )}
  </>
  )
}

export default Persons