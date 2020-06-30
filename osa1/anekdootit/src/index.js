import React, { useState } from 'react'
import ReactDOM from 'react-dom'

/**
 * Napin komponentti
 */
const Button = ({onClick, text}) => (
  <button onClick={onClick}>
    {text}
  </button>
)

/**
 * Sovellus
 */
const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(6+1).join('0').split('').map(parseFloat))
  const [mostIndex, setMost] = useState(0)

  // Next anecdote -napin käsittely
  const handleNext = () => {
    const random = Math.floor(Math.random() * Math.floor(props.anecdotes.length))
    setSelected(random)
  }

  // Vote -napin käsittely
  const handleVote = () => {
    const copyPoints = [...points]
    copyPoints[selected] += 1
    setPoints(copyPoints)
    // Jos selected-indeksissä on enemmän ääniä kuin tämän hetkinen suurin äänimäärä => Selected:issä on uusi suurin äänimäärä
    if (copyPoints[mostIndex] < copyPoints[selected]) setMost(selected)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <Button onClick={handleVote} text='vote' />
      <Button onClick={handleNext} text='next anecdote' />
      <h1>Anecdote with most votes</h1>
      <p>{props.anecdotes[mostIndex]}</p>
      <p>has {points[mostIndex]} votes</p>
    </div>
  )
}

/**
 * Anekdootit
 */
const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)