import {Component} from 'react'

// time in seconds

/*

In the provided code snippet for the digital watch component, the disabled={!this.state.isRunning} expression is used in JSX to conditionally disable buttons based on the isRunning state. Let's break down why and where it's used:

1. *Purpose*: 
   - The disabled attribute in HTML buttons is used to prevent users from interacting with the button. When disabled is set to true, the button appears grayed out and cannot be clicked.

2. *Usage in the Code*:
   - *Start Button*: <button onClick={this.startWatch} disabled={this.state.isRunning}>Start</button>
     - Here, the Start button is disabled (disabled={this.state.isRunning}) when this.state.isRunning is true. This prevents the user from starting the timer again while it is already running. Once the timer starts (isRunning becomes true), the Start button becomes disabled to avoid starting multiple timers simultaneously.
   
   - *Stop Button*: <button onClick={this.stopWatch} disabled={!this.state.isRunning}>Stop</button>
     - The Stop button is disabled (disabled={!this.state.isRunning}) when this.state.isRunning is false. This ensures that the user cannot stop the timer if it is not currently running. Only when the timer is running (isRunning is true), the Stop button becomes enabled, allowing the user to stop the timer.
   
   - *Reset Button*: <button onClick={this.resetWatch} disabled={this.state.isRunning}>Reset</button>
     - The Reset button is disabled (disabled={this.state.isRunning}) when this.state.isRunning is true. This prevents the user from resetting the timer while it is running. The reset operation is allowed only when the timer is stopped (isRunning is false), enabling the user to reset the timer to the initial state (0:00:00).

3. *Functionality*: 
   - By using disabled={!this.state.isRunning}, you ensure that each button (Start, Stop, Reset) behaves appropriately based on the current state of the timer (isRunning). This helps in providing a clear and intuitive user interface, where users cannot perform conflicting actions (like starting a timer that is already running or stopping a timer that is not running).

In summary, the disabled={!this.state.isRunning} expression is used to control the button's accessibility based on whether the timer is currently running (isRunning is true) or not. It enhances the user experience by preventing unintended actions and maintaining the logical flow of timer operations in the digital watch component.

*/

class DigitalWatch extends Component {
  state = {time: 1500, isRunning: false}

  timerId = null

  getDigitalTime = () => {
    this.setState(prevState => ({time: prevState.time - 1}))
  }

  onClickStartButtonDigital = () => {
    this.setState({isRunning: true})
    this.timerId = setInterval(this.getDigitalTime, 1000)
  }

  onClickStopButtonDigital = () => {
    this.setState({isRunning: false})
    clearInterval(this.timerId)
  }

  onClickResetButtonDigital = () => {
    clearInterval(this.timerId)
    this.setState({time: 1500})
  }

  formatTimeString = () => {
    const {time} = this.state
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    const stringDMin = minutes > 9 ? minutes : `0${minutes}`
    const stringDSec = seconds > 9 ? seconds : `0${seconds}`

    return `${stringDMin}:${stringDSec}`
  }

  incrementInMinutes = () => {
    this.setState(prevState => ({time: prevState.time + 60}))
  }

  decrementInMinutes = () => {
    this.setState(prevState => ({time: prevState.time - 60}))
  }

  render() {
    const {time, isRunning} = this.state
    if (time === 0) {
      clearInterval(this.timerId)
    }
    return (
      <div style={{border: '2px solid red', margin: '15px', padding: '15px'}}>
        <h1>Digital Watch</h1>
        <div style={{display: 'flex'}}>
          <button
            onClick={this.incrementInMinutes}
            style={{margin: '5px'}}
            type="button"
          >
            +
          </button>
          <h1>{this.formatTimeString()}</h1>
          <button
            onClick={this.decrementInMinutes}
            style={{margin: '5px'}}
            type="button"
          >
            -
          </button>
        </div>

        <div>
          <button
            style={{margin: '5px'}}
            onClick={this.onClickStartButtonDigital}
            type="button"
            disabled={isRunning}
          >
            Start
          </button>
          <button
            style={{margin: '5px'}}
            onClick={this.onClickStopButtonDigital}
            type="button"
            disabled={!isRunning}
          >
            Stop
          </button>
          <button
            style={{margin: '5px'}}
            onClick={this.onClickResetButtonDigital}
            type="button"
            disabled={isRunning}
          >
            Reset
          </button>
        </div>
      </div>
    )
  }
}

export default DigitalWatch
