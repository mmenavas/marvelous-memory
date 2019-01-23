import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

const Card = props => (
  <div className={"card" + (props.isOn ? " card--on" : "")} onClick={() => props.reveal()}>
    {props.isOn ? props.value : "?"}
  </div>
);

Card.propTypes = {
    value: PropTypes.number.isRequired,
    isOn: PropTypes.bool.isRequired,
    reveal: PropTypes.func.isRequired
  }

export default Card;
