import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const texts = {
    day: "Anecdote of the day",
    next: "Next anecdote",
    vote: "Vote",
    voted: "Anecdote with most votes"
  }

  const Title = ({text}) => <h1>{text}</h1>
  const Text = ({text}) => <div>{text}</div>
  const Button = ({text, onClick}) => <button onClick={onClick}>{text}</button>

  const PopularAnecdote = () => {
    let mostVotedValue = Math.max(...votes)
    if(mostVotedValue === 0) {
      return <h3>No votes</h3>
    }
    return (
      <>
        <Text text={anecdotes[votes.indexOf(mostVotedValue)]}/>
        <Text text={`Has ${mostVotedValue} votes`}/>
      </>
    );
  }

  const getRandom = () => Math.floor(Math.random() * anecdotes.length)

  const handleOnClick = () => {
    setSelected(getRandom())
  }

  const handleOnVote = () => {
    const updatedVotes = [...votes]
    updatedVotes[selected] += 1
    setVotes(updatedVotes)
  }

  return (
    <>
      <Title text={texts.day} />
      <Text text={anecdotes[selected]}/>
      <Text text={`Has ${votes[selected]} votes`}/>
      <Button text={texts.vote} onClick={handleOnVote}/>
      <Button text={texts.next} onClick={handleOnClick}/>

      <Title text={texts.voted} />
      <PopularAnecdote/>
    </>
  )
}

export default App