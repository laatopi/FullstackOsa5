import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import counterReducer from './reducer';

const store = createStore(counterReducer)

const Statistiikka = ({ klik }) => {
  
  const palautteita = store.getState().altogether
  const hyvia = store.getState().good
  const neutraaleja = store.getState().ok
  const huonoja = store.getState().bad

  const ka = parseFloat((((hyvia * 1) + (huonoja * -1)) / palautteita)).toFixed(2)
  const positiivisia = parseFloat((hyvia / palautteita) * 100).toFixed(2)

  if (palautteita === 0) {
    return (
      <div>
        <h2>statistiikka</h2>
        <div>ei yhtään palautetta annettu</div>
      </div>
    )
  }

  return (
    <div>
      <h2>statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{hyvia}</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{neutraaleja}</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{huonoja}</td>
          </tr>
          <tr>
            <td>keskiarvo</td>
            <td>{ka}</td>
          </tr>
          <tr>
            <td>positiivisia</td>
            <td>{positiivisia}%</td>
          </tr>
        </tbody>
      </table>

      <button onClick={klik}>nollaa tilasto</button>
    </div >
  )
}

class App extends React.Component {
  klik = (nappi) => () => {
    store.dispatch({ type: nappi })
  }

  render() {
    return (
      <div>
        <h2>anna palautetta</h2>
        <button onClick={this.klik('GOOD')}>hyvä</button>
        <button onClick={this.klik('OK')}>neutraali</button>
        <button onClick={this.klik('BAD')}>huono</button>
        <Statistiikka klik={this.klik('ZERO')} />
      </div>
    )
  }
}

const renderApp = () => { ReactDOM.render(<App />, document.getElementById('root')); }

renderApp()
store.subscribe(renderApp)

