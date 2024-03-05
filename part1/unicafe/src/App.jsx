import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const texts = {
    title: "Give feedback",
    stats: "Statistics",
    good: "Good",
    neutral: "Neutral",
    bad: "Bad",
    all: "All",
    avg: "Average",
    pos: "Positive"
  }


  const Title = ({text}) => <h1>{text}</h1>
  const Button = ({text, onClick}) => <button onClick={onClick}>{text}</button>
  const StatisticLine = ({text, value}) => <tr><td>{text}</td><td>{value}</td></tr>


  const Statistics = ({texts, good, neutral, bad}) => {
    let total = good + neutral + bad
    let avg = (good - bad) / total
    let pos = good / total * 100
    
    if(total === 0) {
      return (
        <h3>No feedback</h3>
      )
    }
    return (
      <table>
        <tbody>
          <StatisticLine text={texts.good} value={good}/>
          <StatisticLine text={texts.neutral} value={neutral}/>
          <StatisticLine text={texts.bad} value={bad}/>

          <StatisticLine text={texts.all} value={total}/>
          <StatisticLine text={texts.avg} value={avg}/>
          <StatisticLine text={texts.pos} value={pos}/>
        </tbody>
      </table>
    )
  }

  return (
    <>
      <Title text={texts.title}/>
      <Button text={texts.good} onClick={() => setGood(good + 1)}/>
      <Button text={texts.neutral} onClick={() => setNeutral(neutral + 1)}/>
      <Button text={texts.bad} onClick={() => setBad(bad + 1)}/>

      <Title text={texts.stats}/>
      <Statistics texts={texts} good={good} neutral={neutral} bad={bad}/>
    </>
  )
}

export default App