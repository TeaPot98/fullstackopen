/* eslint-disable linebreak-style */
import React, { useState, useImperativeHandle } from "react";
import PropTypes from "prop-types";
import {
  Button
} from '@mui/material'

// This component uses `props.children` feature.
// It makes possible to nest another components inside this one

// This is a generic component which can toggle visibility
// of its children using two buttons

const Togglable = React.forwardRef((props, ref) => {
  // This hook is toggling visibility
  const [visible, setVisible] = useState(false);

  // Style settings of CSS `display` property
  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button sx={{ m: 2 }} variant='contained' onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button color="error" variant='outlined' onClick={toggleVisibility}>cancel</Button>
      </div>
    </div>
  );
});

// Making `buttonLabel` prop to be required, and to be as String
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

Togglable.displayName = "Togglable";

export default Togglable;
