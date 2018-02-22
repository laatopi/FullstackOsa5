import React from 'react';
import actionFor from './actionCreators'


class App extends React.Component {
  voteAnecdote = (id) => () => {
    this.props.store.dispatch(
      actionFor.anecdoteVote(id)
    )
    console.log(this.props.store.getState().sort(this.compareByVotes))
    this.render()
  }

  addAnecdote = (event) => {
    event.preventDefault()
    this.props.store.dispatch(
      actionFor.anecdoteCreation(event.target.anecdote.value)
    )
    event.target.anecdote.value = ''
  }

  compareByVotes = (a, b) => {
    if (a.votes > b.votes)
      return -1
    if (a.votes < b.votes)
      return 1
    return 0
  }

  render() {
    const anecdotes = this.props.store.getState().sort(this.compareByVotes)

    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.sort(this.compareByVotes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes} votes
              <button onClick={this.voteAnecdote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={this.addAnecdote}>
          <div><input name="anecdote" /></div>
          <button type="submit">create</button>
        </form>
      </div>
    )
  }
}

export default App