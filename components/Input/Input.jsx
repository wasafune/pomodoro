import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      study: 25,
      rest: 5,
      bigRestInterval: 4,
      bigRest: 15,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillMount() {
    this.props.handleSubmit(Object.assign(this.state));
  }

  handleInputChange(event) {
    const { target } = event;
    const { name } = target;
    this.setState({ [name]: Number(target.value) });
  }

  render() {
    const { props } = this;
    const {
      study,
      rest,
      bigRestInterval,
      bigRest,
    } = this.state;

    return (
      <div id="input">
        <h2>Input</h2>
        <h3>Study Duration:</h3>
        <div className="input-group">
          Minutes:
          <input
            className="input-num"
            type="number"
            name="study"
            value={study}
            onChange={this.handleInputChange}
          />
        </div>

        <h3>Rest Duration:</h3>
        <div className="input-group">
          Minutes:
          <input
            className="input-num"
            type="number"
            name="rest"
            value={rest}
            onChange={this.handleInputChange}
          />
        </div>

        <h3>Big Rest Intervals:</h3>
        <div className="input-group">
          Number of Sessions:
          <input
            className="input-num"
            type="number"
            name="bigRestInterval"
            value={bigRestInterval}
            onChange={this.handleInputChange}
          />
        </div>

        <h3>Big Rest Duration:</h3>
        <div className="input-group">
          Minutes:
          <input
            className="input-num"
            type="number"
            name="bigRest"
            value={bigRest}
            onChange={this.handleInputChange}
          />
        </div>
        <br />
        <button
          id="input-submit"
          className="input-button"
          onClick={() => {
            props.handleSubmit(Object.assign(this.state));
          }}
        >
          Submit/Edit
        </button>
        <p id="input-error">{props.error}</p>
      </div>
    );
  }
}

Input.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default Input;
