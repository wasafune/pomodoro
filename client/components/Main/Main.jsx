/* eslint-env browser */

import React, { Component } from 'react';

// import components
import Title from '../Title/Title';
import Input from '../Input/Input';
import Display from '../Display/Display';
import Description from '../Description/Description';

class Main extends Component {
  constructor() {
    super();
    this.state = {
      study: 25,
      rest: 5,
      bigRestInterval: 4,
      bigRest: 15,
      status: 'Off',
      currentSession: 'Offline',
      sessionCount: 0,
      reset: true,
      error: ' ',
      chime: new Audio('https://freesound.org/people/shinephoenixstormcrow/sounds/337049/download/337049__shinephoenixstormcrow__320655-rhodesmas-level-up-01.mp3'),
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleChime = this.handleChime.bind(this);
    this.toggleSession = this.toggleSession.bind(this);
    this.toggleStatus = this.toggleStatus.bind(this);
    this.setState = this.setState.bind(this);
  }

  handleSubmit(input) {
    if (!input.study || !input.rest || !input.bigRest) {
      this.setState({ error: 'Durations must be greater than 0!' });
      return;
    }
    let tempCurrentSession = this.state.currentSession;
    if (tempCurrentSession === 'Offline') tempCurrentSession = 'study';

    if (this.state.status === 'On') {
      this.toggleStatus();
    }

    this.setState({
      study: input.study,
      rest: input.rest,
      bigRestInterval: input.bigRestInterval,
      bigRest: input.bigRest,
      currentSession: tempCurrentSession,
      reset: false,
      error: ' ',
    });
  }

  handleReset() {
    this.setState({
      status: 'Off',
      currentSession: 'Offline',
      sessionCount: 0,
      reset: true,
      error: ' ',
    });
  }

  handleChime() {
    const play = () => {
      this.state.chime.play();
    };
    play();
    setTimeout(play, 1500);
    setTimeout(play, 3000);
  }

  toggleSession() {
    const { state, setState } = this;
    const { currentSession, sessionCount, bigRestInterval } = state;

    if (currentSession === 'Offline' || currentSession === 'rest' || currentSession === 'bigRest') {
      setState({
        currentSession: 'study',
        sessionCount: this.state.sessionCount += 1,
      });
    }
    if (currentSession === 'study') {
      if (!sessionCount || (sessionCount % bigRestInterval)) {
        setState({ currentSession: 'rest' });
      } else {
        setState({ currentSession: 'bigRest' });
      }
    }
  }

  toggleStatus() {
    const { state, setState } = this;
    if (state.currentSession === 'Offline') return;
    if (!state.sessionCount) {
      setState({ sessionCount: 1 });
    }
    if (state.status === 'On') {
      setState({ status: 'Paused' });
    } else {
      setState({ status: 'On' });
    }
  }

  render() {
    const { state } = this;
    let time = state[state.currentSession];
    if (state.reset) time = false;
    return (
      <div id="main">
        <Title />
        <div id="main-body">
          <Display
            status={state.status}
            currentSession={state.currentSession}
            sessionCount={state.sessionCount}
            reset={state.reset}
            time={time}
            toggleStatus={this.toggleStatus}
            toggleSession={this.toggleSession}
            handleReset={this.handleReset}
            handleChime={this.handleChime}
          />
          <Input
            error={state.error}
            handleSubmit={this.handleSubmit}
          />
        </div>
        <Description />
      </div>
    );
  }
}

export default Main;
