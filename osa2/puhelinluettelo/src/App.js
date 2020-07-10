import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

/**
 * Component for notifications
 */
const Notification = ({ message, messageColor }) => {

  // Defines message's style with Inline Style
  const style = {
    color: messageColor,
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

  if (message === null) return null
  return <div style={style}> {message} </div>
}

/**
 * Application
 */
const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newInput, setNewInput ] = useState ('')
  const [ message, setMessage] = useState(null)
  const [ messageColor, setColor] = useState(null)

  // Effect-hook
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  // Event-handler for adding a new person
  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    // IF person with given name doesn't exist yet
    if (persons.findIndex(person => person.name.toLowerCase() === newName.toLowerCase()) === -1) {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))  
          setNewName('')
          setNewNumber('')
          setColor(`green`)
          setMessage(`Added ${personObject.name}`)
          setTimeout(() => {setMessage(null); setColor(null)}, 5000)
      })
    }

    // person exists already --> updatePerson
    else updatePerson(personObject)
  }

  // Event-handler for updating person's number
  const updatePerson = (targetPerson) => {
    const person = persons.find(person => person.name.toLowerCase() === targetPerson.name.toLowerCase())
    const updated = {...person, number: newNumber}
    const id = persons[persons.findIndex(person => person.name.toLowerCase() === newName.toLowerCase())].id

    const result = window.confirm(`${targetPerson.name} is already added to phonebook, replace the old number with a new one?`)

    // User wants to update person's number
    if (result === true) { 
      personService
        .update(id, updated)
        .then(person => {
          setPersons(persons.map(person => person.id !== id ? person: updated))
          setColor(`green`)
          setMessage(`Updated ${targetPerson.name}`)
          setTimeout(() => {setMessage(null); setColor(null)}, 5000)
        }).catch(error => {
          setPersons(persons.filter(person => person.id !== updated.id)) // With this the list gets updated without refreshing the website
          setColor(`red`)
          setMessage(`Information of '${targetPerson.name}' has already been removed from server`)
          setTimeout(() => {setMessage(null); setColor(null)}, 5000)
        })
    }
  }

  // Event-handler for deleting a person
  const deletePerson = (targetPerson) => {
    const result = window.confirm(`Delete ${targetPerson.name}?`)

    // User wants to delete person
    if (result === true) { 
      personService
        .deletePerson(targetPerson.id)
        .then(() => { 
          setPersons(persons.filter(person => person.id !== targetPerson.id))
          setColor(`green`)
          setMessage(`Deleted ${targetPerson.name}`)
          setTimeout(() => {setMessage(null); setColor(null)}, 5000)
      }).catch(error => {
        setPersons(persons.filter(person => person.id !== targetPerson.id)) // With this the list gets updated without refreshing the website
        setColor(`red`)
        setMessage(`Information of '${targetPerson.name}' has already been removed from server`)
        setTimeout(() => {setMessage(null); setColor(null)}, 5000)
      })
    }
  }

  // Event-handlers for changes
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleInputChange = (event) => setNewInput(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
        <Notification message={message} messageColor={messageColor}/>
        <Filter input={newInput} onChange={handleInputChange}/>
      <h2>Add a new</h2>
        <PersonForm newName={newName} newNumber={newNumber} addPerson={addPerson} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
        <Persons persons={persons} filterInput={newInput} deletePerson={deletePerson}/>
    </div>
  )
}

export default App

