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
 * Huolehtii tilastorivien näyttämisestä
 */
const StatisticLine = ({text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

/**
 * Komponentti, jolla tilastot renderöidään näytölle
 */
const Statistics = (props) => {
  if (props.all === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }

  return (
    <table>
      <tbody>
        <StatisticLine text = "good" value={props.good}/>
        <StatisticLine text = "neutral" value={props.neutral}/>
        <StatisticLine text = "bad" value={props.bad}/>
        <StatisticLine text = "all" value={props.all}/>
        <StatisticLine text = "average" value={props.avg}/>
        <StatisticLine text = "positive" value={(props.pos + ' %')}/>
      </tbody>
    </table>
  )
}

/**
 * Sovellus
 * Tilastot häviävät, kun selain refreshataan
 */
const App = () => {
  // tallennetaan napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState(0)
  const [avg, setAvg] = useState(0)
  const [pos, setPos] = useState(0)

  const average = (a, b, c) => (a - b) / c  // Laskee keskiarvon
  const positive = (a, b) => a / b * 100    // Laskee positiivisten palautteiden osuuden

  // Good-napin käsittely
  const handleGood = () => {
    setGood(good + 1)
    setAll(allClicks + 1)
    setAvg(average(good + 1, bad, allClicks + 1))
    setPos(positive(good + 1, allClicks + 1))
  }

  // Neutral-napin käsittely
  const handleNeutral = () => {
    setNeutral(neutral + 1)
    setAll(allClicks + 1)
    setAvg(average(good, bad, allClicks + 1))
    setPos(positive(good, allClicks + 1))
  }

  // Bad-napin käsittely
  const handleBad = () => {
    setBad(bad + 1)
    setAll(allClicks + 1)
    setAvg(average(good, bad + 1, allClicks + 1))
    setPos(positive(good, allClicks + 1))
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button onClick={handleGood} text='good' />
      <Button onClick={handleNeutral} text='neutral' />
      <Button onClick={handleBad} text='bad' />
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} all={allClicks} avg={avg} pos={pos}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)