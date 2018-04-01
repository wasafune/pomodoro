/* eslint-env browser */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Display extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: false,
      status: '',
      timerId: 0,
      ticker: null,
    };

    this.timer = this.timer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.resetSession = this.resetSession.bind(this);
    this.setState = this.setState.bind(this);
  }

  componentWillMount() {
    const { props, setState } = this;

    if (window.Worker) {
      const ticker = new Worker('workers.js');
      ticker.onmessage = (m) => {
        const end = new Date().getTime() + (m.data * 1000);

        const timerId = setInterval(() => {
          const now = new Date().getTime();
          const diff = end - now;
          if (diff <= 0) {
            this.resetTimer();
            props.toggleStatus();
            props.toggleSession();
            props.handleChime();
            return;
          }
          setState({ time: Math.ceil(diff / 1000) });
        }, 1000);
        setState({ timerId });
      };
      this.setState({ ticker });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { state, props, setState } = this;
    if (nextProps.reset) {
      setState({ time: 0, status: 'Off' });
      return;
    }
    if (nextProps.time && nextProps.currentSession !== props.currentSession) {
      setState({ time: nextProps.time * 60 });
    }
    if (nextProps.status !== state.status) {
      setState({ status: nextProps.status });
    }
    if (nextProps.status === 'On') state.ticker.postMessage(state.time);
    // if (nextProps.status === 'On') this.timer();
    if (nextProps.status === 'Paused') this.resetTimer();
  }

  timer() {
    const { state, props, setState } = this;

    const timerId = setInterval(() => {
      if (state.time <= 0) {
        this.resetTimer();
        props.toggleStatus();
        props.toggleSession();
        props.handleChime();
        return;
      }
      setState({ time: state.time -= 0.25 });
    }, 250);

    setState({ timerId });
  }

  resetTimer() {
    const { state, setState } = this;
    clearInterval(state.timerId);
    setState({ timerId: 0 });
  }

  resetSession() {
    const { props, setState } = this;
    setState({ time: props.time * 60 });
  }

  render() {
    const { state, props } = this;
    const { currentSession } = props;

    let minutes = Math.floor(state.time / 60);
    let seconds = Math.ceil(state.time % 60);
    if (seconds === 60) {
      minutes += 1;
      seconds = '0';
    }
    if (minutes < 10) minutes = `0${minutes}`;
    if (seconds < 10) seconds = `0${seconds}`;

    let displaySession = currentSession[0].toUpperCase() + currentSession.slice(1);
    if (displaySession === 'BigRest') displaySession = 'Big Session';

    return (
      <div id="display">
        <h2>Timer</h2>
        <h3>Current Session: {displaySession}</h3>
        <h3>Session Number: {props.sessionCount}</h3>
        <div id="time-left-container">
          <p id="time-left">{minutes}:{seconds}</p>
          <button id="time-left-container-bottom" onClick={props.toggleStatus}><h3>Timer: {props.status}</h3></button>
        </div>
        <div id="button-cluster">
          <br />
          <button onClick={props.toggleStatus}>Start/Pause</button>

          <button
            onClick={() => {
              if (props.status === 'On') props.toggleStatus();
              this.resetTimer();
              props.toggleSession();
            }}
          >
            Skip Session
          </button>

          <button
            id="session-reset"
            className="display-button"
            onClick={() => {
              if (props.status === 'On') props.toggleStatus();
              this.resetTimer();
              this.resetSession();
            }}
          >
            Reset Session
          </button>

          <button
            id="reset"
            className="display-button"
            onClick={() => {
              if (props.status === 'On') props.toggleStatus();
              this.resetTimer();
              props.handleReset();
            }}
          >
            Reset
          </button>
        </div>
      </div>
    );
  }
}

Display.propTypes = {
  time: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool,
  ]).isRequired,
  reset: PropTypes.bool.isRequired,
  currentSession: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

export default Display;
